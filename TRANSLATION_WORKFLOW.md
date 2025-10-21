# 🌐 完整的翻译工作流程

## 🎯 目标
为 Royal Auffreville 网站添加多语言支持，支持法语、英语、中文（以及未来更多语言）。

## 📁 文件结构
```
royalAuffreville/
├── app/
│   ├── translations.js          # 翻译文件（主文件）
│   ├── context/
│   │   └── LanguageContext.js   # 语言上下文
│   └── component/
│       └── ...                  # 各个组件
├── scripts/
│   ├── translate.js             # 自动翻译脚本
│   ├── backup.sh                # 备份恢复脚本
│   └── README.md                # 详细文档
├── backups/                     # 自动备份目录
└── QUICK_START_TRANSLATION.md   # 快速开始指南
```

## 🚀 完整工作流程

### 1️⃣ 首次设置（只需做一次）

```bash
# 1. 安装翻译工具
npm run translate:install

# 或者
npm install @vitalets/google-translate-api

# 2. 创建初始备份
./scripts/backup.sh backup
```

### 2️⃣ 添加新内容

在 `app/translations.js` 的 `fr` 部分添加新文本：

```javascript
export const translations = {
  fr: {
    // 现有内容...
    
    // 新增内容
    newSection: {
      title: "Nouveau Titre",
      description: "Description en français",
      button: "Cliquez ici"
    }
  }
}
```

### 3️⃣ 自动翻译

```bash
# 运行翻译脚本
npm run translate
```

翻译过程：
```
🚀 开始批量翻译...

📖 读取 translations.js...
🔍 提取法语文本...
   找到 159 个需要翻译的文本

📝 翻译到 EN...
🔄 翻译 159 个文本到 en...
✅ 翻译完成！

📝 翻译到 CN...
🔄 翻译 159 个文本到 cn...
✅ 翻译完成！

📊 翻译统计:
   - 源语言: fr
   - 目标语言: en, cn
   - 翻译文本数: 159
   - 总字符数: 8567

🎉 批量翻译完成！
```

### 4️⃣ 审核和调整

自动翻译后，检查重要内容：

```javascript
// 翻译前
fr: {
  hero: {
    title: "Un havre de paix à seulement 45 minutes de Paris"
  }
}

// 自动翻译后
en: {
  hero: {
    title: "A haven of peace just 45 minutes from Paris"
  }
}

cn: {
  hero: {
    title: "距巴黎仅45分钟的宁静天堂"
  }
}

// 如果需要，手动调整：
cn: {
  hero: {
    title: "距巴黎仅45分钟的宁静度假村"  // 更符合品牌定位
  }
}
```

### 5️⃣ 测试

```bash
# 启动开发服务器
npm run dev

# 在浏览器中测试
# http://localhost:3000
# 切换语言，检查所有页面
```

### 6️⃣ 部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 🔄 日常维护工作流程

### 场景 1：添加新页面

1. **添加法语内容**
```javascript
fr: {
  newPage: {
    title: "Nouvelle Page",
    content: "Contenu de la page..."
  }
}
```

2. **运行翻译**
```bash
npm run translate
```

3. **在组件中使用**
```javascript
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

function NewPage() {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <div>
      <h1>{t.newPage.title}</h1>
      <p>{t.newPage.content}</p>
    </div>
  );
}
```

### 场景 2：修改现有文本

1. **修改法语原文**
2. **运行翻译**：`npm run translate`
3. **测试验证**

### 场景 3：添加新语言（如西班牙语）

1. **修改翻译脚本配置**
```javascript
// scripts/translate.js
const CONFIG = {
  TARGET_LANGS: ['en', 'cn', 'es'],  // 添加 'es'
};
```

2. **运行翻译**
```bash
npm run translate
```

3. **更新语言选择器**
```javascript
// Header.js
const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'cn', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },  // 新增
];
```

## 🛡️ 备份和恢复

