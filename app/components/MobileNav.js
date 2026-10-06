export default function MobileNav(){
  return <details className="mobileNav">
    <summary aria-label="Open navigation"><span aria-hidden="true">☰</span></summary>
    <div className="mobileNavPanel">
      <a href="/properties?market=Mumbai">Mumbai Properties</a>
      <a href="/properties?market=Dubai">Dubai Properties</a>
      <a href="/finance">Finance Solutions</a>
      <a href="/#advisory">Advisory</a>
      <a href="/#about">About</a>
    </div>
  </details>
}
