'use client'
import { useAuth } from '@/app/context/AuthContext'
import { Button } from '@/components/ui/button'
import cn from '@/lib/utils'
import {
    LayoutTemplate,
    ListChecks,
    LogOut,
    Users
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
    const { logout } = useAuth()
    const pathname = usePathname()

    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4">
                <h2 className="text-lg font-semibold">Course Creator</h2>
            </div>
            <nav className="space-y-1 p-4">
                <Link
                    href="/creator/courses"
                    className={cn(
                        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                        pathname?.startsWith("/creator/courses") &&
                        "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
                    )}
                >
                    <div className="flex items-center gap-x-2 py-4">
                        <ListChecks size={22} />
                        Course Management
                    </div>
                </Link>
                <Link
                    href="/creator/students"
                    className={cn(
                        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                        pathname?.startsWith("/creator/students") &&
                        "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
                    )}
                >
                    <div className="flex items-center gap-x-2 py-4">
                        <Users size={22} />
                        User Management
                    </div>
                </Link>
                <Link
                    href="/creator/landing-pages"
                    className={cn(
                        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                        pathname?.startsWith("/creator/landing-pages") &&
                        "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
                    )}
                >
                    <div className="flex items-center gap-x-2 py-4">
                        <LayoutTemplate size={22} />
                        Landing Page Management
                    </div>
                </Link>

                <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={logout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </nav>
        </div>
    )
}
