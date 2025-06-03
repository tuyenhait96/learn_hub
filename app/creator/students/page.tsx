'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Search, Eye, Edit, Ban, CheckCircle } from 'lucide-react'

type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    joinDate: string;
    purchasedCourses: string[];
    totalSpent: number;
};

// Mock user data with purchased courses
const mockUsers: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1-555-0123",
        address: "123 Main St, City, State 12345",
        status: "active",
        joinDate: "2023-01-15",
        purchasedCourses: ["Introduction to Next.js", "Advanced Tailwind CSS"],
        totalSpent: 129.98
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1-555-0456",
        address: "456 Oak Ave, City, State 67890",
        status: "blocked",
        joinDate: "2023-02-20",
        purchasedCourses: ["Full-Stack Development with Prisma"],
        totalSpent: 99.99
    },
    {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        phone: "+1-555-0789",
        address: "789 Pine Rd, City, State 54321",
        status: "active",
        joinDate: "2023-03-10",
        purchasedCourses: ["Introduction to Next.js"],
        totalSpent: 49.99
    }
]

export default function StudentsPage() {
    const [users, setUsers] = useState<User[]>(mockUsers)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [editingUser, setEditingUser] = useState<User | null>(null)

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleUserStatus = (userId: string) => {
        setUsers(prev => prev.map(user =>
            user.id === userId
                ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
                : user
        ))
    }

    const updateUser = (updatedUser: any) => {
        setUsers(prev => prev.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        ))
        setEditingUser(null)
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">User Management</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Course Purchasers</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Courses</TableHead>
                                <TableHead>Total Spent</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.purchasedCourses.length}</TableCell>
                                    <TableCell>${user.totalSpent.toFixed(2)}</TableCell>
                                    <TableCell>{user.joinDate}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setSelectedUser(user)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>User Details</DialogTitle>
                                                    </DialogHeader>
                                                    {selectedUser && (
                                                        <div className="space-y-4">
                                                            <div>
                                                                <Label className="font-semibold">Name:</Label>
                                                                <p>{selectedUser.name}</p>
                                                            </div>
                                                            <div>
                                                                <Label className="font-semibold">Email:</Label>
                                                                <p>{selectedUser.email}</p>
                                                            </div>
                                                            <div>
                                                                <Label className="font-semibold">Phone:</Label>
                                                                <p>{selectedUser.phone}</p>
                                                            </div>
                                                            <div>
                                                                <Label className="font-semibold">Address:</Label>
                                                                <p>{selectedUser.address}</p>
                                                            </div>
                                                            <div>
                                                                <Label className="font-semibold">Purchased Courses:</Label>
                                                                <ul className="list-disc list-inside">
                                                                    {selectedUser.purchasedCourses.map((course, index) => (
                                                                        <li key={index}>{course}</li>
                                                                    ))}
                                                                </ul>
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
                                                        onClick={() => setEditingUser({ ...user })}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                {editingUser && (
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Edit User</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <Label htmlFor="edit-name">Name</Label>
                                                                <Input
                                                                    id="edit-name"
                                                                    value={editingUser.name}
                                                                    onChange={(e) => setEditingUser(prev =>
                                                                        prev ? { ...prev, name: e.target.value } : null
                                                                    )}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="edit-email">Email</Label>
                                                                <Input
                                                                    id="edit-email"
                                                                    value={editingUser.email}
                                                                    onChange={(e) => setEditingUser(prev =>
                                                                        prev ? { ...prev, email: e.target.value } : null
                                                                    )}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="edit-phone">Phone</Label>
                                                                <Input
                                                                    id="edit-phone"
                                                                    value={editingUser.phone}
                                                                    onChange={(e) => setEditingUser(prev =>
                                                                        prev ? { ...prev, phone: e.target.value } : null
                                                                    )}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="edit-address">Address</Label>
                                                                <Input
                                                                    id="edit-address"
                                                                    value={editingUser.address}
                                                                    onChange={(e) => setEditingUser(prev =>
                                                                        prev ? { ...prev, address: e.target.value } : null
                                                                    )}
                                                                />
                                                            </div>
                                                            <Button onClick={() => updateUser(editingUser)} className="w-full">
                                                                Save Changes
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                )}
                                            </Dialog>

                                            <Button
                                                variant={user.status === 'active' ? 'destructive' : 'default'}
                                                size="sm"
                                                onClick={() => toggleUserStatus(user.id)}
                                            >
                                                {user.status === 'active' ? (
                                                    <Ban className="h-4 w-4" />
                                                ) : (
                                                    <CheckCircle className="h-4 w-4" />
                                                )}
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