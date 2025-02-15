import { Video } from "../types";

interface VideoSectionProps {
  videos: Video[];
}

export function VideoSection({ videos }: VideoSectionProps) {
  return (
    <section id="videos" className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-blue-100 w-full">
      <div className="px-4 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 md:mb-12 text-center">Nuestros Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-blue-200 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <iframe
                src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-48"
              ></iframe>
              <p className="text-gray-800 text-lg md:text-xl mt-4">{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}