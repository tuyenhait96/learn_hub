'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, CheckCircle, FileText, Play } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Video {
    id: string
    title: string
    url: string
    description: string
}

interface Document {
    type: string
    content?: string
    url?: string
}

interface Course {
    id: string
    title: string
    description: string
    videoIntroUrl: string
    document: Document
    videos: Video[]
}

export default function PurchasedCoursesPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    useEffect(() => {
        const fromPayment = searchParams.get('from') === 'payment'
        if (fromPayment) {
            setShowSuccessMessage(true)
            router.replace('/learner/courses/purchased', { scroll: false })
            setTimeout(() => setShowSuccessMessage(false), 5000)
        }
    }, [searchParams, router])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/data/courses.json')
                const data = await response.json()
                setCourses(data)
            } catch (error) {
                console.error('Error fetching courses:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    if (loading) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading your purchased courses...</div>
                </div>
            </div>
        )
    }

    const handleLessonClick = (courseId: string, videoId: string) => {
        console.log({ courseId, videoId });

        // router.push(`/learner/lessons/${courseId}/${videoId}`)
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {showSuccessMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                        <h3 className="font-medium text-green-800">Payment Successful!</h3>
                        <p className="text-sm text-green-700">Welcome to your courses. You now have access to all lessons and materials.</p>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4 mb-8">
                <Link href="/learner/courses">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to All Courses
                    </Button>
                </Link>
                <h1 className="text-3xl font-semibold">My Purchased Courses</h1>
            </div>

            <div className="grid gap-8">
                {courses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                            <CardTitle className="text-2xl">{course.title}</CardTitle>
                            <p className="text-gray-600 mt-2">{course.description}</p>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid gap-4">
                                <h3 className="text-lg font-semibold mb-4">Course Lessons ({course.videos.length} lessons)</h3>

                                {course.videos.map((video, index) => (
                                    <div
                                        key={video.id}
                                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => handleLessonClick(course.id, video.id)}
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Play className="h-6 w-6 text-blue-600" />
                                        </div>

                                        <div className="flex-grow">
                                            <h4 className="font-medium text-gray-900 mb-1">
                                                Lesson {index + 1}: {video.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Play className="h-3 w-3" />
                                                    Video Lesson
                                                </span>
                                                {course.document && (
                                                    <span className="flex items-center gap-1">
                                                        <FileText className="h-3 w-3" />
                                                        Materials Available
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <Button variant="outline" size="sm" className="flex-shrink-0">
                                            Start Lesson
                                        </Button>
                                    </div>
                                ))}

                                {course.document && (
                                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            Course Materials
                                        </h4>
                                        {course.document.type === 'pdf' && course.document.url ? (
                                            <a
                                                href={course.document.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-700 hover:text-green-800 underline"
                                            >
                                                Download Course PDF
                                            </a>
                                        ) : (
                                            <p className="text-green-700 text-sm">{course.document.content}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {courses.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">No purchased courses found.</div>
                    <Link href="/learner/courses">
                        <Button>Browse Available Courses</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
