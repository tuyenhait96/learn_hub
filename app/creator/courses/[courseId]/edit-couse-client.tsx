'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

type Course = {
    id: string
    title: string
    description: string
    price: number
    status: string
    lessons: Array<{
        id: string
        title: string
        description: string
        videoUrl: string
    }>
}

type EditCourseClientProps = {
    courseId: string
    existingCourse: Course | null
}

export default function EditCourseClient({ courseId, existingCourse }: EditCourseClientProps) {
    const router = useRouter()
    const isNew = courseId === 'new'

    const [course, setCourse] = useState({
        title: existingCourse?.title || '',
        description: existingCourse?.description || '',
        price: existingCourse?.price || 0,
        status: existingCourse?.status || 'draft',
        lessons: existingCourse?.lessons || []
    })

    const handleSave = () => {
        // In a real app, this would save to an API
        console.log('Saving course:', course)
        router.push('/creator/courses')
    }

    const addLesson = () => {
        setCourse(prev => ({
            ...prev,
            lessons: [...prev.lessons, { id: Date.now().toString(), title: '', description: '', videoUrl: '' }]
        }))
    }

    const updateLesson = (index: number, field: string, value: string) => {
        setCourse(prev => ({
            ...prev,
            lessons: prev.lessons.map((lesson, i) => i === index ? { ...lesson, [field]: value } : lesson)
        }))
    }

    const removeLesson = (index: number) => {
        setCourse(prev => ({
            ...prev,
            lessons: prev.lessons.filter((_, i) => i !== index)
        }))
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/creator/courses">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Courses
                    </Button>
                </Link>
                <h1 className="text-2xl font-semibold">
                    {isNew ? 'Create New Course' : 'Edit Course'}
                </h1>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Course Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                value={course.title}
                                onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter course title"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={course.description}
                                onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Enter course description"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price">Price ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={course.price}
                                    onChange={(e) => setCourse(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={course.status} onValueChange={(value) => setCourse(prev => ({ ...prev, status: value }))}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Lessons</CardTitle>
                        <Button onClick={addLesson} size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Lesson
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {course.lessons.map((lesson, index) => (
                            <div key={lesson.id} className="border rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium">Lesson {index + 1}</h4>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeLesson(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <Input
                                        value={lesson.title}
                                        onChange={(e) => updateLesson(index, 'title', e.target.value)}
                                        placeholder="Lesson title"
                                    />
                                    <Textarea
                                        value={lesson.description}
                                        onChange={(e) => updateLesson(index, 'description', e.target.value)}
                                        placeholder="Lesson description"
                                        rows={2}
                                    />
                                    <Input
                                        value={lesson.videoUrl}
                                        onChange={(e) => updateLesson(index, 'videoUrl', e.target.value)}
                                        placeholder="Video URL (YouTube embed link)"
                                    />
                                </div>
                            </div>
                        ))}

                        {course.lessons.length === 0 && (
                            <p className="text-gray-500 text-center py-8">No lessons added yet. Click "Add Lesson" to get started.</p>
                        )}
                    </CardContent>
                </Card>

                <div className="flex gap-4">
                    <Button onClick={handleSave} className="flex-1">
                        {isNew ? 'Create Course' : 'Save Changes'}
                    </Button>
                    <Link href="/creator/courses">
                        <Button variant="outline" className="w-full">Cancel</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
} 