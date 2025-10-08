'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react'
import { CurvedButton } from '@/components/ui/curved-button'
import { CurvedCard } from '@/components/ui/curved-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { APP_CONFIG, ROUTES, SUBSCRIPTION_PLANS } from '@/lib/constants'

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [selectedPlan, setSelectedPlan] = React.useState<string>('starter')
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    plan: 'starter',
    acceptTerms: false,
  })
  const [error, setError] = React.useState('')

  const plans = SUBSCRIPTION_PLANS.slice(0, 3) // Starter, Pro, Expert

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    if (!formData.acceptTerms) {
      setError('Veuillez accepter les conditions d\'utilisation')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to dashboard
      router.push(ROUTES.dashboard.home)
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

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    setFormData(prev => ({
      ...prev,
      plan: planId
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sign Up Form */}
            <CurvedCard variant="glass" className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-heading font-bold text-primary-800 mb-2">
                  Créer un compte
                </h2>
                <p className="text-primary-600">
                  Rejoignez la communauté Only You Coaching
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-curved text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-primary-800">
                    Nom complet
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Votre nom complet"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 curved-input"
                      required
                    />
                  </div>
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-primary-800">
                    Confirmer le mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirmer votre mot de passe"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 curved-input"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-primary-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-primary-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-primary-800 mb-3 block">
                      Choisissez votre plan de démarrage
                    </Label>
                    <div className="space-y-3">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          className={`p-4 rounded-curved border-2 cursor-pointer transition-all duration-300 ${
                            selectedPlan === plan.id
                              ? 'border-primary-800 bg-primary-50'
                              : 'border-primary-200 hover:border-primary-400'
                          }`}
                          onClick={() => handlePlanSelect(plan.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                selectedPlan === plan.id
                                  ? 'border-primary-800 bg-primary-800'
                                  : 'border-primary-300'
                              }`}>
                                {selectedPlan === plan.id && (
                                  <Check className="w-2 h-2 text-white" />
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-primary-800">{plan.name}</div>
                                <div className="text-sm text-primary-600">{plan.description}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary-800">
                                {plan.price} {plan.currency}
                              </div>
                              <div className="text-xs text-primary-600">
                                /{plan.interval === 'month' ? 'mois' : 'an'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        acceptTerms: e.target.checked
                      }))}
                      className="mt-1 rounded border-primary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-primary-600">
                      J'accepte les{' '}
                      <Link href="/terms" className="text-primary-800 hover:underline">
                        conditions d'utilisation
                      </Link>{' '}
                      et la{' '}
                      <Link href="/privacy" className="text-primary-800 hover:underline">
                        politique de confidentialité
                      </Link>
                    </span>
                  </label>
                </div>

                <CurvedButton
                  type="submit"
                  className="w-full"
                  variant="plan"
                  glow
                  disabled={isLoading}
                >
                  {isLoading ? 'Création du compte...' : 'Créer mon compte'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </CurvedButton>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-primary-600">
                  Déjà un compte ?{' '}
                  <Link
                    href={ROUTES.auth.signin}
                    className="text-primary-800 hover:text-primary-600 font-medium transition-colors"
                  >
                    Se connecter
                  </Link>
                </p>
              </div>
            </CurvedCard>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              <CurvedCard variant="glass" className="p-6">
                <h3 className="text-xl font-heading font-bold text-primary-800 mb-4">
                  Pourquoi nous rejoindre ?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-primary-800">Programmes personnalisés</div>
                      <div className="text-sm text-primary-600">Adaptés à votre niveau et vos objectifs</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-primary-800">Coaching expert</div>
                      <div className="text-sm text-primary-600">Accompagnement individuel avec Marie-Line</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-primary-800">Flexibilité totale</div>
                      <div className="text-sm text-primary-600">Entraînez-vous quand et où vous voulez</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-primary-800">Résultats garantis</div>
                      <div className="text-sm text-primary-600">Transformez votre corps en 30 jours</div>
                    </div>
                  </div>
                </div>
              </CurvedCard>

              <CurvedCard variant="glass" className="p-6">
                <h3 className="text-xl font-heading font-bold text-primary-800 mb-4">
                  Essai gratuit
                </h3>
                <p className="text-primary-600 mb-4">
                  Commencez votre transformation avec un essai gratuit de 7 jours. 
                  Aucune carte de crédit requise.
                </p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500 text-white">7 jours gratuits</Badge>
                  <Badge variant="outline">Sans engagement</Badge>
                </div>
              </CurvedCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
