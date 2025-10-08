'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CurvedButton } from '@/components/ui/curved-button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { APP_CONFIG, ROUTES } from '@/lib/constants'

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: 'Accueil', href: ROUTES.home },
    { name: 'À propos', href: ROUTES.about },
    { name: 'Tarifs', href: ROUTES.pricing },
    { name: 'Contact', href: ROUTES.contact },
  ]

  const userNavigation = [
    { name: 'Tableau de bord', href: ROUTES.dashboard.home },
    { name: 'Vidéos', href: ROUTES.dashboard.videos },
    { name: 'Programmes', href: ROUTES.dashboard.programs },
    { name: 'Profil', href: ROUTES.dashboard.profile },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 dark:bg-dark-surface/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-dark-surface/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.home} className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <Image
                src={APP_CONFIG.logo}
                alt={APP_CONFIG.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-gradient">
                {APP_CONFIG.name}
              </h1>
              <p className="text-xs text-muted-foreground dark:text-primary-400">avec Marie-Line</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Basculer le thème</span>
              </Button>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <User className="h-4 w-4" />
                  <span className="sr-only">Menu utilisateur</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {userNavigation.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <CurvedButton variant="plan" glow>
              Commencer maintenant
            </CurvedButton>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Theme Toggle Mobile */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Basculer le thème</span>
              </Button>
            )}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3">
                    <div className="relative h-8 w-8">
                      <Image
                        src={APP_CONFIG.logo}
                        alt={APP_CONFIG.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-heading font-bold text-gradient">
                        {APP_CONFIG.name}
                      </h2>
                      <p className="text-xs text-muted-foreground dark:text-primary-400">avec Marie-Line</p>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium text-muted-foreground dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile User Menu */}
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-muted-foreground dark:text-primary-300 mb-3">Mon compte</h3>
                    <nav className="flex flex-col space-y-3">
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-primary-800 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <button className="text-sm text-muted-foreground dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-200 transition-colors text-left">
                        Déconnexion
                      </button>
                    </nav>
                  </div>

                  {/* Mobile CTA */}
                  <CurvedButton variant="plan" className="w-full" glow>
                    Commencer maintenant
                  </CurvedButton>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
