import logo from "../assets/logo.png";

export function Navbar() { 
  return (
    <nav>
      <a href="https://github.com/cesarleroy/bacon" className="logo">
        <img src={logo} alt="bacon-logo" height="36px"/>
      </a>
      <h1 className="navbar-title">Balance Contable Online</h1>
    </nav>
  );
}