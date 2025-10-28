import logo from "../assets/logo.png";

export function Navbar() { 
  return (
    <nav>
      <a href="https://github.com/cesarleroy/bacon" className="logo">
        <img src={logo} alt="bacon-logo" height="36px"/>
      </a>
    </nav>
  );
}