/**
 * 检查翻译完整性
 * 确保所有语言有相同的键结构
 */

const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * 获取对象所有路径
 */
function getAllPaths(obj, prefix = '') {
  const paths = [];
  
  for (const key in obj) {
    const value = obj[key];
    const currentPath = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      paths.push(currentPath);
    } else if (typeof value === 'object' && value !== null) {
      paths.push(...getAllPaths(value, currentPath));
    }
  }
  
  return paths;
}

/**
 * 检查翻译完整性
 */
function checkTranslations() {
  try {
    log('blue', '\n🔍 检查翻译完整性...\n');
    
    // 读取 translations.js
    const translationsPath = path.join(__dirname, '../app/translations.js');
    delete require.cache[require.resolve(translationsPath)];
    const { translations } = require(translationsPath);
    
    // 获取所有语言
    const languages = Object.keys(translations);
    log('green', `📚 找到 ${languages.length} 种语言: ${languages.join(', ')}`);
    
    // 获取每种语言的所有路径
    const pathsByLanguage = {};
    languages.forEach(lang => {
      pathsByLanguage[lang] = new Set(getAllPaths(translations[lang]));
    });
    
    // 统计信息
    log('blue', '\n📊 统计信息:');
    languages.forEach(lang => {
      log('green', `   ${lang}: ${pathsByLanguage[lang].size} 个翻译键`);
    });
    
    // 检查缺失的键
    log('blue', '\n🔎 检查缺失的键...');
    let hasIssues = false;
    
    // 以第一种语言为基准
    const referenceLang = languages[0];
    const referencePaths = pathsByLanguage[referenceLang];
    
    languages.forEach(lang => {
      if (lang === referenceLang) return;
      
      const currentPaths = pathsByLanguage[lang];
      
      // 检查缺失的键
      const missingInCurrent = [...referencePaths].filter(p => !currentPaths.has(p));
      const extraInCurrent = [...currentPaths].filter(p => !referencePaths.has(p));
      
      if (missingInCurrent.length > 0) {
        hasIssues = true;
        log('red', `\n❌ ${lang} 缺失 ${missingInCurrent.length} 个键:`);
        missingInCurrent.slice(0, 10).forEach(path => {
          log('yellow', `   - ${path}`);
        });
        if (missingInCurrent.length > 10) {
          log('yellow', `   ... 还有 ${missingInCurrent.length - 10} 个`);
        }
      }
      
      if (extraInCurrent.length > 0) {
        hasIssues = true;
        log('red', `\n❌ ${lang} 多余 ${extraInCurrent.length} 个键:`);
        extraInCurrent.slice(0, 10).forEach(path => {
          log('yellow', `   - ${path}`);
        });
        if (extraInCurrent.length > 10) {
          log('yellow', `   ... 还有 ${extraInCurrent.length - 10} 个`);
        }
      }
      
      if (missingInCurrent.length === 0 && extraInCurrent.length === 0) {
        log('green', `   ✅ ${lang} 翻译完整`);
      }
    });
    
    // 检查空值
    log('blue', '\n🔎 检查空值...');
    let hasEmptyValues = false;
    
    languages.forEach(lang => {
      const emptyPaths = [];
      
      function checkEmpty(obj, prefix = '') {
        for (const key in obj) {
          const value = obj[key];
          const currentPath = prefix ? `${prefix}.${key}` : key;
          
          if (typeof value === 'string') {
            if (!value.trim()) {
              emptyPaths.push(currentPath);
            }
          } else if (typeof value === 'object' && value !== null) {
            checkEmpty(value, currentPath);
          }
        }
      }
      
      checkEmpty(translations[lang]);
      
      if (emptyPaths.length > 0) {
        hasEmptyValues = true;
        log('red', `\n❌ ${lang} 有 ${emptyPaths.length} 个空值:`);
        emptyPaths.slice(0, 5).forEach(path => {
          log('yellow', `   - ${path}`);
        });
        if (emptyPaths.length > 5) {
          log('yellow', `   ... 还有 ${emptyPaths.length - 5} 个`);
        }
      } else {
        log('green', `   ✅ ${lang} 无空值`);
      }
    });
    
    // 最终总结
    log('blue', '\n' + '='.repeat(50));
    if (!hasIssues && !hasEmptyValues) {
      log('green', '\n✅ 所有翻译检查通过！');
      log('green', '   - 所有语言的键结构一致');
      log('green', '   - 没有缺失或多余的键');
      log('green', '   - 没有空值');
    } else {
      log('red', '\n⚠️  发现问题，请修复后重新检查');
      if (hasIssues) {
        log('yellow', '   - 有缺失或多余的键');
      }
      if (hasEmptyValues) {
        log('yellow', '   - 有空值');
      }
      process.exit(1);
    }
    log('blue', '='.repeat(50) + '\n');
    
  } catch (error) {
    log('red', '\n❌ 检查失败:');
    log('red', error.message);
    process.exit(1);
  }
}

// 运行检查
if (require.main === module) {
  checkTranslations();
}

module.exports = { checkTranslations };
