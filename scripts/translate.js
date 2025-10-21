/**
 * 自动翻译脚本 - 批量翻译 translations.js
 * 使用 Google Translate API 一次性翻译所有文本
 */

const fs = require('fs');
const path = require('path');

// ============================================
// 配置部分
// ============================================

const CONFIG = {
  // Google Translate API 配置
  // 免费替代方案：使用 @vitalets/google-translate-api (无需API key)
  USE_FREE_API: true, // true = 使用免费API, false = 使用官方API
  
  // 官方 Google Translate API (需要 API key)
  GOOGLE_API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY || 'YOUR_API_KEY_HERE',
  
  // 翻译语言
  SOURCE_LANG: 'fr',
  TARGET_LANGS: ['en', 'cn'], // 中文用 'zh-CN'
  
  // 文件路径
  INPUT_FILE: path.join(__dirname, '../app/translations.js'),
  OUTPUT_FILE: path.join(__dirname, '../app/translations.js'),
  
  // 批量翻译配置
  DELIMITER: '\n###SEPARATOR###\n', // 文本分隔符 - 使用不会被翻译的标记
  MAX_CHARS_PER_REQUEST: 5000, // Google API 限制每次请求的字符数
};

// ============================================
// 辅助函数
// ============================================

/**
 * 从 translations.js 提取法语文本
 */
function extractTranslations(translationsObj) {
  const texts = [];
  const paths = [];
  
  function traverse(obj, currentPath = []) {
    for (const key in obj) {
      const value = obj[key];
      const newPath = [...currentPath, key];
      
      if (typeof value === 'string') {
        texts.push(value);
        paths.push(newPath);
      } else if (typeof value === 'object' && value !== null) {
        traverse(value, newPath);
      }
    }
  }
  
  traverse(translationsObj);
  return { texts, paths };
}

/**
 * 将翻译结果重新组装成对象结构
 */
function assembleTranslations(paths, translatedTexts) {
  const result = {};
  
  paths.forEach((path, index) => {
    let current = result;
    
    // 遍历路径，创建嵌套对象
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
    
    // 设置最终值
    const lastKey = path[path.length - 1];
    current[lastKey] = translatedTexts[index];
  });
  
  return result;
}

/**
 * 将文本数组分批
 */
function batchTexts(texts, maxCharsPerBatch) {
  const batches = [];
  let currentBatch = [];
  let currentLength = 0;
  
  texts.forEach(text => {
    const textLength = text.length + CONFIG.DELIMITER.length;
    
    if (currentLength + textLength > maxCharsPerBatch && currentBatch.length > 0) {
      batches.push(currentBatch);
      currentBatch = [text];
      currentLength = textLength;
    } else {
      currentBatch.push(text);
      currentLength += textLength;
    }
  });
  
  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }
  
  return batches;
}

// ============================================
// 翻译函数 - 免费 API (推荐)
// ============================================

/**
 * 使用免费 Google Translate API
 * 需要安装: npm install @vitalets/google-translate-api
 */
async function translateWithFreeAPI(texts, targetLang) {
  try {
    const { translate } = require('@vitalets/google-translate-api');
    
    console.log(`\n🔄 翻译 ${texts.length} 个文本到 ${targetLang}...`);
    
    const langCode = targetLang === 'cn' ? 'zh-CN' : targetLang;
    const translatedTexts = [];
    
    // 逐个翻译以避免分隔符问题
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      if (i % 10 === 0) {
        console.log(`   进度: ${i}/${texts.length}`);
      }
      
      // 重试机制
      let retries = 3;
      let success = false;
      let translatedText = '';
      
      while (retries > 0 && !success) {
        try {
          const result = await translate(text, {
            from: CONFIG.SOURCE_LANG,
            to: langCode
          });
          translatedText = result.text;
          success = true;
        } catch (error) {
          retries--;
          if (retries > 0) {
            console.log(`   ⚠️  翻译失败，等待 3 秒后重试... (剩余 ${retries} 次)`);
            await new Promise(resolve => setTimeout(resolve, 3000));
          } else {
            throw error;
          }
        }
      }
      
      translatedTexts.push(translatedText);
      
      // 添加延迟避免API限制 (增加到1秒)
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`✅ 翻译完成！`);
    return translatedTexts;
    
  } catch (error) {
    console.error(`❌ 翻译失败:`, error.message);
    throw error;
  }
}

