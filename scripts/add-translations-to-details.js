#!/usr/bin/env node

/**
 * 批量添加翻译到所有 DetailSection 组件
 * 自动修改所有房间详情页面组件以支持多语言
 */

const fs = require('fs');
const path = require('path');

// 需要修改的组件列表
const components = [
  {
    file: 'CuisineDetailSection.js',
    roomKey: 'cuisine',
    roomName: 'Cuisine'
  },
  {
    file: 'PiscineDetailSection.js',
    roomKey: 'piscine',
    roomName: 'Piscine'
  },
  {
    file: 'SalleSportDetailSection.js',
    roomKey: 'gym',
    roomName: 'Salle de Sport'
  },
  {
    file: 'EspaceJeuxDetailSection.js',
    roomKey: 'gameRoom',
    roomName: 'Espace jeux'
  },
  {
    file: 'JardinDetailSection.js',
    roomKey: 'garden',
    roomName: 'Jardin'
  },
  {
    file: 'SousSolDetailSection.js',
    roomKey: 'basement',
    roomName: 'Sous-sol'
  }
];

// 其他房间的映射（用于 otherRooms 数组）
const roomKeyMap = {
  'salon': 'salon',
  'cuisine': 'cuisine',
  'piscine': 'piscine',
  'chambres': 'chambres',
  'salle-sport': 'gym',
  'espace-jeux': 'gameRoom',
  'jardin': 'garden',
  'sous-sol': 'basement'
};

/**
 * 修改单个组件文件
 */
