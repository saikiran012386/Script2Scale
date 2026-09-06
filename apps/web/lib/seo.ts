import { Metadata } from "next";

export function constructMetadata({
  title = "Script2Scale | High-Impact Video Production Studio",
  description = "Turn your scripts into cinematic, high-converting video assets that scale your brand.",
  image = "/og-image.jpg"
}: {
  title?: string;
  description?: string;
  image?: string;
} = {}): Metadata {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000"),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}
