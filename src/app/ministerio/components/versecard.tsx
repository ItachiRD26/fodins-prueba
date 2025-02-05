export default function VerseCard({ text, reference }: { text: string; reference: string }) {
    return (
      <div className="p-4 bg-gray-100 rounded-md shadow-md text-center">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-sm text-gray-500 mt-2">{reference}</p>
      </div>
    )
  }
  