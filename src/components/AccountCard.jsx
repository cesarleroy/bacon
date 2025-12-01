import baconBelfort from '../../public/bacon-belfort.svg'

export function AccountCard({ children }) {
  return (
    <div id="seccion-info">
      <div id="personaje">
        <div id="avatar-container">
          <img src={baconBelfort} alt="bacon belfort" />
        </div>
        <div id="datos">
          <h3>Bacon Belfort</h3>
          <h6>Shark Mentality at BACON</h6>
        </div>
      </div>
      <div id="informacion">
        {children}
      </div>
    </div>
  );
}