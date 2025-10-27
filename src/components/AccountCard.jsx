import vite from '../../public/vite.svg'
//import '../styles/card.css'

export function AccountCard({
  avatar = vite,
  name = "Bacon Belfort",
  role = "Shark Mentality at BACON",
  children }) {
  
  return (
    <div id="seccion-info">
      <div id="personaje">
        <img src={avatar} alt={name.toLowerCase} height="24px" />
        <div id="datos">
          <h3>{name}</h3>
          <h6>{role}</h6>
        </div>
      </div>
      <div id="informacion">
        {children}
      </div>
    </div>
  );
}