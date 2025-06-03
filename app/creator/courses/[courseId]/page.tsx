import { notFound } from "next/navigation";
import EditCourseClient from "./edit-couse-client";

// Mock course data
const mockCourses = [
    {
        id: "1",
        title: "Introduction to Next.js",
        description: "Learn the fundamentals of Next.js and build amazing web applications.",
        price: 49.99,
        status: "published",
        lessons: [
            { id: "1", title: "Introduction to Next.js", description: "What is Next.js and why use it?", videoUrl: "https://www.youtube.com/embed/fmj9yG2I0L8" },
            { id: "2", title: "Pages and Routing", description: "Understanding the App Router.", videoUrl: "https://www.youtube.com/embed/g_3t0jV2gKo" }
        ]
    },
    {
        id: "2",
        title: "Advanced Tailwind CSS",
        description: "Master Tailwind CSS for beautiful and responsive UIs.",
        price: 79.99,
        status: "draft",
        lessons: [
            { id: "1", title: "Customization", description: "Deep dive into tailwind.config.js.", videoUrl: "https://www.youtube.com/embed/Lp6sA1HHoPY" }
        ]
    },
    {
        id: "3",
        title: "Full-Stack Development with Prisma",
        description: "Build full-stack applications with Prisma ORM.",
        price: 99.99,
        status: "published",
        lessons: []
    }
]

export function generateStaticParams() {
    console.log([
        ...mockCourses.map((course) => ({
            courseId: course.id,
        })),
        { courseId: 'new' }
    ]);

    // Return all possible course IDs including 'new' for creating courses
    return [
        ...mockCourses.map((course) => ({
            courseId: course.id,
        })),
        { courseId: 'new' }
    ]
}

export default function EditCoursePage({ params }: { params: { courseId: string } }) {
    const { courseId } = params;

    const isNew = courseId === 'new';
    const existingCourse = isNew ? null : (mockCourses.find(c => c.id === courseId) || null);

    if (!isNew && !existingCourse) {
        notFound()
    }

    return <EditCourseClient courseId={courseId} existingCourse={existingCourse} />
}