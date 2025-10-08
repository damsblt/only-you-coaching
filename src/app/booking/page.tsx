import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réservation - Marie-Line Pilates',
  description: 'Réservez votre séance de Pilates avec Marie-Line',
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Réservation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Réservez votre séance de Pilates personnalisée avec Marie-Line
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Choisissez votre type de séance
            </h2>
            <p className="text-gray-600">
              Séances individuelles ou en petit groupe pour un suivi personnalisé
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Séance Individuelle */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 border border-primary-200">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Séance Individuelle
              </h3>
              <ul className="space-y-3 text-primary-800 mb-6">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Suivi personnalisé
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  60 minutes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Programme adapté à vos besoins
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  En ligne ou en présentiel
                </li>
              </ul>
              <div className="text-2xl font-bold text-primary-900 mb-4">
                80€ / séance
              </div>
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Réserver maintenant
              </button>
            </div>

            {/* Séance en Groupe */}
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg p-6 border border-secondary-200">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Séance en Groupe
              </h3>
              <ul className="space-y-3 text-secondary-800 mb-6">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                  Maximum 6 personnes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                  45 minutes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                  Ambiance conviviale
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                  En ligne uniquement
                </li>
              </ul>
              <div className="text-2xl font-bold text-secondary-900 mb-4">
                25€ / personne
              </div>
              <button className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Réserver maintenant
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Besoin d'aide pour choisir ?
            </h3>
            <p className="text-gray-600 mb-6">
              Contactez Marie-Line directement pour discuter de vos besoins
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:marie-line@pilates.com"
                className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Envoyer un email
              </a>
              <a
                href="tel:+33612345678"
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
