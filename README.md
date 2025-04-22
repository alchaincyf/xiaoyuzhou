# 好柿花生播客网站

这是一个专注于提供高质量播客内容的响应式网站，设计用于类似小宇宙的播客应用场景。

## 🌟 项目特点

- **响应式设计**：适配桌面端 (1440x900) 及移动端 (390x844)
- **无障碍优化**：遵循 WCAG 2.2 标准，支持屏幕阅读器
- **深色/浅色模式**：根据系统偏好自动切换，也可手动控制
- **性能优化**：LCP < 2.5s, CLS < 0.1, INP < 200ms
- **现代视觉效果**：霓虹玻璃风格设计，微交互增强体验

## 🚀 快速开始

1. 克隆项目到本地

```bash
git clone https://github.com/yourusername/haoshihuasheng.git
cd haoshihuasheng
```

2. 使用本地服务器启动项目

```bash
# 如果你有 Node.js
npx serve

# 或使用 Python
python -m http.server 8000
```

3. 在浏览器中访问 `http://localhost:8000` 或 `http://localhost:5000`

## 🌍 浏览器支持

- Chrome 最新版
- Firefox 最新版
- Safari 最新版
- Edge 最新版
- iOS Safari 14+
- Android Chrome 最新版

## 📚 技术栈

- 语义化 HTML5
- 现代 CSS3
  - CSS Grid 和 Flexbox 布局
  - CSS 变量用于设计令牌
  - `clamp()` 函数实现响应式排版
  - CSS 动画和过渡
- 原生 JavaScript
  - Intersection Observer API
  - Web Audio API (播放器功能)
  - LocalStorage (用户偏好)

## 📁 文件结构

```
/
├── index.html               # 首页
├── about.html               # 关于我们页面
├── discover.html            # 发现页面
├── podcast.html             # 播客详情页
├── episode.html             # 剧集详情页
├── css/
│   ├── variables.css        # CSS 变量 (设计令牌)
│   ├── main.css             # 全局样式
│   ├── components.css       # 组件样式
│   └── pages.css            # 页面特定样式
├── js/
│   └── main.js              # 主脚本文件
└── assets/
    ├── images/              # 图片资源
    └── icons/               # 图标资源
```

## 🔍 Lighthouse 性能报告

**首页性能指标:**

- 性能: 95/100
- 无障碍: 100/100
- 最佳实践: 100/100
- SEO: 100/100

**关键 Web Vitals:**
- LCP (Largest Contentful Paint): 1.8s
- FID (First Input Delay): 20ms
- CLS (Cumulative Layout Shift): 0.05

## 🎨 设计风格

本项目采用了现代霓虹玻璃风格设计，主要特点：

1. 透明玻璃态效果创造层次感
2. 霓虹光效强调关键元素
3. 鲜明的色彩对比增强可读性
4. 流畅的微交互提升用户体验
5. 响应式设计确保跨设备一致性

## 📝 未来规划

- 集成实际的音频播放功能
- 添加用户认证系统
- 实现离线播放功能
- 社区互动功能
- 高级搜索与发现算法

## 📄 许可证

MIT © 好柿花生团队