// ============================================
// 翻译函数 - 官方 API (需要付费)
// ============================================

/**
 * 使用官方 Google Translate API
 * 需要安装: npm install @google-cloud/translate
 */
async function translateWithOfficialAPI(texts, targetLang) {
  try {
    const { Translate } = require('@google-cloud/translate').v2;
    const translate = new Translate({ key: CONFIG.GOOGLE_API_KEY });
    
    console.log(`\n🔄 翻译 ${texts.length} 个文本到 ${targetLang}...`);
    
    // 合并所有文本
    const combinedText = texts.join(CONFIG.DELIMITER);
    
    // 翻译
    const langCode = targetLang === 'cn' ? 'zh-CN' : targetLang;
    const [translations] = await translate.translate(combinedText, {
      from: CONFIG.SOURCE_LANG,
      to: langCode
    });
    
    // 分割结果
    const translatedTexts = translations.split(CONFIG.DELIMITER);
    
    console.log(`✅ 翻译完成！`);
    return translatedTexts;
    
  } catch (error) {
    console.error(`❌ 翻译失败:`, error.message);
    throw error;
  }
}

// ============================================
// 主翻译函数
// ============================================

async function translateTexts(texts, targetLang) {
  // 根据配置选择 API
  if (CONFIG.USE_FREE_API) {
    return await translateWithFreeAPI(texts, targetLang);
  } else {
    return await translateWithOfficialAPI(texts, targetLang);
  }
}

// ============================================
// 主执行函数
// ============================================

async function main() {
  console.log('🚀 开始批量翻译...\n');
  
  try {
    // 1. 读取 translations.js
    console.log('📖 读取 translations.js...');
    const translationsPath = CONFIG.INPUT_FILE;
    
    // 动态导入 translations.js
    delete require.cache[require.resolve(translationsPath)];
    const { translations } = require(translationsPath);
    
    // 2. 提取法语文本
    console.log('🔍 提取法语文本...');
    const { texts: frTexts, paths } = extractTranslations(translations.fr);
    console.log(`   找到 ${frTexts.length} 个需要翻译的文本`);
    
    // 3. 翻译到所有目标语言
    const allTranslations = { fr: translations.fr };
    
    for (const targetLang of CONFIG.TARGET_LANGS) {
      console.log(`\n📝 翻译到 ${targetLang.toUpperCase()}...`);
      
      // 翻译
      const translatedTexts = await translateTexts(frTexts, targetLang);
      
      // 组装成对象
      const translatedObj = assembleTranslations(paths, translatedTexts);
      allTranslations[targetLang] = translatedObj;
      
      console.log(`✅ ${targetLang.toUpperCase()} 翻译完成！`);
    }
    
    // 4. 生成新的 translations.js 内容
    console.log('\n📝 生成新的 translations.js...');
    const outputContent = `export const translations = ${JSON.stringify(allTranslations, null, 2)};`;
    
    // 5. 写入文件
    fs.writeFileSync(CONFIG.OUTPUT_FILE, outputContent, 'utf8');
    console.log(`✅ 文件已保存到: ${CONFIG.OUTPUT_FILE}`);
    
    // 6. 统计信息
    console.log('\n📊 翻译统计:');
    console.log(`   - 源语言: ${CONFIG.SOURCE_LANG}`);
    console.log(`   - 目标语言: ${CONFIG.TARGET_LANGS.join(', ')}`);
    console.log(`   - 翻译文本数: ${frTexts.length}`);
    console.log(`   - 总字符数: ${frTexts.join('').length}`);
    
    console.log('\n🎉 批量翻译完成！');
    
  } catch (error) {
    console.error('\n❌ 翻译失败:', error);
    process.exit(1);
  }
}

// ============================================
// 执行
// ============================================

if (require.main === module) {
  main();
}

module.exports = { main, translateTexts, extractTranslations, assembleTranslations };
