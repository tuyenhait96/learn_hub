'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, FileText, Download, Eye } from 'lucide-react'
import Link from 'next/link'

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

interface LessonDetailClientProps {
    courseId: string
    videoId: string
}

export default function LessonDetailClient({ courseId, videoId }: LessonDetailClientProps) {
    const [course, setCourse] = useState<Course | null>(null)
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch('/data/courses.json')
                const courses: Course[] = await response.json()

                const foundCourse = courses.find(c => c.id === courseId)
                if (foundCourse) {
                    setCourse(foundCourse)
                    const foundVideo = foundCourse.videos.find(v => v.id === videoId)
                    setCurrentVideo(foundVideo || null)
                }
            } catch (error) {
                console.error('Error fetching course data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCourseData()
    }, [courseId, videoId])

    if (loading) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading lesson...</div>
                </div>
            </div>
        )
    }

    if (!course || !currentVideo) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="text-center py-12">
                    <div className="text-red-500 mb-4">Lesson not found.</div>
                    <Link href="/learner/courses/purchased">
                        <Button>Back to My Courses</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const currentVideoIndex = course.videos.findIndex(v => v.id === videoId)
    const nextVideo = course.videos[currentVideoIndex + 1]
    const prevVideo = course.videos[currentVideoIndex - 1]

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/learner/courses/purchased">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to My Courses
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold">{currentVideo.title}</h1>
                    <p className="text-gray-600">Course: {course.title}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Player Section */}
                <div className="lg:col-span-2">
                    <Card className="mb-6">
                        <CardContent className="p-0">
                            <div className="aspect-video">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={currentVideo.url}
                                    title={currentVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-t-lg"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-3">{currentVideo.title}</h2>
                                <p className="text-gray-700 mb-4">{currentVideo.description}</p>

                                {/* Navigation buttons */}
                                <div className="flex justify-between items-center">
                                    {prevVideo ? (
                                        <Link href={`/learner/lessons/${courseId}/${prevVideo.id}`}>
                                            <Button variant="outline">
                                                <ArrowLeft className="h-4 w-4 mr-2" />
                                                Previous Lesson
                                            </Button>
                                        </Link>
                                    ) : (
                                        <div></div>
                                    )}

                                    {nextVideo ? (
                                        <Link href={`/learner/lessons/${courseId}/${nextVideo.id}`}>
                                            <Button>
                                                Next Lesson
                                                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button disabled>Course Complete!</Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Course Materials */}
                    {course.document && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Course Materials
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {course.document.type === 'pdf' && course.document.url ? (
                                    <div className="space-y-3">
                                        <p className="text-gray-600">Additional course materials are available for download.</p>
                                        <div className="flex gap-2">
                                            <a
                                                href={course.document.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button variant="outline" size="sm">
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Download PDF
                                                </Button>
                                            </a>
                                            <a
                                                href={course.document.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View in Browser
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                ) : course.document.content ? (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-800">{course.document.content}</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No additional materials for this lesson.</p>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Course Sidebar */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Course Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="text-sm text-gray-600 mb-4">
                                    Lesson {currentVideoIndex + 1} of {course.videos.length}
                                </div>

                                {course.videos.map((video, index) => (
                                    <Link
                                        key={video.id}
                                        href={`/learner/lessons/${courseId}/${video.id}`}
                                        className={`block p-3 rounded-lg border transition-colors ${video.id === videoId
                                            ? 'bg-blue-50 border-blue-200'
                                            : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${video.id === videoId
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`font-medium text-sm ${video.id === videoId ? 'text-blue-700' : 'text-gray-900'
                                                    }`}>
                                                    {video.title}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                    {video.description}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 