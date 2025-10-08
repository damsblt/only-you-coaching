'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn, getSession } from 'next-auth/react'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import { CurvedButton } from '@/components/ui/curved-button'
import { CurvedCard } from '@/components/ui/curved-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { APP_CONFIG, ROUTES } from '@/lib/constants'

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const [error, setError] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou mot de passe incorrect')
      } else {
        router.push(ROUTES.dashboard.home)
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={ROUTES.home} className="inline-flex items-center space-x-3">
            <div className="relative h-12 w-12">
              <Image
                src={APP_CONFIG.logo}
                alt={APP_CONFIG.name}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-gradient">
                {APP_CONFIG.name}
              </h1>
              <p className="text-sm text-primary-600">avec Marie-Line</p>
            </div>
          </Link>
        </div>

        {/* Sign In Form */}
        <CurvedCard variant="glass" className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-heading font-bold text-primary-800 mb-2">
              Connexion
            </h2>
            <p className="text-primary-600">
              Connectez-vous à votre compte
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-curved text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-800">
                Adresse email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 curved-input"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary-800">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 curved-input"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-primary-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-primary-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-primary-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-primary-600">Se souvenir de moi</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <CurvedButton
              type="submit"
              className="w-full"
              variant="plan"
              glow
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </CurvedButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-primary-600">
              Pas encore de compte ?{' '}
              <Link
                href={ROUTES.auth.signup}
                className="text-primary-800 hover:text-primary-600 font-medium transition-colors"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </CurvedCard>

        {/* Demo Credentials */}
        <CurvedCard variant="glass" className="p-4 mt-6">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-primary-800 mb-2">
              Compte de démonstration
            </h3>
            <p className="text-xs text-primary-600 mb-3">
              Utilisez ces identifiants pour tester l'application
            </p>
            <div className="space-y-1 text-xs text-primary-600">
              <p><strong>Email:</strong> demo@onlyyoucoaching.ch</p>
              <p><strong>Mot de passe:</strong> demo123</p>
            </div>
            <CurvedButton
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => {
                setFormData({
                  email: 'demo@onlyyoucoaching.ch',
                  password: 'demo123'
                })
              }}
            >
              Remplir automatiquement
            </CurvedButton>
          </div>
        </CurvedCard>
      </div>
    </div>
  )
}
