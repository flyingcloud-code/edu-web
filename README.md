# edu-web

> 科普教育网页平台 — AI 入门、AI 绘画、AI 视频等互动课程内容

## 项目简介

`edu-web` 是一个面向青少年的科普教育网页平台，通过互动式 HTML 页面教授 AI 基础知识，包括：

- **AI 入门** — 人工智能基础概念与体验
- **AI 绘画** — 利用 AI 工具创作角色与场景
- **AI 视频** — 从脚本到成片的 AI 视频制作流程

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/flyingcloud-code/edu-web.git
cd edu-web

# 启动本地服务器（方式1: Node.js）
npm install
npx http-server -p 8080

# 或（方式2: Python）
python3 server.py
```

访问 http://localhost:8080 即可浏览课程主页。

## 目录结构

```
edu-web/
├── 0_ai-entry/          # AI 入门课程
├── 1_ai-picture/        # AI 绘画课程（含 PPT 素材）
├── 2_ai-video/          # AI 视频课程（含角色素材、HTML 页面）
├── hyperframes-demo/    # HyperFrames 演示
├── side/                # 侧边项目（如八年级数学）
├── index.html           # 项目主页
├── server.py            # Python 本地服务器
└── package.json         # Node 依赖
```

## 技术栈

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **本地服务器**: http-server (Node.js) / Python http.server
- **部署**: GitHub Pages / 静态托管

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -m 'feat: add xxx'`)
4. 推送分支 (`git push origin feature/xxx`)
5. 创建 Pull Request

## 许可证

MIT License — 详见 [LICENSE](LICENSE)（如适用）

---

<p align="center">Made with ❤️ for AI education</p>
