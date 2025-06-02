"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, 'Password must be at least 6 characters').required("Password is required"),
})

export default function LoginPage() {
    const { login } = useAuth()
    const form = useForm<yup.InferType<typeof formSchema>>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (values: yup.InferType<typeof formSchema>) => {
        await login(values.email, values.password);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50" >
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>
                    </form>
                </Form>
                <div className="text-center text-sm text-gray-600">
                    {`Don't have an account? `}
                    <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    )
}