function modifyComponent(componentInfo) {
  const filePath = path.join(__dirname, '../app/component', componentInfo.file);
  
  console.log(`\n📝 处理文件: ${componentInfo.file}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 文件不存在: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // 1. 添加导入语句（如果还没有）
  if (!content.includes('useLanguage')) {
    console.log('   ✓ 添加 useLanguage 导入');
    content = content.replace(
      /import { Breadcrumb } from ["']\.\/Breadcrumb["'];/,
      `import { Breadcrumb } from "./Breadcrumb";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";`
    );
    modified = true;
  }
  
  // 2. 在组件函数开始处添加 useLanguage
  if (!content.includes('const { language } = useLanguage()')) {
    console.log('   ✓ 添加 useLanguage 调用');
    const functionPattern = /export function \w+DetailSection\(\) \{[^}]*?const \[/;
    content = content.replace(
      functionPattern,
      (match) => match.replace(
        /export function (\w+DetailSection)\(\) \{/,
        `export function $1() {
  const { language } = useLanguage();
  const t = translations[language];
`
      )
    );
    modified = true;
  }
  
  // 3. 替换 name 字段使用翻译
  const namePattern = new RegExp(`name: ['"]${componentInfo.roomName}['"]`, 'g');
  if (content.match(namePattern)) {
    console.log('   ✓ 替换 name 字段');
    content = content.replace(namePattern, `name: t.pieces.${componentInfo.roomKey}.name`);
    modified = true;
  }
  
  // 4. 替换 description 字段使用翻译（保留 description: 开头，替换后面的长文本）
  const descPattern = /description:\s*`[^`]+`/;
  if (content.match(descPattern)) {
    console.log('   ✓ 替换 description 字段');
    content = content.replace(descPattern, `description: t.pieces.${componentInfo.roomKey}.description`);
    modified = true;
  }
  
  // 5. 替换面包屑中的 "Accueil"
  if (content.includes('{ label: "Accueil"')) {
    console.log('   ✓ 替换面包屑导航');
    content = content.replace(/\{ label: "Accueil"/g, '{ label: t.roomDetail.breadcrumbHome');
    content = content.replace(/\{ label: "La maison"/g, '{ label: t.roomDetail.breadcrumbHouse');
    modified = true;
  }
  
  // 6. 替换 "Description" 标题
  if (content.includes('>Description<')) {
    console.log('   ✓ 替换 Description 标题');
    content = content.replace(/>Description</g, '>{t.roomDetail.description}<');
    modified = true;
  }
  
  // 7. 替换 "Équipements" 标题
  if (content.includes('>Équipements<')) {
    console.log('   ✓ 替换 Équipements 标题');
    content = content.replace(/>Équipements</g, '>{t.roomDetail.equipment}<');
    modified = true;
  }
  
  // 8. 替换 "Autres pièces de la maison" 标题
  if (content.includes('>Autres pièces de la maison<')) {
    console.log('   ✓ 替换 Autres pièces 标题');
    content = content.replace(/>Autres pièces de la maison</g, '>{t.roomDetail.otherRooms}<');
    modified = true;
  }
  
  // 9. 替换 otherRooms 数组中的房间名称
  const otherRoomsPattern = /const otherRooms = \[([\s\S]*?)\];/;
  const otherRoomsMatch = content.match(otherRoomsPattern);
  
  if (otherRoomsMatch) {
    console.log('   ✓ 替换 otherRooms 数组');
    let otherRoomsContent = otherRoomsMatch[1];
    
    // 替换每个房间的 name
    Object.entries(roomKeyMap).forEach(([id, key]) => {
      const patterns = [
        { regex: new RegExp(`id: ['"]${id}['"],\\s*name: ['"]Salon['"]`, 'g'), replacement: `id: '${id}', name: t.pieces.salon.name` },
        { regex: new RegExp(`id: ['"]${id}['"],\\s*name: ['"]Cuisine['"]`, 'g'), replacement: `id: '${id}', name: t.pieces.cuisine.name` },
        { regex: new RegExp(`id: ['"]${id}['"],\\s*name: ['"]Piscine['"]`, 'g'), replacement: `id: '${id}', name: t.pieces.piscine.name` },
        { regex: new RegExp(`id: ['"]${id}['"],\\s*name: ['"]Chambres['"]`, 'g'), replacement: `id: '${id}', name: t.pieces.chambres.name` },
        { regex: new RegExp(`id: ['"]${id}['"],\\s*name: ['"]Salle de Sport['"]`, 'g'), replacement: `id: '${id}', name: t.pieces.gym.name` },
        { regex: new RegExp(`id: ['"]${id}['"],\\s*name: ['"]Espace jeux['"]`, 'g'), replacement: `id: '${id}', name: t.pieces.gameRoom.name` },
        { regex: new RegExp(`id: ['"]${id}['"],\\s*name: ['"]Jardin['"]`, 'g'), replacement: `id: '${id}', name: t.pieces.garden.name` },
        { regex: new RegExp(`id: ['"]${id}['"],\\s*name: ['"]Sous-sol['"]`, 'g'), replacement: `id: '${id}', name: t.pieces.basement.name` }
      ];
      
      patterns.forEach(({ regex, replacement }) => {
        if (otherRoomsContent.match(regex)) {
          otherRoomsContent = otherRoomsContent.replace(regex, replacement);
        }
      });
    });
    
    content = content.replace(otherRoomsPattern, `const otherRooms = [${otherRoomsContent}];`);
    modified = true;
  }
  
  // 保存文件
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${componentInfo.file} 修改完成！`);
    return true;
  } else {
    console.log(`⚠️  ${componentInfo.file} 无需修改`);
    return false;
  }
}

// 主函数
function main() {
  console.log('🚀 开始批量添加翻译到 DetailSection 组件...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  components.forEach(component => {
    try {
      if (modifyComponent(component)) {
        successCount++;
      }
    } catch (error) {
      console.error(`❌ 处理 ${component.file} 时出错:`, error.message);
      failCount++;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 修改统计:`);
  console.log(`   ✅ 成功: ${successCount} 个文件`);
  console.log(`   ❌ 失败: ${failCount} 个文件`);
  console.log(`\n🎉 批量修改完成！\n`);
}

// 运行脚本
main();
