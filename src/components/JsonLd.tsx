/**
 * Renders one JSON-LD block.
 *
 * `<` is escaped rather than left raw: a `</script` sequence appearing inside
 * any string would otherwise close the tag early and spill the rest of the
 * graph into the document as markup. None of the current copy contains one,
 * which is exactly why it would go unnoticed if it ever did.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
