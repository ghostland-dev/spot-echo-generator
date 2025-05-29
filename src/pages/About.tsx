
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Heart, Users, Globe, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">À propos de Febspot</h1>
            
            {/* Hero section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-4">Connectez-vous avec le monde</h2>
              <p className="text-lg opacity-90">
                Febspot est la plateforme sociale qui vous permet de partager vos moments, 
                de découvrir des contenus inspirants et de rester connecté avec vos proches.
              </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-900">2.8M+</h3>
                <p className="text-gray-600">Utilisateurs actifs</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-900">15M+</h3>
                <p className="text-gray-600">Publications partagées</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-900">190+</h3>
                <p className="text-gray-600">Pays</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-900">99.9%</h3>
                <p className="text-gray-600">Temps de disponibilité</p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chez Febspot, nous croyons que les connexions humaines authentiques sont essentielles 
                pour construire un monde meilleur. Notre mission est de créer une plateforme inclusive 
                et sécurisée où chacun peut s'exprimer librement, partager ses passions et 
                découvrir de nouvelles perspectives.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nous nous engageons à protéger la vie privée de nos utilisateurs tout en offrant 
                des outils innovants pour faciliter les échanges et la collaboration entre les communautés.
              </p>
            </div>

            {/* Valeurs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos Valeurs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Authenticité</h3>
                  <p className="text-gray-700">
                    Nous encourageons chacun à être authentique et à partager sa véritable personnalité.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Respect</h3>
                  <p className="text-gray-700">
                    Le respect mutuel est la base de toutes les interactions sur notre plateforme.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-gray-700">
                    Nous repoussons constamment les limites pour améliorer l'expérience utilisateur.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sécurité</h3>
                  <p className="text-gray-700">
                    La protection des données et la sécurité de nos utilisateurs sont nos priorités.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
              <p className="text-gray-700 mb-4">
                Une question ? Une suggestion ? Notre équipe est là pour vous aider.
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> contact@febspot.com
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Téléphone:</span> +33 1 23 45 67 89
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Adresse:</span> 123 Rue de la Innovation, 75001 Paris, France
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;
