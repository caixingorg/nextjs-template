import { unstable_setRequestLocale } from 'next-intl/server';

interface HomePageProps {
  params: { lang: string };
}

export default function HomePage({ params: { lang } }: HomePageProps) {
  unstable_setRequestLocale(lang);

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold">Welcome to Next.js Template</h1>
      <p className="mt-4 text-lg text-gray-600">
        This is a starter template for your Next.js project.
      </p>
    </div>
  );
}