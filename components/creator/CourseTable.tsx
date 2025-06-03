'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Trash2, Edit } from 'lucide-react'

type Course = {
    id: string
    title: string
    status: 'published' | 'draft'
    students: number
    revenue: number
    createdAt: string
}

type CourseTableProps = {
    courses: Course[]
    onDelete?: (courseId: string) => void
}

export function CourseTable({ courses, onDelete }: CourseTableProps) {
    const handleDelete = (courseId: string, courseTitle: string) => {
        if (onDelete) {
            onDelete(courseId)
        } else {
            // Fallback if no onDelete handler is provided
            console.log(`Deleting course: ${courseTitle}`)
            alert(`Course "${courseTitle}" would be deleted in a real application.`)
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.map((course) => (
                        <TableRow key={course.id}>
                            <TableCell className="font-medium">{course.title}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={course.status === 'published' ? 'default' : 'secondary'}
                                >
                                    {course.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{course.students}</TableCell>
                            <TableCell>${course.revenue.toFixed(2)}</TableCell>
                            <TableCell>{course.createdAt}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Link href={`/creator/courses/${course.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm">
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the course "{course.title}" and all of its lessons.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(course.id, course.title)}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Delete Course
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}