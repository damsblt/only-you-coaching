'use client'

import * as React from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { CurvedCard } from '@/components/ui/curved-card'
import { CurvedButton } from '@/components/ui/curved-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CONTACT_INFO } from '@/lib/constants'

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    // Handle success
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Réponse sous 24h',
      value: CONTACT_INFO.email,
      action: `mailto:${CONTACT_INFO.email}`
    },
    {
      icon: Phone,
      title: 'Téléphone',
      description: 'Lun-Ven 9h-18h',
      value: CONTACT_INFO.phone,
      action: `tel:${CONTACT_INFO.phone}`
    },
    {
      icon: MapPin,
      title: 'Adresse',
      description: 'Suisse',
      value: CONTACT_INFO.address,
      action: '#'
    },
    {
      icon: Clock,
      title: 'Horaires',
      description: 'Support client',
      value: CONTACT_INFO.hours,
      action: '#'
    }
  ]

  const faqs = [
    {
      question: 'Comment puis-je commencer ?',
      answer: 'C\'est très simple ! Créez votre compte, choisissez votre plan et commencez immédiatement votre première séance. Nous offrons un essai gratuit de 7 jours.'
    },
    {
      question: 'Puis-je changer de plan ?',
      answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre tableau de bord. Les changements prennent effet immédiatement.'
    },
    {
      question: 'Les vidéos sont-elles disponibles hors ligne ?',
      answer: 'Oui, vous pouvez télécharger les vidéos pour les regarder hors ligne sur l\'application mobile.'
    },
    {
      question: 'Y a-t-il un support client ?',
      answer: 'Absolument ! Notre équipe est disponible par email et chat pour répondre à toutes vos questions.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-background dark:to-dark-surface">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-800 to-primary-900 dark:from-slate-900 dark:to-slate-800 text-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-heading font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-primary-200 dark:text-primary-300 mb-8">
              Une question ? Un besoin d'aide ? Nous sommes là pour vous accompagner 
              dans votre parcours de bien-être.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <CurvedCard variant="glass" className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-2">
                  Envoyez-nous un message
                </h2>
                <p className="text-primary-600 dark:text-primary-300">
                  Nous vous répondrons dans les plus brefs délais
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-primary-800 dark:text-primary-200">
                      Nom complet *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="curved-input"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary-800 dark:text-primary-200">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="curved-input"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-primary-800 dark:text-primary-200">
                    Sujet *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Sujet de votre message"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="curved-input"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-primary-800 dark:text-primary-200">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Votre message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="curved-input min-h-[120px]"
                    required
                  />
                </div>

                <CurvedButton
                  type="submit"
                  className="w-full"
                  variant="plan"
                  glow
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  <Send className="ml-2 h-4 w-4" />
                </CurvedButton>
              </form>
            </CurvedCard>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-6">
                Nos coordonnées
              </h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <CurvedCard key={index} variant="glass" className="p-4 hover-lift cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-200/20 dark:to-primary-300/20 flex items-center justify-center">
                        <method.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary-800 dark:text-primary-200">{method.title}</h3>
                        <p className="text-sm text-primary-600 dark:text-primary-300">{method.description}</p>
                        <p className="text-primary-800 dark:text-primary-200 font-medium">{method.value}</p>
                      </div>
                    </div>
                  </CurvedCard>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-6">
                Questions fréquentes
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <CurvedCard key={index} variant="glass" className="p-4">
                    <h3 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-300">
                      {faq.answer}
                    </p>
                  </CurvedCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Support Chat */}
        <div className="mt-16 text-center">
          <CurvedCard variant="glass" className="p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-200/20 dark:to-primary-300/20 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-2">
              Besoin d'aide immédiate ?
            </h3>
            <p className="text-primary-600 dark:text-primary-300 mb-6">
              Notre chat de support est disponible 24/7 pour répondre à vos questions
            </p>
            <CurvedButton variant="plan" glow>
              <MessageCircle className="mr-2 h-4 w-4" />
              Ouvrir le chat
            </CurvedButton>
          </CurvedCard>
        </div>
      </div>
    </div>
  )
}
