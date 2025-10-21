#!/usr/bin/env node

/**
 * 批量翻译所有 DetailSection 组件中的设备名称
 */

const fs = require('fs');
const path = require('path');

// 设备名称映射表（法语 -> 翻译键）
const equipmentMap = {
  'Grand canapé en cuir Roche Bobois': 'sofa',
  'Télévision': 'tv',
  'Piano': 'piano',
  'Système audio Bluetooth Devialet': 'speaker',
  'Livres': 'books',
  'Jeux de société': 'boardGames',
  'Table à manger': 'diningTable',
  'Chaise haute pour bébé': 'highChair',
  'Cheminée': 'fireplace',
  'Ventilateurs portables': 'fans',
  'Chauffage central': 'heating',
  'Détecteur de fumée': 'smokeDetector',
  'Wifi': 'wifi',
  'Espace bar à cocktails': 'bar',
  'Machine à café à grain': 'coffeeMachine',
  'Piscine': 'pool',
  'Chauffage piscine': 'poolHeating',
  'Transats': 'sunLoungers',
  'Parasols': 'parasols',
  'Douche extérieure': 'shower',
  'Barbecue': 'bbq',
  'Jardin': 'garden',
  'Terrasse': 'terrace',
  'Mobilier d\'extérieur': 'outdoorFurniture',
  'Tapis de course': 'treadmill',
  'Vélo d\'appartement': 'bike',
  'Haltères': 'weights',
  'Tapis de yoga': 'yogaMat',
  'Billard': 'billiards',
  'Baby-foot': 'babyfoot',
  'Table de ping-pong': 'pingPong',
  'Jouets pour enfants': 'toys',
  'Cave à vin': 'wineCellar',
  'Machine à laver': 'washingMachine',
  'Sèche-linge': 'dryer',
  'Fer à repasser': 'iron',
  'Lit': 'bed',
  'Armoire': 'wardrobe',
  'Cintres': 'hangers',
  'Sèche-cheveux': 'hairDryer',
  'Serviettes': 'towels',
  'Draps': 'bedLinens',
  'Shampoing et gel douche': 'shampoo',
  'Eau chaude': 'hotWater',
  'Vue sur le jardin': 'gardenView',
  'Lit bébé': 'babyBed',
  'Piscine chauffée': 'heatedPool',
  'Éclairage subaquatique': 'underwaterLighting',
  'Transats et chaises longues': 'sunLoungesChairs',
  'Store banne': 'awning',
  'Alerte piscine': 'poolAlarm',
  'Salon de détente extérieur': 'outdoorLounge',
  'Vue panoramique sur la nature': 'panoramicView',
  'Éclairage d\'ambiance panosolaire': 'solarLighting',
  'Zone ensoleillée': 'sunnyArea',
  'Jeux d\'eau': 'waterGames',
  'Lave-linge et Sèche-linge': 'washingDryingMachine',
  'Produits de nettoyage': 'cleaningProducts',
  'Ping-pong': 'pingPong',
  'Vélo à la demande': 'bikeOnDemand',
  'Parking': 'parking',
  'Aspirateur': 'vacuumCleaner'
};

/**
 * 修改单个文件中的设备名称
 */
function translateEquipments(filePath) {
  console.log(`\n📝 处理文件: ${path.basename(filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let count = 0;
  
  // 查找所有的 { name: '...' } 模式
  Object.entries(equipmentMap).forEach(([frenchName, key]) => {
    // 匹配 { name: 'xxx', icon: ... } 或 { name: "xxx", icon: ... }
    const patterns = [
      new RegExp(`\\{ name: '${frenchName.replace(/'/g, "\\'")}',`, 'g'),
      new RegExp(`\\{ name: "${frenchName.replace(/'/g, "\\'")}",`, 'g')
    ];
    
    patterns.forEach(pattern => {
      if (content.match(pattern)) {
        content = content.replace(pattern, `{ name: t.equipments.${key},`);
        modified = true;
        count++;
      }
    });
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 替换了 ${count} 个设备名称`);
    return true;
  } else {
    console.log(`⚠️  未找到需要替换的设备名称`);
    return false;
  }
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始批量翻译设备名称...\n');
  
  const componentDir = path.join(__dirname, '../app/component');
  const files = fs.readdirSync(componentDir)
    .filter(f => f.endsWith('DetailSection.js'))
    .map(f => path.join(componentDir, f));
  
  let successCount = 0;
  let failCount = 0;
  
  files.forEach(file => {
    try {
      if (translateEquipments(file)) {
        successCount++;
      }
    } catch (error) {
      console.error(`❌ 处理 ${path.basename(file)} 时出错:`, error.message);
      failCount++;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 翻译统计:`);
  console.log(`   ✅ 成功: ${successCount} 个文件`);
  console.log(`   ❌ 失败: ${failCount} 个文件`);
  console.log(`\n🎉 批量翻译完成！\n`);
}

// 运行脚本
main();
