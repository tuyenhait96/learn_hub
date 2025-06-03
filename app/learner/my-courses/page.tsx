'use client'

export default function MyCoursesPage() {
  const purchasedCourses = [];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">My Courses</h1>
      {purchasedCourses.length === 0 ? (
        <p>You haven't purchased any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Map through purchasedCourses and display CourseCard or similar component */}
        </div>
      )}
    </div>
  );
}
