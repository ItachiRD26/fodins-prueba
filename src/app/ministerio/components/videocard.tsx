import React from "react";

type VideoCardProps = {
  url: string;
};

const VideoCard: React.FC<VideoCardProps> = ({ url }) => {
  // Extraer el ID del video de YouTube
  const videoId = url.split("v=")[1];

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoCard;