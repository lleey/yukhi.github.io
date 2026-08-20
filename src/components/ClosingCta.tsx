function ClosingCta() {
  return (
    <section className="section closing" aria-labelledby="closing-title">
      <div className="container">
        <div className="closing__panel">
          <p className="eyebrow closing__eyebrow">下一步 / 从你的问题开始</p>
          <h2 id="closing-title">好的思考，应该让人更有行动力。</h2>
          <p className="closing__copy">
            Claude 让复杂任务更容易被看见、被拆开、被继续。真正重要的判断，始终留在你手里。
          </p>
          <div className="closing__actions">
            <a className="button button--primary" href="#demo">
              开始探索 Claude <span className="button__arrow" aria-hidden="true">↗</span>
            </a>
            <a className="button button--quiet" href="#capabilities">回看能力地图</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClosingCta
