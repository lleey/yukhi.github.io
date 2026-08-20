import type { KeyboardEvent } from 'react'
import { getScenario, scenarios } from '../data/showcase'

export interface ScenarioSwitcherProps {
  activeScenarioId: string
  onScenarioChange: (id: string) => void
}

function ScenarioSwitcher({ activeScenarioId, onScenarioChange }: ScenarioSwitcherProps) {
  const scenario = getScenario(activeScenarioId)

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let targetIndex = index

    if (event.key === 'ArrowRight') targetIndex = (index + 1) % scenarios.length
    else if (event.key === 'ArrowLeft') targetIndex = (index - 1 + scenarios.length) % scenarios.length
    else if (event.key === 'Home') targetIndex = 0
    else if (event.key === 'End') targetIndex = scenarios.length - 1
    else return

    const target = scenarios[targetIndex]
    if (!target) return

    event.preventDefault()
    onScenarioChange(target.id)
    document.getElementById(`tab-${target.id}`)?.focus()
  }

  return (
    <section className="section scenarios" id="scenarios" aria-labelledby="scenarios-title">
      <div className="container">
        <div className="scenario__header">
          <p className="eyebrow">场景 / 同一种思考，不同的现场</p>
          <h2 className="section-heading" id="scenarios-title">你要解决的事，<br />才是故事的中心。</h2>
          <p className="section-lede">从日常工作到开发构建，Claude 的价值不在于替你完成一切，而在于让你更快抵达真正重要的判断。</p>
        </div>

        <div className="scenario-tabs" role="tablist" aria-label="Claude 使用场景">
          {scenarios.map((item) => (
            <button
              className="scenario-tab"
              key={item.id}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={item.id === scenario?.id}
              aria-controls="scenario-panel"
              tabIndex={item.id === scenario?.id ? 0 : -1}
              onClick={() => onScenarioChange(item.id)}
              onKeyDown={(event) => handleTabKeyDown(event, scenarios.findIndex((candidate) => candidate.id === item.id))}
            >
              {item.label}
            </button>
          ))}
        </div>

        {scenario ? (
          <div
            className="scenario-panel"
            id="scenario-panel"
            role="tabpanel"
            aria-labelledby={`tab-${scenario.id}`}
          >
            <h3 className="scenario-panel__title">{scenario.title}</h3>
            <p className="scenario-panel__description">{scenario.description}</p>
            <div className="scenario-flow">
              <article className="scenario-flow__card">
                <span className="scenario-flow__label">输入 / 你带来的问题</span>
                <p>{scenario.input}</p>
              </article>
              <article className="scenario-flow__card">
                <span className="scenario-flow__label">处理 / 一起拆开</span>
                <ol className="scenario-flow__process">
                  {scenario.process.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </article>
              <article className="scenario-flow__card">
                <span className="scenario-flow__label">结果 / 留下什么</span>
                <p>{scenario.outcome}</p>
              </article>
            </div>
          </div>
        ) : (
          <div className="scenario-panel" id="scenario-panel" role="tabpanel">
            <p className="scenario-panel__description">暂时没有可展示的场景。</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ScenarioSwitcher
