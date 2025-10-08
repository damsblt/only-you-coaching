import Link from "next/link"
import { 
  Play, 
  Users, 
  Star, 
  ArrowRight,
  Video,
  Music,
  Calendar,
  CheckCircle
} from "lucide-react"

// Pricing plans data
const pricingPlans = {
  personalized: {
    title: "Plan Coaching personnalisé et accompagnement",
    plans: [
      {
        name: "Essentiel",
        price: "69 CHF",
        features: [
          "Accès à la bibliothèque de vidéos d'exercices",
          "Mes recettes",
          "Programmes prédéfinis",
          "3 programmes d'entraînement personnalisés",
          "1 appel de coaching de 30 min/mois",
          "Vidéos d'exercices et explications envoyées par email",
          "Assistance SMS/email 5j/semaine"
        ]
      },
      {
        name: "Avancé",
        price: "109 CHF",
        features: [
          "Tout du plan Essentiel",
          "Accès à la bibliothèque audio guidée",
          "Suivi nutritionnel continu et conseils",
          "Suivi des progrès"
        ]
      },
      {
        name: "Premium",
        price: "149 CHF",
        features: [
          "Tout du plan Avancé",
          "1 visite à domicile pour présentation du programme"
        ]
      }
    ]
  },
  online: {
    title: "Plan Autonomie en ligne",
    plans: [
      {
        name: "Starter",
        price: "69 CHF",
        features: [
          "Accès à la bibliothèque de vidéos d'exercices",
          "Mes recettes",
          "Programmes prédéfinis",
          "3 programmes d'entraînement personnalisés",
          "1 appel de coaching de 30 min/mois",
          "Vidéos d'exercices et explications envoyées par email",
          "Assistance SMS/email 5j/semaine"
        ]
      },
      {
        name: "Pro",
        price: "109 CHF",
        features: [
          "Tout du plan Essentiel",
          "Accès à la bibliothèque audio guidée",
          "Suivi nutritionnel continu et conseils",
          "Suivi des progrès"
        ]
      },
      {
        name: "Expert",
        price: "149 CHF",
        features: [
          "Tout du plan Avancé",
          "1 visite à domicile pour présentation du programme"
        ]
      }
    ]
  }
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative curved-section bg-soft-gradient py-20 overflow-hidden">
        {/* Floating organic shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 organic-shape bg-primary-500/20 floating-element"></div>
        <div className="absolute top-32 right-20 w-24 h-24 organic-shape-2 bg-secondary-500/30 floating-element"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 organic-shape-3 bg-accent-500/10 floating-element"></div>
        <div className="absolute bottom-32 right-1/3 w-28 h-28 organic-shape bg-primary-500/25 floating-element"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="organic-text-container bg-white/80 backdrop-blur-sm">
                  <h1 className="text-4xl md:text-6xl font-bold text-accent-500 leading-tight">
                    Découvrez le
                    <span className="bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent">
                      {" "}Pilates
                    </span>
                    <br />
                    avec Marie-Line
                  </h1>
                </div>
                <p className="text-xl text-accent-600 leading-relaxed max-w-2xl">
                  Transformez votre corps et votre esprit grâce à des cours de Pilates personnalisés, 
                  des méditations guidées et un accompagnement professionnel.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  href="/subscriptions"
                  className="curved-button inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-secondary-500 to-accent-500 text-white font-semibold shadow-organic hover:shadow-floating transition-all transform hover:scale-105"
                >
                  Commencer maintenant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/videos"
                  className="curved-button inline-flex items-center justify-center px-8 py-4 border-2 border-secondary-500 text-secondary-500 font-semibold bg-white/80 backdrop-blur-sm hover:bg-secondary-500 hover:text-white transition-all"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Voir les vidéos
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-sm text-accent-600">
                <div className="flex items-center curved-card bg-white/60 backdrop-blur-sm px-4 py-2">
                  <Users className="w-5 h-5 text-secondary-500 mr-2" />
                  <span className="font-medium">500+ élèves</span>
                </div>
                <div className="flex items-center curved-card bg-white/60 backdrop-blur-sm px-4 py-2">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="font-medium">4.9/5 étoiles</span>
                </div>
                <div className="flex items-center curved-card bg-white/60 backdrop-blur-sm px-4 py-2">
                  <Video className="w-5 h-5 text-secondary-500 mr-2" />
                  <span className="font-medium">100+ vidéos</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 curved-card bg-gradient-to-br from-primary-200 to-secondary-200 shadow-organic overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center shadow-floating">
                    <Play className="w-8 h-8 text-secondary-500 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 curved-card bg-white/90 backdrop-blur-sm p-4">
                  <h3 className="font-semibold text-accent-500">Cours de Pilates Débutant</h3>
                  <p className="text-sm text-accent-600">30 minutes • Débutant</p>
                </div>
              </div>
              
              {/* Decorative curved elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 organic-shape bg-secondary-500/20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 organic-shape-2 bg-primary-500/30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50 relative overflow-hidden">
        {/* Background organic shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 organic-shape-3 bg-primary-500/5"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 organic-shape bg-secondary-500/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="organic-text-container bg-white/60 backdrop-blur-sm inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-accent-500 mb-4">
                Pourquoi choisir Marie-Line ?
              </h2>
            </div>
            <p className="text-xl text-accent-600 max-w-3xl mx-auto mt-6">
              Une approche holistique du bien-être qui combine Pilates, méditation et coaching personnalisé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 curved-card bg-gradient-to-br from-primary-50 to-secondary-50 hover:shadow-organic transition-all group">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-floating group-hover:scale-110 transition-transform">
                <Video className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-accent-500 mb-4">Vidéos de qualité</h3>
              <p className="text-accent-600">
                Plus de 100 vidéos HD avec des exercices adaptés à tous les niveaux, 
                du débutant à l&apos;avancé.
              </p>
            </div>

            <div className="text-center p-8 curved-card bg-gradient-to-br from-primary-50 to-secondary-50 hover:shadow-organic transition-all group">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-floating group-hover:scale-110 transition-transform">
                <Music className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-accent-500 mb-4">Méditations guidées</h3>
              <p className="text-accent-600">
                Des séances de méditation et relaxation pour compléter votre pratique 
                et améliorer votre bien-être mental.
              </p>
            </div>

            <div className="text-center p-8 curved-card bg-gradient-to-br from-primary-50 to-secondary-50 hover:shadow-organic transition-all group">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-floating group-hover:scale-110 transition-transform">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-accent-500 mb-4">Séances personnalisées</h3>
              <p className="text-accent-600">
                Réservez des séances individuelles en ligne ou en présentiel 
                pour un accompagnement sur mesure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans & Subscription Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-yellow-50 relative overflow-hidden">
        {/* Background organic shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 organic-shape bg-pink-200/20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 organic-shape-2 bg-yellow-200/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="organic-text-container bg-white/60 backdrop-blur-sm inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-accent-500 mb-4">
                Plans & Abonnements
              </h2>
            </div>
            <p className="text-xl text-accent-600 max-w-3xl mx-auto mt-6">
              Choisissez le plan qui correspond le mieux à vos besoins et à votre style de vie.
            </p>
          </div>

          {/* Personalized Coaching Plans */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-accent-500 mb-8 text-center">
              {pricingPlans.personalized.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.personalized.plans.map((plan, index) => (
                <div key={index} className="curved-card bg-white/80 backdrop-blur-sm p-8 hover:shadow-organic transition-all transform hover:scale-105 border-2 border-pink-200/50">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-accent-500 mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold text-secondary-500">{plan.price}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-accent-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/subscriptions"
                    className="w-full curved-button bg-gradient-to-r from-secondary-500 to-accent-500 text-white font-semibold py-3 px-6 text-center block hover:shadow-floating transition-all"
                  >
                    Choisir ce plan
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Online Autonomy Plans */}
          <div>
            <h3 className="text-2xl font-bold text-accent-500 mb-8 text-center">
              {pricingPlans.online.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.online.plans.map((plan, index) => (
                <div key={index} className="curved-card bg-white/80 backdrop-blur-sm p-8 hover:shadow-organic transition-all transform hover:scale-105 border-2 border-yellow-200/50">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-accent-500 mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold text-secondary-500">{plan.price}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-accent-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/subscriptions"
                    className="w-full curved-button bg-gradient-to-r from-secondary-500 to-accent-500 text-white font-semibold py-3 px-6 text-center block hover:shadow-floating transition-all"
                  >
                    Choisir ce plan
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-elegant-gradient relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-1/4 w-24 h-24 organic-shape bg-white/10 floating-element"></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 organic-shape-2 bg-white/5 floating-element"></div>
        <div className="absolute bottom-10 left-1/3 w-28 h-28 organic-shape-3 bg-white/8 floating-element"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 organic-shape bg-white/12 floating-element"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="organic-text-container bg-white/10 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à transformer votre vie ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Rejoignez des milliers de personnes qui ont déjà découvert les bienfaits du Pilates.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/subscriptions"
              className="curved-button inline-flex items-center justify-center px-8 py-4 bg-white text-accent-500 font-semibold shadow-organic hover:shadow-floating transition-all transform hover:scale-105"
            >
              Commencer l&apos;essai gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/booking"
              className="curved-button inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold bg-white/10 backdrop-blur-sm hover:bg-white hover:text-accent-500 transition-all"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Réserver une séance
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
