import baconBelfort from '../../public/bacon-belfort.svg'
//import '../styles/card.css'

export function AccountCard({
  avatar = baconBelfort,
  name = "Bacon Belfort",
  role = "Shark Mentality at BACON",
  children }) {
  
  return (
    <div id="seccion-info">
      <div id="personaje">
        <img src={avatar} alt={name.toLowerCase} />
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