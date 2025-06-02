import { readFileSync } from "fs";
import { join } from "path";
import CourseDetailClient from "./course-detail-client";

async function getCourseData() {
    try {
        const coursesPath = join(process.cwd(), 'public', 'data', 'courses.json');
        console.log({ coursesPath });

        const fileContents = readFileSync(coursesPath, 'utf8');
        console.log({ fileContents });

        const courses = JSON.parse(fileContents);
        console.log({ courses });

        const allCoursesData: any = {};
        courses.forEach((course: any) => {
            allCoursesData[course.id] = {
                id: course.id,
                title: course.title,
                description: course.description,
                price: course.price,
                thumbnail: course.videoIntroUrl,
                lessons: course.videos.map((video: any) => ({
                    id: video.id,
                    title: video.title,
                    description: video.description,
                    url: video.url,
                })),
            };
        });

        console.log({ allCoursesData });
        return allCoursesData;
    } catch (error) {
        console.error("Error reading course data:", error);
        return {}
    }
}

export async function generateStaticParams() {
    const allCoursesData = await getCourseData();

    return Object.keys(allCoursesData).map((courseId) => ({
        courseId,
    }));
}


export default async function CourseDetailPage() {
    const allCoursesData = await getCourseData();

    return <CourseDetailClient allCoursesData={allCoursesData} />



}