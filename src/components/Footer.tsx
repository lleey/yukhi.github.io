function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__rule" />
        <div className="site-footer__inner">
          <p className="site-footer__copy">
            本页为 Claude 生态的概念介绍与本地交互演示。不会发送或保存你的内容。
          </p>
          <nav className="site-footer__links" aria-label="页脚导航">
            <a href="#capabilities">能力</a>
            <a href="#scenarios">场景</a>
            <a href="#demo">演示</a>
            <a href="#top">回到顶部 ↑</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
