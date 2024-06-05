'use client'

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card glass lg:card-side text-neutral">
                <div className="card-body">
                    <h2 className="card-title text-4xl">Oops! Something went wrong</h2>
                    <p className="text-lg mt-4">We're sorry for the inconvenience. Our team has been notified and will look into the issue.</p>
                </div>
            </div>
        </div>
    )
}