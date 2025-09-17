import Link from "next/link"
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-accent-500 text-white overflow-hidden">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 -left-10 w-40 h-40 organic-shape bg-secondary-500/20" />
        <div className="absolute -bottom-16 -right-12 w-48 h-48 organic-shape-2 bg-primary-500/10" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-[0.9rem] flex items-center justify-center shadow-organic">
                <span className="text-white font-bold text-sm">ML</span>
              </div>
              <span className="text-xl font-bold">Marie-Line Pilates</span>
            </div>
            <p className="text-white/80 text-sm">
              Découvrez le Pilates avec Marie-Line. Vidéos de coaching, méditations et séances en ligne pour tous les niveaux.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-primary-50 transition-colors curved-button hover:bg-white/10 p-2">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-primary-50 transition-colors curved-button hover:bg-white/10 p-2">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-primary-50 transition-colors curved-button hover:bg-white/10 p-2">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/videos" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                  Vidéos de Pilates
                </Link>
              </li>
              <li>
                <Link href="/programmes" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                  Programmes Prédéfinis
                </Link>
              </li>
              <li>
                <Link href="/meditation" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                  Méditations
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                  Réservation
                </Link>
              </li>
              <li>
                <Link href="/subscriptions" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                  Abonnements
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses/beginner" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                  Cours Débutant
                </Link>
              </li>
              <li>
                <Link href="/courses/intermediate" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                  Cours Intermédiaire
                </Link>
              </li>
              <li>
                <Link href="/courses/advanced" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                  Cours Avancé
                </Link>
              </li>
              <li>
                <Link href="/sessions/online" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                  Séances en ligne
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-50" />
                <span className="text-white/80 text-sm">marie-line@pilates.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-50" />
                <span className="text-white/80 text-sm">+33 6 12 34 56 78</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary-50" />
                <span className="text-white/80 text-sm">Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm">
              © 2024 Marie-Line Pilates. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                Conditions d&apos;utilisation
              </Link>
              <Link href="/cookies" className="text-white/80 hover:text-primary-50 transition-colors text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

