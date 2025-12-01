export function TotalesDisplay({ totalDebe, totalHaber }) {
  const debe = Number(totalDebe) || 0;
  const haber = Number(totalHaber) || 0;
  const coinciden = debe === haber;
  
  // Solo mostrar warning si ambos son mayores a 0 y no coinciden
  const mostrarWarning = debe > 0 && haber > 0 && !coinciden;

  return (
    <div id="totales-container">
      <div className="totales-header">TOTALES</div>
      <div className="totales-grid">
        <div className="total-item">
          <span className="total-label">Debe:</span>
          <span className="total-value">${debe.toFixed(2)}</span>
        </div>
        <div className="total-item">
          <span className="total-label">Haber:</span>
          <span className="total-value">${haber.toFixed(2)}</span>
        </div>
      </div>
      {mostrarWarning && (
        <div className="totales-warning">
          ⚠️ Los totales no coinciden
        </div>
      )}
    </div>
  );
}