# Claude 生态展示网站

一个以 **Human × system** 为视觉方向的中文单页展示网站，用来介绍 Claude 如何帮助人理解上下文、拆解问题、创造内容，并把想法推进到下一步。

## 项目特点

- Vite + React + TypeScript
- 单页滚动叙事：Hero → 能力 → 场景 → 互动演示 → CTA
- 明亮编辑感与终端/对话界面结合的视觉系统
- 四类能力：理解、思考、创造、协作
- 三类场景：日常工作、创造与学习、开发与构建
- 四个预设问题驱动的本地模拟演示
- 响应式布局、键盘可访问交互和 `prefers-reduced-motion` 支持
- 无外部图片、无大型动画库、无后端依赖

## 运行

需要 Node.js 20 或更高版本。

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认地址为 `http://localhost:5173`。

## 验证

运行全部测试：

```bash
npm run test:run
```

监听模式运行测试：

```bash
npm test
```

生成生产构建：

```bash
npm run build
```

本地预览生产构建：

```bash
npm run preview
```

## 范围边界

这是一个静态概念展示项目，不是 Claude 产品本身，也没有接入真实 Claude API：

- 不需要 API key 或其他 secret
- 不发起网络请求
- 不发送或保存访客输入
- 不使用登录、账号、cookie、localStorage 或分析埋点
- 互动演示中的回应全部来自 `src/data/showcase.ts` 的静态数据

## 目录结构

```text
src/
├─ components/
│  ├─ Navigation.tsx
│  ├─ HeroSection.tsx
│  ├─ CapabilityMap.tsx
│  ├─ ScenarioSwitcher.tsx
│  ├─ DemoConsole.tsx
│  ├─ ClosingCta.tsx
│  └─ Footer.tsx
├─ data/
│  └─ showcase.ts
├─ hooks/
│  └─ useReveal.ts
└─ styles/
   ├─ tokens.css
   └─ global.css
```

生产构建输出在 `dist/`，可部署到任意静态文件托管服务。
