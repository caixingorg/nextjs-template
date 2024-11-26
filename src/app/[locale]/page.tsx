import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js Template',
}

export default function HomePage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">Welcome to Next.js Template</h1>
      <p className="mt-4 text-lg text-gray-600">
        This is a starter template for your Next.js project.
      </p>
    </div>
  )
}