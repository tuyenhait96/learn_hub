"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Sidebar } from "@/components/creator/Sidebar";

const CreatorLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && (!user || user.role !== 'creator')) {
            router.push('/login')
        }
    }, [user, loading, router])

    if (loading || !user || user.role !== 'creator') {
        return <div>Loading or unauthorized...</div> // Or a proper loading/unauthorized component
    }

    return (
        <div className="h-full flex">
            <div className="h-full w-64 flex flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="pl-64 pt-0 h-full w-full">
                {children}
            </main>
        </div>
    );
}

export default CreatorLayout 
