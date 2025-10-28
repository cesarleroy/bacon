import { useEffect, useState } from "react";

export function PdfPreviewIframe({ file }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) { setUrl(null); return; }

    if (typeof file === "string") {
      setUrl(file);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!url) return <div>No hay PDF para previsualizar</div>;

  return (
    <iframe
      title="pdf-preview"
      src={url + (typeof file === "string" ? "#toolbar=0&navpanes=0" : "")}
      id="document"
    />
  );
}
