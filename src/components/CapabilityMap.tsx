import type { Capability, VisualType } from '../data/showcase'
import { capabilities } from '../data/showcase'
import { useReveal } from '../hooks/useReveal'

function CapabilityVisual({ type }: { type: VisualType }) {
  if (type === 'context') {
    return (
      <div className="doc-stack">
        {(['back', 'middle', 'front'] as const).map((layer) => (
          <div className={`doc-sheet doc-sheet--${layer}`} key={layer}>
            <i className="doc-sheet__line doc-sheet__line--short" />
            <i className="doc-sheet__line" />
            <i className="doc-sheet__line doc-sheet__line--highlight" />
            <i className="doc-sheet__line" />
          </div>
        ))}
      </div>
    )
  }

  if (type === 'reasoning') {
    return (
      <div className="reasoning-branch">
        <span className="reasoning-node reasoning-node--root">问</span>
        <span className="reasoning-node reasoning-node--one">A</span>
        <span className="reasoning-node reasoning-node--two">B</span>
      </div>
    )
  }

  if (type === 'creation') {
    return (
      <div className="artifact-window">
        <div className="artifact-window__bar"><i /><i /><i /></div>
        <div className="artifact-window__body">
          <div className="artifact-window__code"><b>const</b> idea =<br />  clarify(input)<br /><b>return</b> build(idea)</div>
          <div className="artifact-window__preview" />
        </div>
      </div>
    )
  }

  return (
    <div className="workflow-rail">
      <span className="workflow-rail__node">Claude<br />Code</span>
      <span className="workflow-rail__line" />
      <span className="workflow-rail__node">API<br />tools</span>
      <span className="workflow-rail__line" />
      <span className="workflow-rail__node">你的<br />工作流</span>
    </div>
  )
}

function CapabilityCard({ capability }: { capability: Capability }) {
  const revealRef = useReveal<HTMLElement>()

  return (
    <article className="capability-card reveal" ref={revealRef}>
      <div className="capability-card__visual" aria-hidden="true">
        <CapabilityVisual type={capability.visualType} />
      </div>
      <div className="capability-card__body">
        <p className="capability-card__eyebrow">{capability.eyebrow}</p>
        <h3>{capability.title}</h3>
        <p>{capability.description}</p>
        <ul className="capability-card__details">
          {capability.details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
      </div>
    </article>
  )
}

function CapabilityMap() {
  return (
    <section className="section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="container">
        <div className="capabilities__heading-row reveal is-visible">
          <div>
            <p className="eyebrow">能力 / 不是答案清单</p>
            <h2 className="section-heading" id="capabilities-title">从理解开始，<br />一直走到行动。</h2>
          </div>
          <p className="capabilities__aside">每一次协助都从上下文开始，经过判断，留下一个人可以继续使用的结果。</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => <CapabilityCard capability={capability} key={capability.id} />)}
        </div>
      </div>
    </section>
  )
}

export default CapabilityMap
