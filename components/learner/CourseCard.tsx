import Link from "next/link";
import { Button } from "../ui/button";
import ReactPlayer from "react-player";
import Image from "next/image";

type Course = {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
};

function getYouTubeThumbnail(videoUrl: string): string | null {
    const match = videoUrl.match(
        /(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (!match) return null;
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
}

export default function CourseCard({
    course,
    isPlaying,
}: {
    course: Course;
    isPlaying: boolean;
}) {
    const thumbnailUrl = getYouTubeThumbnail(course.thumbnail);

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
            <div className="relative h-48 w-full">
                <div className="relative w-full h-48">
                    {isPlaying ? (
                        <div className="flex items-center justify-center w-full h-48">
                            <ReactPlayer
                                url={course.thumbnail}
                                playing
                                muted   // ✅ Required for autoplay without user interaction
                                controls
                                width="100%"
                                height="12rem"
                            />
                        </div>
                    ) : (
                        <div className="bg-black text-white flex items-center justify-center w-full h-48">
                            <Image
                                src={thumbnailUrl || ""}
                                alt={`Thumbnail for ${course.title}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="mt-2  text-gray-600">{course.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold">${course.price}</span>
                    <Link href={`/learner/courses/${course.id}`}>
                        <Button>View Course</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
