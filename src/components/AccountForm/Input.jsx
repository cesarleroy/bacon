export function Input({ type = "text", placeholder = "placeholder"}) { 
  return (
    <>
      <input type={type} placeholder={placeholder}/>
    </>
  )
}