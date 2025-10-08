"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { 
  Menu, 
  X, 
  User, 
  ShoppingCart, 
  Heart, 
  Calendar,
  Video,
  Music,
  BookOpen
} from "lucide-react"

export function Header() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Vidéos", href: "/videos" },
    { name: "Programmes", href: "/programmes" },
    { name: "Méditation", href: "/meditation" },
    { name: "Réservation", href: "/booking" },
    { name: "Abonnements", href: "/subscriptions" },
    { name: "Admin", href: "/admin" },
  ]

  return (
    <header className="relative bg-white/70 backdrop-blur-md border-b border-neutral-200">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-28 h-28 organic-shape bg-primary-500/20" />
        <div className="absolute -bottom-12 -right-8 w-24 h-24 organic-shape-2 bg-secondary-500/10" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Only You Coaching"
              width={120}
              height={36}
              className="rounded-[0.9rem] shadow-organic object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="curved-button text-accent-600 hover:text-white hover:bg-secondary-500/90 px-4 py-2 text-sm font-medium transition-all"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {status === "loading" ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/favorites"
                  className="p-2 text-accent-500 hover:text-secondary-500 transition-colors curved-button hover:bg-primary-100"
                >
                  <Heart className="w-5 h-5" />
                </Link>
                <Link
                  href="/playlists"
                  className="p-2 text-accent-500 hover:text-secondary-500 transition-colors curved-button hover:bg-primary-100"
                >
                  <BookOpen className="w-5 h-5" />
                </Link>
                <Link
                  href="/profile"
                  className="p-2 text-accent-500 hover:text-secondary-500 transition-colors curved-button hover:bg-primary-100"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="curved-button text-accent-600 hover:text-white hover:bg-secondary-500/90 px-4 py-2 text-sm font-medium transition-all"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => signIn()}
                  className="curved-button text-accent-600 hover:text-white hover:bg-secondary-500/90 px-4 py-2 text-sm font-medium transition-all"
                >
                  Connexion
                </button>
                <Link
                  href="/auth/signup"
                  className="curved-button bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-4 py-2 text-sm font-medium shadow-organic hover:shadow-floating transition-all"
                >
                  S&apos;inscrire
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-accent-600 hover:text-secondary-500 transition-colors curved-button hover:bg-primary-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white/80 backdrop-blur-md rounded-b-[1.5rem]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-accent-700 hover:text-white text-base font-medium transition-colors curved-button hover:bg-secondary-500/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {session ? (
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-4 px-3 py-2">
                    <Link
                      href="/favorites"
                      className="p-2 text-accent-600 hover:text-secondary-500 transition-colors curved-button hover:bg-primary-100"
                    >
                      <Heart className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/playlists"
                      className="p-2 text-accent-600 hover:text-secondary-500 transition-colors curved-button hover:bg-primary-100"
                    >
                      <BookOpen className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/profile"
                      className="p-2 text-accent-600 hover:text-secondary-500 transition-colors curved-button hover:bg-primary-100"
                    >
                      <User className="w-5 h-5" />
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-accent-700 hover:text-white text-base font-medium transition-colors curved-button hover:bg-secondary-500/90"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t space-y-2">
                  <button
                    onClick={() => {
                      signIn()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-accent-700 hover:text-white text-base font-medium transition-colors curved-button hover:bg-secondary-500/90"
                  >
                    Connexion
                  </button>
                  <Link
                    href="/auth/signup"
                    className="block w-full text-center curved-button bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-4 py-2 text-sm font-medium shadow-organic hover:shadow-floating transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    S&apos;inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

