/* shared components for inner pages */
function renderNav(active) {
  const links = ['index.html','iniciativas','spark','rooted','thrive','lead','impacto','nosotros','blog','contacto','donar'];
  return `
  <nav class="nav">
    <a href="../index.html" class="nav-logo">Lifex<em>Life</em></a>
    <div class="nav-links">
      <a href="../index.html" ${active==='inicio'?'style="color:var(--spark)"':''}>Inicio</a>
      <a href="iniciativas.html" ${active==='iniciativas'?'style="color:var(--spark)"':''}>Iniciativas</a>
      <a href="impacto.html" ${active==='impacto'?'style="color:var(--spark)"':''}>Impacto</a>
      <a href="nosotros.html" ${active==='nosotros'?'style="color:var(--spark)"':''}>Nosotros</a>
      <a href="blog.html" ${active==='blog'?'style="color:var(--spark)"':''}>Blog</a>
      <a href="contacto.html" ${active==='contacto'?'style="color:var(--spark)"':''}>Contacto</a>
      <button class="nav-theme">☾ DARK</button>
      <a href="donar.html"><button class="nav-cta">Donar →</button></a>
    </div>
    <button class="nav-mobile-btn">☰</button>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">Lifex<em>Life</em></div>
        <div class="footer-found">FOUNDATION</div>
        <p class="footer-desc">Transformando comunidades a través del arte, la naturaleza, la salud mental y el liderazgo con propósito.</p>
      </div>
      <div class="footer-col">
        <h5>INICIATIVAS</h5>
        <a href="spark.html">SPARK</a>
        <a href="rooted.html">ROOTED</a>
        <a href="thrive.html">THRIVE</a>
        <a href="lead.html">LEAD</a>
      </div>
      <div class="footer-col">
        <h5>ORGANIZACIÓN</h5>
        <a href="nosotros.html">Nosotros</a>
        <a href="impacto.html">Impacto</a>
        <a href="nosotros.html#transparencia">Transparencia</a>
        <a href="nosotros.html#prensa">Prensa</a>
      </div>
      <div class="footer-col">
        <h5>CONTACTO</h5>
        <a href="mailto:Info@lifexlife.org">Info@lifexlife.org</a>
        <a href="#">Los Ángeles, CA</a>
        <a href="donar.html">Donar</a>
        <a href="contacto.html#voluntariado">Voluntariado</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 LIFEXLIFE FOUNDATION · <span class="footer-ein">EIN: 41-4788665</span> · 501(c)(3)</p>
      <p>JUNTOS SOMOS MEJORES · TOGETHER WE ARE BETTER</p>
    </div>
  </footer>`;
}
