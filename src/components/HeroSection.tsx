function HeroSection() {
  return (
    <section className="section hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy reveal is-visible">
          <p className="eyebrow">Claude / 一起把事情想清楚</p>
          <h1 className="hero__headline" id="hero-title">
            把复杂的事，交给更好的 <em>思考。</em>
          </h1>
          <p className="hero__lede">
            从一个还没成形的想法开始。Claude 帮你理解上下文、拆解问题、创造内容，再把下一步变得清晰可见。
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#demo">
              探索 Claude <span className="button__arrow" aria-hidden="true">↗</span>
            </a>
            <a className="button button--quiet" href="#capabilities">
              看看它如何工作
            </a>
          </div>
          <p className="hero__note">这是本地交互演示，不会发送或保存你的内容。</p>
        </div>

        <div className="workbench reveal is-visible" aria-label="Claude 计划整理演示">
          <div className="workbench__topbar">
            <span className="workbench__traffic" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span>thinking / workspace</span>
            <span>local preview</span>
          </div>
          <div className="workbench__body">
            <div className="workbench__label">
              <span>一个模糊的想法</span>
              <span className="status-chip">准备好了</span>
            </div>
            <div className="workbench__conversation">
              <div className="message message--user">
                <span className="message__meta">你 / 09:41</span>
                我想做一个能帮团队整理会议记录的小工具，但不知道从哪里开始。
              </div>
              <div className="message">
                <span className="message__meta">Claude / 正在协助</span>
                我们先把“好结果”定义清楚，再从最短的工作流开始。下面是一个可以验证的第一版：
                <span className="cursor-pulse" aria-hidden="true" />
              </div>
              <div className="workbench__plan" aria-label="初步计划">
                <div className="plan-row"><span className="plan-row__number">01</span><span>明确输入与目标</span><span className="plan-row__state">ready</span></div>
                <div className="plan-row"><span className="plan-row__number">02</span><span>提取决定与行动项</span><span className="plan-row__state">next</span></div>
                <div className="plan-row"><span className="plan-row__number">03</span><span>用真实记录验证</span><span className="plan-row__state">later</span></div>
              </div>
            </div>
            <div className="workbench__footer">
              <span>3 steps / 1 clear next move</span>
              <span>human in the loop</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
