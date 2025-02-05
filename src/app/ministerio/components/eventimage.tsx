import Image from "next/image";

export default function EventImage({ src }: { src: string }) {
  if (!src) {
    return <div>Error: Image source is invalid.</div>; // Fallback for invalid src
  }

  return (
    <div className="relative w-full h-64">
      <Image src={src} alt="Evento" layout="fill" objectFit="cover" className="rounded-lg shadow-md" />
    </div>
  );
}
