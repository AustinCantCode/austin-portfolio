export interface Video {
  video: string | string[];
}

export default function VideoDisplay(video: Video) {
  console.log(video.video);
  return (
    <video controls className="w-full hidden md:block">
      <source src={video.video[0]} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
