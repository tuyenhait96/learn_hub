'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Eye, Edit, Trash2, ExternalLink } from 'lucide-react'
import Link from 'next/link'

type LandingPage = {
    id: string;
    title: string;
    description: string;
    keyPoints: string[];
    videoUrl: string;
    courseId: string;
    courseName: string;
    status: 'published' | 'draft';
    createdAt: string;
};

// Mock landing page data
const mockLandingPages: LandingPage[] = [
    {
        id: "1",
        title: "Master Next.js in 30 Days",
        description: "Learn Next.js from scratch and build amazing web applications with our comprehensive course.",
        keyPoints: [
            "Learn modern React patterns",
            "Master Server Components",
            "Build full-stack applications",
            "Deploy to production"
        ],
        videoUrl: "https://www.youtube.com/embed/fmj9yG2I0L8",
        courseId: "1",
        courseName: "Introduction to Next.js",
        status: "published",
        createdAt: "2023-01-15"
    },
    {
        id: "2",
        title: "Tailwind CSS Mastery",
        description: "Design beautiful, responsive UIs with Tailwind CSS utility-first framework.",
        keyPoints: [
            "Utility-first CSS framework",
            "Responsive design patterns",
            "Custom component creation",
            "Production optimization"
        ],
        videoUrl: "https://www.youtube.com/embed/Lp6sA1HHoPY",
        courseId: "2",
        courseName: "Advanced Tailwind CSS",
        status: "draft",
        createdAt: "2023-02-20"
    }
];

// Mock videos for selection
const mockVideos = [
    { id: "1", title: "Next.js Introduction", url: "https://www.youtube.com/embed/fmj9yG2I0L8" },
    { id: "2", title: "Tailwind CSS Tutorial", url: "https://www.youtube.com/embed/Lp6sA1HHoPY" },
    { id: "3", title: "React Basics", url: "https://www.youtube.com/embed/SqcY0GlETPk" }
];

// Mock courses for selection
const mockCourses = [
    { id: "1", title: "Introduction to Next.js" },
    { id: "2", title: "Advanced Tailwind CSS" },
    { id: "3", title: "Full-Stack Development with Prisma" }
];

