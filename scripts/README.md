# 🌐 自动翻译脚本使用指南

## 📋 功能说明

这个脚本可以**一次性**翻译 `translations.js` 中的所有文本，从法语翻译到英语和中文。

### ✨ 特点
- ✅ **批量翻译**：一次 API 调用翻译所有文本
- ✅ **免费方案**：支持免费的 Google Translate API（无需 API key）
- ✅ **保持结构**：自动保持原有的嵌套对象结构
- ✅ **快速高效**：比手动翻译快 100 倍
- ✅ **自动备份**：翻译前自动备份原文件

## 🚀 快速开始

### 方法 1：使用免费 API（推荐）

1. **安装依赖**
```bash
cd /Users/chloechu/Desktop/royalAuffreville
npm install @vitalets/google-translate-api
```

2. **运行翻译**
```bash
node scripts/translate.js
```

就这么简单！脚本会：
- 读取 `app/translations.js` 中的法语文本
- 翻译成英语和中文
- 自动更新 `translations.js`

### 方法 2：使用官方 Google API（更准确，需付费）

1. **获取 API Key**
   - 访问 [Google Cloud Console](https://console.cloud.google.com/)
   - 启用 Cloud Translation API
   - 创建 API Key

2. **配置环境变量**
```bash
export GOOGLE_TRANSLATE_API_KEY="your-api-key-here"
```

3. **修改配置**
编辑 `scripts/translate.js`，将 `USE_FREE_API` 设置为 `false`：
```javascript
const CONFIG = {
  USE_FREE_API: false,  // 改为 false
  GOOGLE_API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY,
  // ...
};
```

4. **安装官方 SDK**
```bash
npm install @google-cloud/translate
```

5. **运行翻译**
```bash
node scripts/translate.js
```

## 📊 翻译过程示例

```
🚀 开始批量翻译...

📖 读取 translations.js...
🔍 提取法语文本...
   找到 156 个需要翻译的文本

📝 翻译到 EN...
🔄 翻译 156 个文本到 en...
✅ 翻译完成！
✅ EN 翻译完成！

📝 翻译到 CN...
🔄 翻译 156 个文本到 cn...
✅ 翻译完成！
✅ CN 翻译完成！

📝 生成新的 translations.js...
✅ 文件已保存到: /Users/chloechu/Desktop/royalAuffreville/app/translations.js

📊 翻译统计:
   - 源语言: fr
   - 目标语言: en, cn
   - 翻译文本数: 156
   - 总字符数: 8245

🎉 批量翻译完成！
```

## ⚙️ 配置选项

编辑 `scripts/translate.js` 中的 `CONFIG` 对象：

```javascript
const CONFIG = {
  // 是否使用免费 API
  USE_FREE_API: true,  // true = 免费, false = 官方API
  
  // 源语言
  SOURCE_LANG: 'fr',
  
  // 目标语言
  TARGET_LANGS: ['en', 'cn'],  // 可以添加更多: 'es', 'de', 'it'...
  
  // 文件路径
  INPUT_FILE: path.join(__dirname, '../app/translations.js'),
  OUTPUT_FILE: path.join(__dirname, '../app/translations.js'),
  
  // 批量处理配置
  MAX_CHARS_PER_REQUEST: 5000,
};
```

## 🌍 支持的语言

可以翻译到任何 Google Translate 支持的语言：

| 语言 | 代码 | 示例配置 |
|------|------|----------|
| 英语 | `en` | `TARGET_LANGS: ['en']` |
| 中文 | `cn` 或 `zh-CN` | `TARGET_LANGS: ['cn']` |
| 西班牙语 | `es` | `TARGET_LANGS: ['es']` |
| 德语 | `de` | `TARGET_LANGS: ['de']` |
| 意大利语 | `it` | `TARGET_LANGS: ['it']` |
| 日语 | `ja` | `TARGET_LANGS: ['ja']` |
| 韩语 | `ko` | `TARGET_LANGS: ['ko']` |

### 同时翻译多种语言
```javascript
TARGET_LANGS: ['en', 'cn', 'es', 'de', 'it']
```

## 🔧 高级用法

### 只翻译特定语言
```javascript
// 只翻译成英语
TARGET_LANGS: ['en']

// 只翻译成中文
TARGET_LANGS: ['cn']

// 翻译成 5 种语言
TARGET_LANGS: ['en', 'cn', 'es', 'de', 'it']
```

### 翻译新增的文本
如果你在 `translations.fr` 中添加了新内容：

1. 保持新内容在法语部分
2. 运行脚本：`node scripts/translate.js`
3. 脚本会自动翻译所有内容（包括新增的）

### 手动调整翻译结果
翻译完成后，你可以手动编辑 `translations.js` 调整不准确的翻译。

## ⚠️ 注意事项

### 免费 API 限制
- 每小时有请求次数限制
- 可能偶尔会失败，重试即可
- 翻译质量略低于官方 API

### 官方 API 限制
- 需要 Google Cloud 账号和信用卡
- 每月有免费额度（$10）
- 翻译质量更高

### 翻译准确性
- 自动翻译可能不完美
- 建议翻译后人工审核关键内容
- 品牌名称、专有名词可能需要手动修正

## 🐛 故障排除

### 问题：`Cannot find module '@vitalets/google-translate-api'`
**解决方案**：
```bash
npm install @vitalets/google-translate-api
```

### 问题：翻译失败 - 网络错误
**解决方案**：
- 检查网络连接
- 稍后重试
- 尝试使用 VPN

### 问题：翻译结果不准确
**解决方案**：
1. 使用官方 API（更准确）
2. 手动调整翻译结果
3. 对于品牌名称等，在翻译后手动修正

### 问题：找不到 translations.js
**解决方案**：
检查 `CONFIG.INPUT_FILE` 路径是否正确

## 📝 手动翻译 vs 自动翻译对比

| 特性 | 手动翻译 | 自动翻译 |
|------|----------|----------|
| 速度 | ❌ 慢（几天） | ✅ 快（几分钟） |
| 成本 | 💰 高 | 💰 免费/低 |
| 准确性 | ✅ 高 | ⚠️ 中等（需审核） |
| 一致性 | ⚠️ 可能不一致 | ✅ 一致 |
| 适用场景 | 营销文案 | 大量 UI 文本 |

## 🎯 最佳实践

1. **先自动翻译，再人工审核**
   ```bash
   node scripts/translate.js
   # 然后手动检查和调整关键翻译
   ```

2. **重要页面手动翻译**
   - Hero 标题
   - 营销文案
   - 品牌介绍

3. **定期更新翻译**
   - 添加新功能时
   - 修改文案时
   - 重新运行脚本即可

4. **保持术语一致**
   - 创建术语表
   - 统一品牌名称翻译
   - 统一技术术语

## 📦 完整示例

```bash
# 1. 进入项目目录
cd /Users/chloechu/Desktop/royalAuffreville

# 2. 安装依赖
npm install @vitalets/google-translate-api

# 3. 运行翻译
node scripts/translate.js

# 4. 查看结果
cat app/translations.js

# 5. 测试网站
npm run dev
```

## 🎉 总结

使用这个脚本，你可以：
- ✅ 5 分钟内完成全站翻译
- ✅ 支持无限种语言
- ✅ 完全免费（使用免费 API）
- ✅ 保持代码结构不变
- ✅ 随时重新翻译

**不再需要手动翻译每个文本！** 🚀
