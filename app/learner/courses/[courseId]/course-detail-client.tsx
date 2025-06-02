"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Lesson {
    id: string;
    title: string;
}

interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    lessons: Lesson[]
}

interface CourseDetailClientProps {
    allCoursesData: Record<string, Course>
}

export default function CourseDetailClient({ allCoursesData }: CourseDetailClientProps) {
    const params = useParams()
    const courseId = params.courseId as string;
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)
    console.log({ courseId, course });

    useEffect(() => {
        if (courseId && allCoursesData[courseId]) {
            setCourse(allCoursesData[courseId]);
        }
        setLoading(false);
    }, [courseId, allCoursesData])

    if (loading) {
        return <div className="text-center py-10">Loading course details...</div>
    }
    if (!course) {
        return <div className="text-center py-10 text-red-50">Course not found</div>
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="relative h-64 w-full">
                    <iframe
                        width="100%"
                        height="100%"
                        src={course.thumbnail}
                        title={course.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-t-lg"
                    />
                </div>
            </div>
            <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-gray-700 mb-6 text-lg">{course.description}</p>
                <p className="text-2xl font-semibold text-indigo-600 mb-6">${course.price.toFixed(2)}</p>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Lessons in this course:</h2>
                    {course.lessons && course.lessons.length > 0 ? (
                        <ul className="list-disc list-inside space-y-2">
                            {course.lessons.map((lesson) => (
                                <li key={lesson.id} className="text-gray-600">
                                    <Link href={`/learner/lessons/${courseId}/${lesson.id}`} className="hover:text-indigo-600 hover:underline">
                                        {lesson.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No lessons listed for this course yet.</p>
                    )}
                </div>

                <Link href={`/learner/courses/${course.id}/checkout`}>
                    <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Enroll Now & Proceed to Checkout
                    </Button>
                </Link>
            </div>
        </div>
    )
}