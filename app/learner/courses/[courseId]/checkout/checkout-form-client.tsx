'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export function CheckoutFormClient() {
    const params = useParams();
    const courseId = params.courseId as string;
    const router = useRouter();

    const checkoutSchema = yup.object().shape({
        name: yup.string().required("Full name is required"),
        phone: yup.string().required("Phone number is required"),
        address: yup.string().required("Address is required"),
        paymentMethod: yup.string().required("Payment method is required"),
    });
    const form = useForm({
        resolver: yupResolver(checkoutSchema),
        defaultValues: {
            phone: "",
            name: "",
            address: "",
            paymentMethod: "",
        },
    });

    const onSubmit = (data: yup.InferType<typeof checkoutSchema>) => {
        router.push(`/learner/courses/purchased`);
    };

    return (
        <div className="max-w-2xl mx-auto pu-8">
            <h1 className="text-3xl font-semibold mb-6">
                Checkout for Course {courseId}
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="+1234567890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="123 Main St, Anytown, USA" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <FormControl>
                                    {/* Replace with actual payment method selection (e.g., Stripe, PayPal) */}
                                    <Input placeholder="Credit Card / PayPal" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Complete Purchase</Button>
                </form>
            </Form>
        </div>
    );
}
