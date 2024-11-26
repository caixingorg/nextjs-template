import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/common/Button'

export function Header() {
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">{t('home')}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/products">{t('products')}</Link>
            <Link href="/cart">{t('cart')}</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="sm">
            {t('account')}
          </Button>
        </div>
      </div>
    </header>
  )
}