export default function LandingPagesPage() {
    const [landingPages, setLandingPages] = useState<LandingPage[]>(mockLandingPages)
    const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null)
    const [editingPage, setEditingPage] = useState<LandingPage | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [newPage, setNewPage] = useState<Omit<LandingPage, 'id' | 'createdAt'>>({
        title: '',
        description: '',
        keyPoints: [''],
        videoUrl: '',
        courseId: '',
        courseName: '',
        status: 'draft'
    })

    const deleteLandingPage = (id: string) => {
        setLandingPages(prev => prev.filter(page => page.id !== id))
    }

    const createLandingPage = () => {
        const selectedCourse = mockCourses.find(c => c.id === newPage.courseId)
        const newLandingPage: LandingPage = {
            ...newPage,
            id: Date.now().toString(),
            createdAt: new Date().toISOString().split('T')[0],
            courseName: selectedCourse?.title || ''
        }
        setLandingPages(prev => [...prev, newLandingPage])
        setIsCreating(false)
        setNewPage({
            title: '',
            description: '',
            keyPoints: [''],
            videoUrl: '',
            courseId: '',
            courseName: '',
            status: 'draft'
        })
    }

    const updateLandingPage = (updatedPage: LandingPage) => {
        setLandingPages(prev => prev.map(page =>
            page.id === updatedPage.id ? updatedPage : page
        ))
        setEditingPage(null)
    }

    const addKeyPoint = (isEdit = false) => {
        if (isEdit && editingPage) {
            setEditingPage({ ...editingPage, keyPoints: [...editingPage.keyPoints, ''] })
        } else {
            setNewPage(prev => ({ ...prev, keyPoints: [...prev.keyPoints, ''] }))
        }
    }

    const updateKeyPoint = (index: number, value: string, isEdit = false) => {
        if (isEdit && editingPage) {
            const updatedKeyPoints = editingPage.keyPoints.map((point, i) =>
                i === index ? value : point
            )
            setEditingPage({ ...editingPage, keyPoints: updatedKeyPoints })
        } else {
            const updatedKeyPoints = newPage.keyPoints.map((point, i) =>
                i === index ? value : point
            )
            setNewPage(prev => ({ ...prev, keyPoints: updatedKeyPoints }))
        }
    }

    const removeKeyPoint = (index: number, isEdit = false) => {
        if (isEdit && editingPage) {
            setEditingPage({
                ...editingPage,
                keyPoints: editingPage.keyPoints.filter((_, i) => i !== index)
            })
        } else {
            setNewPage(prev => ({
                ...prev,
                keyPoints: prev.keyPoints.filter((_, i) => i !== index)
            }))
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Landing Page Management</h1>
                <Dialog open={isCreating} onOpenChange={setIsCreating}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create New Landing Page
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Create New Landing Page</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto">
                            <div>
                                <Label htmlFor="new-title">Title</Label>
                                <Input
                                    id="new-title"
                                    value={newPage.title}
                                    onChange={(e) => setNewPage(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Enter landing page title"
                                />
                            </div>

                            <div>
                                <Label htmlFor="new-description">Description</Label>
                                <Textarea
                                    id="new-description"
                                    value={newPage.description}
                                    onChange={(e) => setNewPage(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Enter landing page description"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="new-course">Select Course</Label>
                                <Select value={newPage.courseId} onValueChange={(value) => {
                                    const course = mockCourses.find(c => c.id === value)
                                    setNewPage(prev => ({ ...prev, courseId: value, courseName: course?.title || '' }))
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mockCourses.map((course) => (
                                            <SelectItem key={course.id} value={course.id}>
                                                {course.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="new-video">Select Video</Label>
                                <Select value={newPage.videoUrl} onValueChange={(value) =>
                                    setNewPage(prev => ({ ...prev, videoUrl: value }))
                                }>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a video" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mockVideos.map((video) => (
                                            <SelectItem key={video.id} value={video.url}>
                                                {video.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Label>Key Points</Label>
                                    <Button type="button" variant="outline" size="sm" onClick={() => addKeyPoint()}>
                                        Add Point
                                    </Button>
                                </div>
                                {newPage.keyPoints.map((point, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <Input
                                            value={point}
                                            onChange={(e) => updateKeyPoint(index, e.target.value)}
                                            placeholder={`Key point ${index + 1}`}
                                        />
                                        {newPage.keyPoints.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeKeyPoint(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div>
                                <Label htmlFor="new-status">Status</Label>
                                <Select value={newPage.status} onValueChange={(value: 'published' | 'draft') =>
                                    setNewPage(prev => ({ ...prev, status: value }))
                                }>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button onClick={createLandingPage} className="w-full">
                                Create Landing Page
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Landing Pages</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {landingPages.map((page) => (
                                <TableRow key={page.id}>
                                    <TableCell className="font-medium">{page.title}</TableCell>
                                    <TableCell>{page.courseName}</TableCell>
                                    <TableCell>
                                        <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                                            {page.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{page.createdAt}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setSelectedPage(page)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Landing Page Preview</DialogTitle>
                                                    </DialogHeader>
                                                    {selectedPage && (
                                                        <div className="space-y-6">
                                                            <div className="text-center">
                                                                <h2 className="text-3xl font-bold mb-4">{selectedPage.title}</h2>
                                                                <p className="text-lg text-gray-600 mb-6">{selectedPage.description}</p>
                                                            </div>

                                                            <div className="aspect-video">
                                                                <iframe
                                                                    src={selectedPage.videoUrl}
                                                                    className="w-full h-full rounded-lg"
                                                                    allowFullScreen
                                                                    title="Course Preview"
                                                                />
                                                            </div>

                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-4">What You'll Learn:</h3>
                                                                <ul className="list-disc list-inside space-y-2">
                                                                    {selectedPage.keyPoints.map((point, index) => (
                                                                        <li key={index}>{point}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div className="text-center">
                                                                <Link href="/creator/checkout">
                                                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                                                        Buy Course
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )}
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setEditingPage({ ...page })}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                {editingPage && (
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Landing Page</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                                            <div>
                                                                <Label htmlFor="edit-title">Title</Label>
                                                                <Input
                                                                    id="edit-title"
                                                                    value={editingPage.title}
                                                                    onChange={(e) => setEditingPage(prev =>
                                                                        prev ? { ...prev, title: e.target.value } : null
                                                                    )}
                                                                />
                                                            </div>

                                                            <div>
                                                                <Label htmlFor="edit-description">Description</Label>
                                                                <Textarea
                                                                    id="edit-description"
                                                                    value={editingPage.description}
                                                                    onChange={(e) => setEditingPage(prev =>
                                                                        prev ? { ...prev, description: e.target.value } : null
                                                                    )}
                                                                    rows={3}
                                                                />
                                                            </div>

                                                            <div>
                                                                <Label htmlFor="edit-video">Select Video</Label>
                                                                <Select
                                                                    value={editingPage.videoUrl}
                                                                    onValueChange={(value) => setEditingPage(prev =>
                                                                        prev ? { ...prev, videoUrl: value } : null
                                                                    )}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {mockVideos.map((video) => (
                                                                            <SelectItem key={video.id} value={video.url}>
                                                                                {video.title}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <div>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <Label>Key Points</Label>
                                                                    <Button type="button" variant="outline" size="sm" onClick={() => addKeyPoint(true)}>
                                                                        Add Point
                                                                    </Button>
                                                                </div>
                                                                {editingPage.keyPoints.map((point, index) => (
                                                                    <div key={index} className="flex gap-2 mb-2">
                                                                        <Input
                                                                            value={point}
                                                                            onChange={(e) => updateKeyPoint(index, e.target.value, true)}
                                                                            placeholder={`Key point ${index + 1}`}
                                                                        />
                                                                        {editingPage.keyPoints.length > 1 && (
                                                                            <Button
                                                                                type="button"
                                                                                variant="outline"
                                                                                size="sm"
                                                                                onClick={() => removeKeyPoint(index, true)}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div>
                                                                <Label htmlFor="edit-status">Status</Label>
                                                                <Select
                                                                    value={editingPage.status}
                                                                    onValueChange={(value: 'published' | 'draft') =>
                                                                        setEditingPage(prev => prev ? { ...prev, status: value } : null)
                                                                    }
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="draft">Draft</SelectItem>
                                                                        <SelectItem value="published">Published</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <Button onClick={() => updateLandingPage(editingPage)} className="w-full">
                                                                Save Changes
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                )}
                                            </Dialog>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => deleteLandingPage(page.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
} 