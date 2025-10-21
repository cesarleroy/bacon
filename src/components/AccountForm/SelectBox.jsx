export function SelectBox({ id = "", selected = "", options = [], onChange = () => { } }) { 
  return (
    <>
      <select id={id}
        onChange={(e) => onChange(e.target.value)}>
        <option disabled selected>{selected}</option>
        {options.map((o) => ( 
          <option key={o}>
            {o}
          </option>
        ))}
      </select>
    </>
  )
}