'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { CurvedCard } from '@/components/ui/curved-card'
import { APP_CONFIG, ROUTES, SOCIAL_LINKS, CONTACT_INFO, LEGAL_PAGES } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { name: 'Accueil', href: ROUTES.home },
        { name: 'À propos', href: ROUTES.about },
        { name: 'Tarifs', href: ROUTES.pricing },
        { name: 'Contact', href: ROUTES.contact },
      ],
    },
    {
      title: 'Mon compte',
      links: [
        { name: 'Tableau de bord', href: ROUTES.dashboard.home },
        { name: 'Vidéos', href: ROUTES.dashboard.videos },
        { name: 'Programmes', href: ROUTES.dashboard.programs },
        { name: 'Profil', href: ROUTES.dashboard.profile },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Support', href: '/support' },
        { name: 'Tutoriels', href: '/tutorials' },
      ],
    },
    {
      title: 'Légal',
      links: LEGAL_PAGES.map(page => ({
        name: page.title,
        href: page.href,
      })),
    },
  ]

  const socialLinks = [
    { name: 'Instagram', href: SOCIAL_LINKS.instagram, icon: Instagram },
    { name: 'Facebook', href: SOCIAL_LINKS.facebook, icon: Facebook },
    { name: 'YouTube', href: SOCIAL_LINKS.youtube, icon: Youtube },
  ]

  const contactInfo = [
    { icon: Mail, text: CONTACT_INFO.email },
    { icon: Phone, text: CONTACT_INFO.phone },
    { icon: MapPin, text: CONTACT_INFO.address },
  ]

  return (
    <footer className="curved-footer bg-gradient-to-br from-primary-800 to-primary-900 dark:from-slate-900 dark:to-slate-800 text-primary-50">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative h-12 w-12">
                <Image
                  src={APP_CONFIG.logo}
                  alt={APP_CONFIG.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-gradient-accent">
                  {APP_CONFIG.name}
                </h3>
                <p className="text-primary-200 dark:text-primary-300">avec Marie-Line</p>
              </div>
            </div>
            <p className="text-primary-200 dark:text-primary-300 mb-6 max-w-md">
              Transformez votre corps et votre esprit avec des programmes Pilates personnalisés 
              et un accompagnement expert de Marie-Line.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-primary-200 dark:text-primary-300">
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-primary-100 dark:text-primary-200">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-200 dark:text-primary-300 hover:text-primary-50 dark:hover:text-primary-100 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <CurvedCard variant="glass" className="p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-2 text-primary-800 dark:text-primary-200">
              Restez informé(e)
            </h3>
            <p className="text-primary-600 dark:text-primary-300 mb-6">
              Recevez nos conseils exclusifs et les dernières nouveautés directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-curved border-2 border-primary-200 dark:border-primary-600 focus:border-primary-800 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-400/20 transition-all duration-300 bg-white dark:bg-dark-card text-primary-800 dark:text-primary-200 placeholder-primary-500 dark:placeholder-primary-400"
              />
              <button className="px-6 py-3 bg-primary-800 dark:bg-primary-600 text-primary-50 rounded-curved hover:bg-primary-700 dark:hover:bg-primary-500 transition-colors font-medium">
                S'abonner
              </button>
            </div>
          </div>
        </CurvedCard>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 dark:text-primary-300 hover:text-primary-50 dark:hover:text-primary-100 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="text-center sm:text-right">
            <p className="text-primary-200 dark:text-primary-300 text-sm">
              © {currentYear} {APP_CONFIG.name}. Tous droits réservés.
            </p>
            <p className="text-primary-300 dark:text-primary-400 text-xs mt-1">
              Fait avec ❤️ en Suisse
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
