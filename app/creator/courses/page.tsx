'use client'
import { useAuth } from "@/app/context/AuthContext"
import { CourseTable } from "@/components/creator/CourseTable"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

// Mock data - replace with actual data fetching later
const initialMockCourses = [
    {
        id: "1",
        title: "Introduction to Next.js",
        status: "published" as "published" | "draft",
        students: 120,
        revenue: 2400,
        createdAt: "2023-01-15",
    },
    {
        id: "2",
        title: "Advanced Tailwind CSS",
        status: "draft" as "published" | "draft",
        students: 75,
        revenue: 1500,
        createdAt: "2023-02-20",
    },
    {
        id: "3",
        title: "Full-Stack Development with Prisma",
        status: "published" as "published" | "draft",
        students: 200,
        revenue: 4000,
        createdAt: "2023-03-10",
    },
];

export default function CoursesPage() {
    const { user, loading } = useAuth()
    const [courses, setCourses] = useState(initialMockCourses)

    useEffect(() => {
        if (!loading && user?.role !== 'creator') {
            redirect('/login')
        }
    }, [user, loading])

    const handleDeleteCourse = (courseId: string) => {
        setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId))
    }

    if (loading || !user) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Course Management</h1>
                <Link href="/creator/courses/new">
                    <Button>Create New Course</Button>
                </Link>
            </div>
            <CourseTable courses={courses} onDelete={handleDeleteCourse} />
        </div>
    );
}
