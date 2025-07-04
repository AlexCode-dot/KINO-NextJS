// import '../../public/dist/styles.css'
import '@/styles/main.scss'
import NavMenu from '../components/NavMenu.jsx'

export const metadata = {
  title: 'Kvikkjokk Kino',
  description: 'Den lilla biografen i hisnande vackra Kvikkjokk!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="pageContainer">
          <header className="header">
            <div className="logo__background">
              <img src="/img/logoBKGRND.png" />
            </div>
            <div className="header__logo">
              <h1 className="header__logo-title">Kvikkjokk Kino</h1>
            </div>
            <NavMenu />
          </header>

          <main className="contentContainer">{children}</main>

          <footer className="footer">
            <div className="footer__social">
              <h3 className="footer__social-title">Sociala Medier</h3>
              <a className="footer__social-twitter" href="https://x.com/">
                <img src="/img/icons-twitter-white-512.png" alt="New Twitter Icon" />
              </a>
              <a className="footer__social-instagram" href="https://www.instagram.com/">
                <img src="/img/icons-instagram-white-512.png" alt="Instagram Icon" />
              </a>
              <a className="footer__social-youtube" href="https://www.youtube.com/">
                <img src="/img/icons-youtube-white-512.png" alt="Youtube Icon" />
              </a>
              <a className="footer__social-linkedin" href="https://www.linkedin.com/">
                <img src="/img/icons-linkedin-white-512.png" alt="LinkedIn Icon" />
              </a>
            </div>
            <div className="footer__contact">
              <h3 className="footer__contact-title">Kontakt</h3>
              <h6 className="footer__contact-info">Kvikkjokk Bio AB</h6>
              <h6 className="footer__contact-number">+46 (0)971-123 456</h6>
              <h6 className="footer__contact-mail1">info@kvikkjokkbio.se</h6>
              <h6 className="footer__contact-mail2">bokning@kvikkjokkbio.se</h6>
            </div>
            <div className="footer__find-Us">
              <h3 className="footer__find-Us-title">Hitta till oss</h3>
              <h6 className="footer__find-Us-streetname">Fjällvägen 12</h6>
              <h6 className="footer__find-Us-postalcode">96202 Kvikkjokk</h6>
              <h6 className="footer__find-Us-country">Sverige</h6>
            </div>
            <div className="footer__partners">
              <h3 className="footer__partners-title">Våra samarbetspartners</h3>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
