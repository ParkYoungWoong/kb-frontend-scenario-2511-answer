'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { oswald } from '@/styles/fonts'

export default function Header() {
  const pathname = usePathname()
  const menus = [
    {
      name: '🔍 Search',
      href: '/'
    },
    {
      name: '📽️ Sample Movie',
      href: '/movies/tt4520988'
    }
  ]
  return (
    <header className="sticky top-0 z-[2] flex items-center gap-10 bg-[rgba(14,17,27,.9)] px-10 py-5 max-sm:px-5 max-sm:py-[14px]">
      <Link
        href="/"
        className={`${oswald.className} text-[26px] text-[var(--color-white-50)] no-underline`}>
        <span className="text-[var(--color-primary)]">OMDbAPI</span>.COM
      </Link>
      <nav className="max-sm:hidden">
        <ul className="flex gap-5">
          {menus.map((menu, index) => (
            <li
              key={index}
              className={`text-sm font-bold ${pathname === menu.href ? 'text-[var(--color-primary)]' : ''}`}>
              <Link
                prefetch={true}
                href={menu.href}
                className={`no-underline ${pathname === menu.href ? 'text-inherit' : 'text-[var(--color-white-50)]'}`}>
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
