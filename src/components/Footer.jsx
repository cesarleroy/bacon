import React from 'react';
import fb from '../../public/facebook.svg'
import ig from '../../public/instagram.svg'
import email from '../../public/email.svg'
import gh from '../../public/github.svg'


export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Iconos de redes sociales */}
        <div className="footer-icons">
          <a 
            href="https://www.facebook.com/lex.libreoffice" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="GitHub"
          >
            <img 
              src={fb}
              alt="Facebook"
              className="footer-icon"
            />
          </a>
          <a 
            href="https://bacon-beta.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="Website"
          >
            <img 
              src={ig}
              alt="Instagram"
              className="footer-icon"
            />
          </a>
          <a 
            href="https://github.com/cesarleroy/bacon" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="React"
          >
            <img 
              src={gh}
              alt="github"
              className="footer-icon"
            />
          </a>
          <a 
            href="mailto:contacto@bacon.com" 
            className="footer-icon-link"
            aria-label="Email"
          >
            <img 
              src={email}
              alt="Email"
              className="footer-icon"
            />
          </a>
        </div>

        {/* Dirección */}
        <p className="footer-address">
          UPIICSA - IPN, Av. Té 950, Granjas México, Iztacalco, 08400, CDMX, México
        </p>

        {/* Copyright */}
        <p className="footer-copyright">
          © {currentYear} Bacon. Todos los derechos reservados.
        </p>

        {/* Hecho con amor */}
        <p className="footer-love">
          Hecho con ♥
        </p>
      </div>

      <style jsx>{`
        .footer {
          background-color: #f5f7fa;
          border-top: 1px solid #e2e8f0;
          margin-top: auto;
          width: 100%;
          padding: 32px 20px 24px;
        }

        .footer-content {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
        }

        .footer-icons {
          display: flex;
          gap: 20px;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .footer-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, opacity 0.2s ease;
          opacity: 0.8;
        }

        .footer-icon-link:hover {
          transform: translateY(-2px);
          opacity: 1;
        }

        .footer-icon {
          width: 24px;
          height: 24px;
          display: block;
        }

        .footer-address {
          font-size: 0.8rem;
          color: #4a5568;
          margin: 0;
          line-height: 1.5;
          max-width: 600px;
        }

        .footer-copyright {
          font-size: 0.8rem;
          color: #4a5568;
          margin: 0;
        }

        .footer-love {
          font-size: 0.8rem;
          color: #4a5568;
          margin: 0;
          font-style: italic;
        }

        /* Tablets (768px and below) */
        @media (max-width: 768px) {
          .footer {
            padding: 28px 20px 20px;
          }

          .footer-content {
            gap: 14px;
          }

          .footer-icons {
            gap: 18px;
          }

          .footer-icon {
            width: 22px;
            height: 22px;
          }

          .footer-address {
            font-size: 0.8rem;
          }

          .footer-copyright,
          .footer-love {
            font-size: 0.8rem;
          }
        }

        /* Mobile (640px and below) */
        @media (max-width: 640px) {
          .footer {
            padding: 24px 16px 18px;
          }

          .footer-content {
            gap: 6px;
          }

          .footer-icons {
            gap: 16px;
            margin-bottom: 12px;
          }

          .footer-icon {
            width: 20px;
            height: 20px;
          }

          .footer-address {
            font-size: 0.75rem;
            padding: 0 10px;
          }

          .footer-copyright,
          .footer-love {
            font-size: 0.75rem;
          }
        }

        /* Extra Small Mobile (480px and below) */
        @media (max-width: 480px) {
          .footer {
            padding: 20px 16px 16px;
          }

          .footer-icons {
            gap: 14px;
            margin-bottom: 12px;
          }

          .footer-icon {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;