export function SelectBox({ id="", selected="", options=[] }) { 
  return (
    <>
      <select id={id}>
        <option disabled selected>{selected}</option>
        {options.map((o) => ( 
          <option key={o}>
            {console.log(o)}
            {o}
          </option>
        ))}
      </select>
    </>
  )
}