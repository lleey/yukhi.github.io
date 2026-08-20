export type VisualType = 'context' | 'reasoning' | 'creation' | 'collaboration'
export type Accent = 'violet' | 'coral' | 'teal'

export interface Capability {
  id: string
  eyebrow: string
  title: string
  description: string
  details: readonly string[]
  visualType: VisualType
}

export interface Scenario {
  id: string
  label: string
  title: string
  description: string
  input: string
  process: readonly string[]
  outcome: string
  accent: Accent
}

export interface Demo {
  id: string
  prompt: string
  summary: string
  steps: readonly { label: string; detail: string }[]
  result: { title: string; items: readonly string[]; next: string }
  meta: readonly { label: string; value: string }[]
}

export const capabilities: readonly Capability[] = [
  {
    id: 'context',
    eyebrow: '01 / 理解',
    title: '先把上下文放在桌面上',
    description: 'Claude 可以从长文本、图片与多轮对话中提取关键信息，帮你看见问题的全貌。',
    details: ['长文档摘要', '图片与文字一起理解', '保留重要关系'],
    visualType: 'context',
  },
  {
    id: 'reasoning',
    eyebrow: '02 / 思考',
    title: '把模糊问题拆成路径',
    description: '面对没有标准答案的任务，Claude 可以协助拆解目标、比较选择，并把判断说清楚。',
    details: ['拆分复杂目标', '比较不同方案', '标记需要确认的假设'],
    visualType: 'reasoning',
  },
  {
    id: 'creation',
    eyebrow: '03 / 创造',
    title: '从第一句话走到成品',
    description: '从一页草稿到一段代码，Claude 让创作过程更容易开始，也更容易继续迭代。',
    details: ['写作与改写', '代码与分析', 'Artifacts 形式的可见结果'],
    visualType: 'creation',
  },
  {
    id: 'collaboration',
    eyebrow: '04 / 协作',
    title: '把答案带回正在使用的工具',
    description: '通过 Claude Code、Claude API 和工具工作流，把思考接入个人项目与团队流程。',
    details: ['Claude Code 工作流', 'API 与工具调用', '团队知识协作'],
    visualType: 'collaboration',
  },
]

export const scenarios: readonly Scenario[] = [
  {
    id: 'work',
    label: '日常工作',
    title: '让一堆信息变成下一步',
    description: '把会议记录、零散反馈或一份待读材料，整理成团队可以继续使用的工作底稿。',
    input: '“这份会议记录很乱，帮我找出决定、风险和下一步。”',
    process: ['识别主题与参与者', '区分已决定和待确认事项', '按优先级整理行动项'],
    outcome: '得到一份可以直接发给团队的行动清单，而不是一段更长的摘要。',
    accent: 'violet',
  },
  {
    id: 'learn',
    label: '创造与学习',
    title: '让学习从一个好问题开始',
    description: '把陌生主题变成循序渐进的解释、练习和反馈，让你可以按自己的节奏继续追问。',
    input: '“用一个我能理解的例子，解释这个概念，再给我一个练习。”',
    process: ['确认你已经知道什么', '用熟悉的类比建立连接', '给出可检验的小练习'],
    outcome: '你得到的不只是结论，还有一条可以自己走完的理解路径。',
    accent: 'coral',
  },
  {
    id: 'build',
    label: '开发与构建',
    title: '从想法进入可运行的工作流',
    description: '从需求澄清、代码阅读到实现计划，Claude Code 和 Claude API 可以协助你把问题推进到工程现场。',
    input: '“我想做一个小工具，先帮我拆出最小可行版本。”',
    process: ['明确目标与约束', '拆出可验证的最小切片', '为代码、工具和检查点排顺序'],
    outcome: '形成一份从第一个文件开始就能执行的构建路线，而不是停在灵感阶段。',
    accent: 'teal',
  },
]

export const demos: readonly Demo[] = [
  {
    id: 'plan',
    prompt: '帮我把这个想法变成计划',
    summary: '从模糊愿望开始，先确定结果，再拆成可执行的几个切片。',
    steps: [
      { label: '定义结果', detail: '把“想做一个工具”改写成一个可以被验证的目标。' },
      { label: '拆出切片', detail: '先保留最小流程：输入、处理、结果，不提前加入复杂功能。' },
      { label: '安排检查点', detail: '为每一步留下一个明确的完成信号，方便继续推进。' },
    ],
    result: {
      title: '一个可以今天开始的计划',
      items: ['写下目标用户和唯一任务', '画出输入到结果的最短路径', '用一个真实例子验证第一版'],
      next: '下一步：选择一个真实输入，开始验证最短路径。',
    },
    meta: [
      { label: '方式', value: '结构化拆解' },
      { label: '结果', value: '3 个行动项' },
    ],
  },
  {
    id: 'synthesis',
    prompt: '阅读资料并提炼重点',
    summary: '不只压缩文字，也把重点、证据与仍需确认的部分分开。',
    steps: [
      { label: '定位重点', detail: '先找出资料反复回答的核心问题和关键结论。' },
      { label: '保留证据', detail: '把支撑结论的事实与数字留在对应观点旁边。' },
      { label: '标注空白', detail: '把资料没有回答的问题单独列出，避免把推测当成事实。' },
    ],
    result: {
      title: '一页式阅读地图',
      items: ['核心结论与证据', '影响决策的关键变化', '需要补充的三个问题'],
      next: '下一步：从未解决的问题里选择一个继续追问。',
    },
    meta: [
      { label: '方式', value: '重点提炼' },
      { label: '结果', value: '事实与空白' },
    ],
  },
  {
    id: 'build',
    prompt: '从零开始搭一个小工具',
    summary: '先让工具完成一件小事，再为扩展留下清晰边界。',
    steps: [
      { label: '缩小问题', detail: '把“大而全”的想法收敛成一个用户可以完成的动作。' },
      { label: '选择材料', detail: '只列出实现第一版所需的页面、状态和验证方式。' },
      { label: '确定顺序', detail: '先做能看到结果的路径，再补充边界和细节。' },
    ],
    result: {
      title: '第一版构建路线',
      items: ['一个清晰的输入界面', '一个可观察的处理过程', '一个可复现的结果检查'],
      next: '下一步：用最小样本走通一次完整流程。',
    },
    meta: [
      { label: '方式', value: '工程拆片' },
      { label: '结果', value: '最小版本' },
    ],
  },
  {
    id: 'team',
    prompt: '为团队整理行动项',
    summary: '把讨论中的承诺、负责人和时间点放进同一个可跟进的视图。',
    steps: [
      { label: '收集承诺', detail: '从讨论中识别已经明确的行动和交付物。' },
      { label: '补齐归属', detail: '将负责人、依赖和需要确认的时间点分开标注。' },
      { label: '形成节奏', detail: '按本周、下周和待决定分类，降低跟进成本。' },
    ],
    result: {
      title: '团队行动看板',
      items: ['本周必须推进的事项', '等待外部输入的事项', '下一次同步前需要确认的决定'],
      next: '下一步：把第一项行动分配给一个明确的负责人。',
    },
    meta: [
      { label: '方式', value: '协作整理' },
      { label: '结果', value: '3 个跟进层' },
    ],
  },
]

export function getScenario(id: string): Scenario | null {
  return scenarios.find((item) => item.id === id) ?? scenarios[0] ?? null
}

export function getDemo(id: string): Demo | null {
  return demos.find((item) => item.id === id) ?? demos[0] ?? null
}
