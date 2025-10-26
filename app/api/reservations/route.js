import { NextResponse } from 'next/server';

// 在实际生产环境中，这应该连接到数据库
// 这里我们使用临时存储作为演示
const reservations = new Map();

export async function POST(request) {
  try {
    const data = await request.json();
    
    // 验证必填字段
    if (!data.checkIn || !data.checkOut || !data.acceptTerms) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 验证日期
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    
    if (checkOut <= checkIn) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // 生成预订ID
    const reservationId = `RES-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // 创建预订记录
    const reservation = {
      id: reservationId,
      ...data,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      confirmationNumber: `RAF${Date.now().toString().slice(-8)}`
    };

    // 保存预订（在实际应用中，这应该保存到数据库）
    reservations.set(reservationId, reservation);

    // 这里可以添加：
    // 1. 发送确认邮件给客户
    // 2. 发送通知给房东
    // 3. 更新日历可用性
    // 4. 处理支付

    return NextResponse.json({
      success: true,
      id: reservationId,
      confirmationNumber: reservation.confirmationNumber,
      message: 'Reservation created successfully'
    });

  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Reservation ID is required' },
      { status: 400 }
    );
  }

  const reservation = reservations.get(id);

  if (!reservation) {
    return NextResponse.json(
      { error: 'Reservation not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(reservation);
}
