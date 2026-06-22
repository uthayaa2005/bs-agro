import { buildStructuredData } from "../utils/seo";

export default function StructuredData({ page, product }) {
  const data = buildStructuredData({ page, product });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
