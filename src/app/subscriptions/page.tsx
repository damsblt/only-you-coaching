import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Abonnements - Marie-Line Pilates',
  description: 'Découvrez nos abonnements Pilates pour un suivi régulier',
}

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Abonnements
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez l'abonnement qui correspond à vos objectifs et à votre rythme
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Abonnement Découverte */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Découverte
              </h3>
              <p className="text-gray-600">Parfait pour commencer</p>
            </div>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-gray-900">29€</span>
              <span className="text-gray-600">/mois</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">2 séances par mois</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Accès aux vidéos de base</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Support par email</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Résiliation à tout moment</span>
              </li>
            </ul>
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Commencer
            </button>
          </div>

          {/* Abonnement Standard */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-primary-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Populaire
              </span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Standard
              </h3>
              <p className="text-gray-600">Le plus choisi</p>
            </div>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-primary-600">59€</span>
              <span className="text-gray-600">/mois</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="w-5 h-5 bg-primary-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">4 séances par mois</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-primary-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Accès à toutes les vidéos</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-primary-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Programmes personnalisés</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-primary-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Support prioritaire</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-primary-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Méditations incluses</span>
              </li>
            </ul>
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Choisir ce plan
            </button>
          </div>

          {/* Abonnement Premium */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Premium
              </h3>
              <p className="text-gray-600">Pour les plus motivés</p>
            </div>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-gray-900">99€</span>
              <span className="text-gray-600">/mois</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Séances illimitées</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Accès à tout le contenu</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Coaching individuel</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Suivi nutritionnel</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Support 24/7</span>
              </li>
            </ul>
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Choisir ce plan
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Questions fréquentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Puis-je changer d'abonnement ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez modifier votre abonnement à tout moment depuis votre espace personnel.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Y a-t-il des frais d'annulation ?
              </h3>
              <p className="text-gray-600">
                Non, vous pouvez annuler votre abonnement sans frais à tout moment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Les séances sont-elles enregistrées ?
              </h3>
              <p className="text-gray-600">
                Oui, toutes les séances en ligne sont enregistrées et disponibles en replay.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Puis-je suspendre mon abonnement ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez suspendre votre abonnement pour une durée maximale de 3 mois.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