### 创建备份
```bash
./scripts/backup.sh backup
```

### 查看所有备份
```bash
./scripts/backup.sh list
```

输出示例：
```
📋 可用的备份:

1. translations_20251016_143025.js (Oct 16 14:30)
2. translations_20251016_120515.js (Oct 16 12:05)
3. translations_20251015_183042.js (Oct 15 18:30)
```

### 恢复备份
```bash
# 恢复第1个备份（最新的）
./scripts/backup.sh restore 1
```

## 📊 翻译质量保证

### 自动检查
创建一个检查脚本验证翻译完整性：

```bash
# 检查所有语言是否有相同的键
node scripts/check-translations.js
```

### 手动审核清单
- [ ] 品牌名称正确（Royal Auffreville）
- [ ] 专有名词保持原样
- [ ] 按钮文本简洁明了
- [ ] 错误消息清晰易懂
- [ ] 表单标签准确
- [ ] 导航菜单一致

### 关键页面人工审核
- Hero 页面标题和副标题
- Contact 页面表单
- 预订页面文案
- 关于我们页面

## 🎨 最佳实践

### ✅ 推荐做法

1. **保持法语为源语言**
   - 所有新内容先用法语编写
   - 法语版本经过精心打磨
   - 其他语言从法语翻译

2. **定期备份**
   ```bash
   # 每次翻译前
   ./scripts/backup.sh backup
   ```

3. **批量翻译**
   - 一次性翻译所有新内容
   - 不要一个一个翻译

4. **结构化组织**
   ```javascript
   translations: {
     fr: {
       common: { ... },     // 公共文本
       pages: {
         home: { ... },     // 首页
         contact: { ... },  // 联系页
       },
       components: {
         header: { ... },   // Header组件
         footer: { ... },   // Footer组件
       }
     }
   }
   ```

### ❌ 避免做法

1. **不要手动翻译大量文本**
   - 效率低
   - 容易出错
   - 使用自动翻译 + 人工审核

2. **不要直接在组件中硬编码文本**
   ```javascript
   // ❌ 错误
   <h1>Un havre de paix</h1>
   
   // ✅ 正确
   <h1>{t.hero.title}</h1>
   ```

3. **不要忘记翻译错误消息**
   ```javascript
   // ✅ 正确
   errors: {
     emailInvalid: "Format d'email invalide"
   }
   ```

## 📈 性能优化

### 翻译文件大小
当前大小：~50KB
- 法语：~17KB
- 英语：~17KB
- 中文：~16KB

### 优化建议
1. **代码分割**（如果文件 > 100KB）
2. **懒加载**不常用语言
3. **压缩**生产构建

## 🔮 未来扩展

### 计划添加的语言
- 🇪🇸 西班牙语
- 🇩🇪 德语
- 🇮🇹 意大利语
- 🇯🇵 日语

### 高级功能
- [ ] 翻译版本管理
- [ ] A/B 测试不同翻译
- [ ] 用户反馈收集
- [ ] 专业译者审核系统

## 📞 获取帮助

### 遇到问题？
1. 查看 `scripts/README.md` 详细文档
2. 检查 `QUICK_START_TRANSLATION.md` 快速指南
3. 运行 `./scripts/backup.sh help` 查看备份命令

### 常见问题

**Q: 翻译后网站显示不正确？**
A: 清除浏览器缓存，重启开发服务器

**Q: 某些文本没有翻译？**
A: 检查组件是否使用了 `useLanguage()` 和 `translations[language]`

**Q: 想要更准确的翻译？**
A: 使用官方 Google Translate API（需付费），或者人工审核调整

## 🎉 总结

使用这套工作流程，你可以：
- ✅ 5分钟完成全站翻译
- ✅ 轻松添加新语言
- ✅ 保持翻译一致性
- ✅ 随时备份和恢复
- ✅ 持续优化翻译质量

**让多语言支持变得简单高效！** 🚀
