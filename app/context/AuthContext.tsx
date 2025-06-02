"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: string;
    email: string;
    role: 'creator' | 'learner';
    name: string;
}
type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, role: string, name: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        const storeUser = localStorage.getItem('user');
        if (storeUser) {
            setUser(JSON.parse(storeUser));
        }
        setLoading(false);
    }, [])

    const login = async (email: string, password: string) => {
        console.log(email.split('@')[0]);

        const mockUser = {
            id: '1',
            email,
            role: email.includes('creator') ? 'creator' : 'learner',
            name: email.split('@')[0]
        } as User

        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        router.push(mockUser.role === 'creator' ? '/creator/courses' : '/learner/courses');
    }

    const register = async (email: string, password: string, role: string, name: string) => {
        const mockUser = {
            id: '1',
            email,
            role: role as 'creator' | 'learner',
            name
        }

        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        router.push(mockUser.role === 'creator' ? '/creator/courses' : '/learner/courses');

    }
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null)
        router.push('/login');
    }

    return (
        <AuthContext.Provider value={{
            user, login, logout, register, loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context
}