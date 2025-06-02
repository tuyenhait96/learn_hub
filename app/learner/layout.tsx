"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function LearnedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link
            href={"/learner/courses"}
            className="text-xl font-semibold text-gray-700 hover:text-blue-600"
          >
            LearnHub
          </Link>
          <div>
            <Link
              href={"learner/courses/purchased"}
              className="text-gray-700 hover:text-blue-600 mx-2"
            >
              My Course
            </Link>
            <Button
            variant={'ghost'}
              onClick={logout}
              className="text-gray-700 hover:text-blue-600"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
