import { useEffect, useRef, useState } from 'react'
import { demos, getDemo } from '../data/showcase'
import { useReducedMotion } from '../hooks/useReveal'

export type DemoPhase = 'idle' | 'thinking' | 'responding' | 'complete'

function DemoConsole() {
  const [activeDemoId, setActiveDemoId] = useState('')
  const [phase, setPhase] = useState<DemoPhase>('idle')
  const [visibleStepCount, setVisibleStepCount] = useState(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const reducedMotion = useReducedMotion()
  const activeDemo = activeDemoId ? getDemo(activeDemoId) : null

  const clearTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current = []
  }

  useEffect(() => clearTimers, [])

  const selectDemo = (id: string) => {
    clearTimers()
    const nextDemo = getDemo(id)
    setActiveDemoId(nextDemo?.id ?? '')
    setVisibleStepCount(0)

    if (!nextDemo) {
      setPhase('idle')
      return
    }

    if (reducedMotion) {
      setVisibleStepCount(nextDemo.steps.length)
      setPhase('complete')
      return
    }

    setPhase('thinking')
    const responseTimer = setTimeout(() => setPhase('responding'), 800)
    timersRef.current.push(responseTimer)

    nextDemo.steps.forEach((_, index) => {
      const stepTimer = setTimeout(() => {
        setVisibleStepCount(index + 1)
        if (index === nextDemo.steps.length - 1) setPhase('complete')
      }, 1400 + index * 600)
      timersRef.current.push(stepTimer)
    })
  }

  return (
    <section className="section section--tight" id="demo" aria-labelledby="demo-title">
      <div className="container">
        <div className="demo__header">
          <div>
            <p className="eyebrow">演示 / 选择一个起点</p>
            <h2 className="section-heading" id="demo-title">看看想法如何<br />变成下一步。</h2>
          </div>
          <p className="demo__aside">点选左侧任意问题，观察一段本地模拟的思考与整理过程。</p>
        </div>

        <div className="demo-console">
          <div className="demo-console__prompts" aria-label="模拟问题">
            <p className="demo-console__rail-label">选择一个问题</p>
            {demos.map((demo) => (
              <button
                className="demo-prompt"
                key={demo.id}
                type="button"
                aria-pressed={demo.id === activeDemo?.id}
                onClick={() => selectDemo(demo.id)}
              >
                {demo.prompt}
              </button>
            ))}
          </div>

          <div className="demo-console__canvas">
            <div className="demo-console__canvas-header">
              <div>
                <span className="demo-console__canvas-label">local reasoning track</span>
                {activeDemo ? <p className="demo-console__prompt">{activeDemo.prompt}</p> : <p className="demo-console__prompt">从一个问题开始。</p>}
              </div>
              <span className={`status-chip demo-console__status demo-console__status--${phase}`} aria-live="polite">
                {phase === 'idle' && '等待选择'}
                {phase === 'thinking' && '正在理解你的问题'}
                {phase === 'responding' && '正在形成回应'}
                {phase === 'complete' && '整理完成'}
              </span>
            </div>

            <div className="demo-console__response" aria-live="polite">
              {!activeDemo ? (
                <p className="demo-empty">选择一个问题，让 Claude 从上下文开始整理。</p>
              ) : (
                <>
                  <p className="demo-console__summary">{activeDemo.summary}</p>
                  {phase !== 'thinking' && (
                    <div className="demo-steps">
                      {activeDemo.steps.slice(0, visibleStepCount).map((step, index) => (
                        <div className="demo-step" key={step.label}>
                          <span className="demo-step__number">0{index + 1}</span>
                          <strong className="demo-step__label">{step.label}</strong>
                          <span className="demo-step__detail">{step.detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {phase === 'complete' && (
                    <div className="demo-result">
                      <h3>{activeDemo.result.title}</h3>
                      <ul>{activeDemo.result.items.map((item) => <li key={item}>{item}</li>)}</ul>
                      <p className="demo-result__next">{activeDemo.result.next}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {activeDemo ? (
              <div className="demo-meta">
                {activeDemo.meta.map((item) => <span className="demo-meta__item" key={item.label}><span className="demo-meta__label">{item.label}</span><span className="demo-meta__value">{item.value}</span></span>)}
              </div>
            ) : <p className="demo-console__disclosure">这是本地交互演示，不会发送或保存你的内容。</p>}
          </div>
        </div>
        <p className="demo-console__disclosure" style={{ marginTop: 16 }}>这是本地交互演示，不会发送或保存你的内容。</p>
      </div>
    </section>
  )
}

export default DemoConsole
