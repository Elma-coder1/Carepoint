// Ballina.jsx
import "../styles/style.css";
import "../styles/ballina.css";

export default function Ballina() {
  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-left">
            <span>
              <i className="fa-solid fa-phone"></i> +383 (0) 49 513 513
            </span>
            <span>
              <i className="fa-solid fa-envelope"></i> info@carepoint.com
            </span>
          </div>

          <div className="top-right">
            <a href="#" aria-label="Facebook" rel="noreferrer">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" rel="noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="main-header">
        <div className="container header-content">
          <div className="logo">CarePoint</div>

          <nav className="main-nav">
            <a className="active" href="/">
              Ballina
            </a>
            <a href="/rreth">Rreth CarePoint</a>
            <a href="/sherbimet">Shërbimet</a>
            <a href="/stafi">Stafi</a>
            <a href="/kontakt">Kontakt</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>CarePoint – Kujdes i sigurt mjekësor 24/7</h1>
            <p>Spital modern me staf profesional dhe teknologji të avancuar.</p>

            <div className="hero-buttons">
              <a className="btn btn-primary" href="/sherbimet">
                Shiko shërbimet
              </a>
              <a className="btn btn-secondary" href="/kontakt">
                Rezervo termin
              </a>
            </div>
          </div>

          <div className="hero-cards">
            <div className="hero-card">
              <i className="fa-solid fa-truck-medical"></i>
              <h3>Urgjenca</h3>
              <p>Shërbime emergjente 24/7 për raste urgjente.</p>
            </div>

            <div className="hero-card">
              <i className="fa-solid fa-stethoscope"></i>
              <h3>Konsulta</h3>
              <p>Kontrolle mjekësore të specializuara nga mjekët tanë.</p>
            </div>

            <div className="hero-card">
              <i className="fa-solid fa-flask"></i>
              <h3>Analiza laboratorike</h3>
              <p>Teste laboratorike me rezultate të shpejta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-content">
          <p>&copy; 2025 CarePoint. Të gjitha të drejtat e rezervuara.</p>
        </div>
      </footer>
    </>
  );
}
