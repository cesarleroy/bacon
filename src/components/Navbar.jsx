import logo from "../assets/logo.png";
import '../styles/navbar.css'

export function Navbar() { 
  return (
    <nav>
      <a href="/" className="logo">
        <img src={logo} alt="bacon-logo" height="36px"/>
      </a>
    </nav>
  );
}