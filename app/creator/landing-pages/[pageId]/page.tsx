export async function generateStaticParams() {
    return [
        { pageId: '1' },
        { pageId: '2' },
    ]
}

interface EditLandingPageProps {
    params: { pageId: string }
}

export default function EditLandingPage({ params }: EditLandingPageProps) {
    const { pageId } = params

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Edit Landing Page: {pageId}</h1>
            {/* Add form for editing landing page {pageId} here */}
            <p>Form for editing landing page {pageId} will be here.</p>
        </div>
    )
}
