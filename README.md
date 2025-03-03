# ✨ flashNotes-ai

🚀 **闪念笔记 + AI 赋能**，让你的每个创意都能被记录并扩展！  
💡 记录灵感，AI 帮你 **分析可行性**、**搜寻类似点子**、**规划实施方案**，让你的想法更进一步！

## 🔗 在线体验

- 🌍 **前端地址**：[http://47.109.99.107:80](http://47.109.99.107:80)
- 🔧 **GitHub 仓库**：[https://github.com/Akiyama-sama/flashNotes-ai](https://github.com/Akiyama-sama/flashNotes-ai)

---

## 🎯 项目背景

💭 你是否有过 **突然冒出的好点子**，但因为没及时记录而遗忘？  
📓 你是否希望 **AI 能帮助扩展这些想法**，甚至**给出实现建议**？  
🔍 这个项目的目标就是：**随时随地记录你的灵感，并用 AI 让它更具可行性！**

> 这个想法来源于我在使用 **Obsidian** 记录笔记时，希望 AI 能帮助我 **联想、分析、调研**。

---

## 🚀 主要功能

✅ **闪念笔记** 📌

- 📝 记录你的任何想法（商业点子、灵感、故事、金句等）
- 🔄 本地存储（MVP 版本先用 localStorage）

✅ **AI 智能分析** 🧠

- 🤖 **可行性分析**：AI 帮助判断这个想法是否可落地
- 🔗 **寻找类似点子**：看看世界上有没有类似的想法
- 📋 **生成实现方案**：帮助拆解你的想法，提供执行清单

---

## 🛠 技术栈

|端|技术栈|
|---|---|
|🎨 **前端**|React + Vite ⚡|
|📦 **后端**|Spring Boot ☕|
|🏗 **部署**|Nginx + Systemd + GitHub Actions (计划中)|

---

## 📸 界面预览

🚧 ![项目展示](https://private-user-images.githubusercontent.com/138316429/418392911-22a370ca-ae84-4fc1-9197-b80fa200a0b1.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDA5NjMzODEsIm5iZiI6MTc0MDk2MzA4MSwicGF0aCI6Ii8xMzgzMTY0MjkvNDE4MzkyOTExLTIyYTM3MGNhLWFlODQtNGZjMS05MTk3LWI4MGZhMjAwYTBiMS5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzAzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMwM1QwMDUxMjFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02ZmEwOGIwYmM3MjZlOWJjNTMxNDYzNzI3NzBjMGZlOTBhNDI5NWM5NzRjZGFkNWQwODcxODczZGM2ZDkwMTY3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.z1OoWjJzdbvP2Cq81JFXT2H05qyjjhURzz79vmSrZwg)🚧
---

## ⏳ 快速开始

### 1️⃣ 克隆 & 安装依赖

克隆到本地文件夹
```bash
git clone https://github.com/Akiyama-sama/flashNotes-ai.git
```

安装依赖
```bash
cd flashNotes-ai
npm install
```


### 2️⃣ 运行前端

```bash
# 开发模式 
npm run dev 
# 构建生产模式 
npm run build
```

🚀 在本地访问 http://localhost:5173

### 3️⃣ 运行后端（Spring Boot）

待开源...

---

## 🏗 项目结构

```csharp
flashNotes-ai/
│
├── dist/                     # 📦 构建后（build）文件夹（生产环境代码）
├── node_modules/             # 📂 依赖文件（npm install 后生成）
├── public/                   # 🌍 公共静态资源（可直接访问）
│
├── src/                      # 📝 源码目录
│   ├── assets/               # 🎨 资源文件（SVG 图标等）
│   │   ├── back.svg
│   │   ├── delete.svg
│   │   ├── search.svg
│   │
│   ├── components/           # 🏗 复用组件
│   │   ├── AICard.jsx        # 🤖 AI 分析卡片组件
│   │   ├── NoteCard.jsx      # 📝 笔记卡片组件
│   │
│   ├── pages/                # 📄 页面组件
│   │   ├── Home.jsx          # 🏠 主页（显示所有笔记）
│   │   ├── NoteDetail.jsx    # 📖 笔记详情页
│   │
│   ├── services/             # 🔌 服务层（API、数据存储）
│   │   ├── aiService.js      # 🤖 AI 相关 API 请求封装
│   │   ├── dataStore.js      # 📦 数据存储管理（localStorage 操作）
│   │
│   ├── styles/               # 🎨 样式文件
│   │   ├── AICard.css        # 🤖 AI 分析卡片样式
│   │   ├── NoteCard.css      # 📝 笔记卡片样式
│   │   ├── NoteDetail.css    # 📖 笔记详情页样式
│   │
│   ├── utils/                # 🛠 工具函数
│   │
│   ├── App.css               # 🎨 全局样式
│   ├── App.jsx               # 🏗 根组件，管理路由
│   ├── index.css             # 🎨 全局 CSS
│   ├── main.jsx              # 🚀 应用入口，渲染 React 组件
│
├── .gitignore                # 🚫 Git 忽略文件
├── eslint.config.js          # ✅ ESLint 代码风格配置
├── index.html                # 📜 HTML 入口文件
├── LICENSE                   # ⚖️ 许可协议
├── package.json              # 📦 项目依赖 & 配置
├── package-lock.json         # 🔒 依赖版本锁定文件

```

---


## 👏 贡献指南

🎉 欢迎任何形式的贡献！  
📌 **如何贡献？**

1. 🍴 **Fork** 本仓库
2. 🌿 **创建新分支**
3. 🛠 **实现功能 & 提交 PR**
4. 🚀 **等待合并！**

📢 **参与讨论 & 提建议**

- 📌 提交 [GitHub Issues](https://github.com/Akiyama-sama/flashNotes-ai/issues)
- 📧 发送邮件至：lichengyu2005119@gmail.com

---

## 📜 许可证

📄 本项目基于 MIT License 开源，你可以自由使用和修改。


🎉 **感谢你的关注！希望你能喜欢 flashNotes-ai！💖**  
🔧 如果你发现 Bug，或者有新的想法，欢迎提交 Issue 或 PR！🚀

