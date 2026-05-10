# edu-web — 科普教育网页项目

## 项目概述

`edu-web` 是一个面向科普教育的网页平台，涵盖 AI 入门、AI 绘画、AI 视频等课程内容。项目采用纯前端 HTML/CSS/JS 构建，适合作为教学演示和互动学习使用。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | HTML5, CSS3, Vanilla JavaScript |
| 构建工具 | 可选：Parcel / Vite（暂未配置） |
| 本地服务器 | http-server (Node.js) / Python http.server |
| 部署 | GitHub Pages / 静态托管 |

## 目录结构

```
edu-web/
├── 0_ai-entry/          # AI 入门课程
├── 1_ai-picture/        # AI 绘画课程（含 PPT 素材）
├── 2_ai-video/          # AI 视频课程（含角色素材、HTML 页面）
├── hyperframes-demo/    # HyperFrames 演示（含 MP4 视频）
├── side/                # 侧边项目（如八年级数学）
├── index.html           # 项目主页
├── server.py            # Python 本地服务器
└── package.json         # Node 依赖（http-server）
```

## 开发规范

- **分支**: `main` 为主分支，所有修改通过 PR 合并
- **提交信息**: 使用中文描述，格式 `<类型>: <描述>`
- **忽略文件**: 已配置 `.gitignore`，排除 `node_modules/`、日志、缓存、视频/音频等大文件

## 本地运行

```bash
# 方式1: Node.js http-server
npm install
npx http-server -p 8080

# 方式2: Python
python3 server.py
```

## Agent 协作指南

当 AI Agent 参与本项目时，请遵循以下约定：

1. **修改前**: 先读取相关文件，理解上下文
2. **提交前**: 检查 `.gitignore` 规则，不提交二进制/缓存文件
3. **大文件**: 视频/音频素材存放于 `assets/` 子目录，Git 仅追踪引用不追踪文件本身
4. **代码风格**: HTML 语义化标签，CSS 优先使用 CSS Variables，JS 避免全局污染

## 相关链接

- 远程仓库: https://github.com/flyingcloud-code/edu-web
- 部署预览: （待配置 GitHub Pages）
