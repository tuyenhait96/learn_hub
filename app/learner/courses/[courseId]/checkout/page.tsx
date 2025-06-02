import { readFileSync } from "fs";
import { join } from "path";
import { CheckoutFormClient } from "./checkout-form-client";

async function getCourseData() {
    try {
        const coursesPath = join(process.cwd(), 'public', 'data', 'courses.json');
        const fileContents = readFileSync(coursesPath, 'utf8');
        const courses = JSON.parse(fileContents);

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
        return allCoursesData;
    } catch (error) {
        console.error("Error reading course data:", error);
        return {};
    }
}

export async function generateStaticParams() {
    const allCoursesData = await getCourseData();
    console.log({ allCoursesData });

    return Object.keys(allCoursesData).map((courseId) => ({
        courseId,
    }));
}


export default function CheckoutPage() {
    return <CheckoutFormClient />
}