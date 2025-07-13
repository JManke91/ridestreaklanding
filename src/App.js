import { useState } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Textarea } from "./components/ui/textarea"
import { Badge } from "./components/ui/badge"
import { Bike, Heart, Target, Smartphone, TrendingUp, Clock, Award, Zap, Check, Star, Mail, X, Code } from "lucide-react"

// Import images
import statisticsImg from "./images/statistics.jpeg"
import workoutDetailsImg from "./images/workout-details.jpeg"
import challengesImg from "./images/challenges.jpeg"
import challengeCreationImg from "./images/challenge-creation.jpeg"

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const handleDownloadClick = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 4000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Development Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-[60] bg-slate-800 border border-[#00D4AA] rounded-lg p-4 shadow-2xl backdrop-blur-sm max-w-sm animate-in slide-in-from-right-full duration-500">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm">App in Entwicklung</h4>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                Die Ride Streak App befindet sich aktuell in der Entwicklung. Der Download wird bald verfügbar sein!
              </p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 bg-[#00D4AA]/20 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-[#00D4AA] rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Ride Streak</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-slate-300 hover:text-[#00D4AA] transition-colors">
                Funktionen
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-[#00D4AA] transition-colors">
                Preise
              </a>
              <a href="#download" className="text-slate-300 hover:text-[#00D4AA] transition-colors">
                Download
              </a>
              <a href="#contact" className="text-slate-300 hover:text-[#00D4AA] transition-colors">
                Kontakt
              </a>
            </nav>

            <div className="flex items-center space-x-4">

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div
                    className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                  ></div>
                  <div
                    className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                  ></div>
                  <div
                    className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                  ></div>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="mt-4 pb-4 border-t border-slate-700/50 pt-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className={`text-slate-300 hover:text-[#00D4AA] transition-all duration-300 py-2 transform ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? '100ms' : '0ms' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Funktionen
                </a>
                <a
                  href="#pricing"
                  className={`text-slate-300 hover:text-[#00D4AA] transition-all duration-300 py-2 transform ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? '200ms' : '0ms' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Preise
                </a>
                <a
                  href="#download"
                  className={`text-slate-300 hover:text-[#00D4AA] transition-all duration-300 py-2 transform ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Download
                </a>
                <a
                  href="#contact"
                  className={`text-slate-300 hover:text-[#00D4AA] transition-all duration-300 py-2 transform ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? '400ms' : '0ms' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Kontakt
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="download" className="py-12 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-[#00D4AA]/20 text-[#00D4AA] border-[#00D4AA]/30 text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Unterstützt von HealthKit
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
              Verfolge Deine
              <span className="bg-gradient-to-r from-[#00D4AA] to-[#00D4AA] bg-clip-text text-transparent">
                {" "}
                Radsport-Reise{" "}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Verwandle dein Radsport-Erlebnis mit intelligenter HealthKit-Integration, personalisierten
              Herausforderungen und umfassenden Trainingsanalysen. Dein ultimativer Radsport-Begleiter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <div className="relative">
                <Button
                  onClick={handleDownloadClick}
                  size="lg"
                  className="bg-gradient-to-r from-[#00D4AA] to-[#00D4AA] hover:from-[#00D4AA] hover:to-[#00D4AA] text-white border-0 px-6 sm:px-8 py-3 w-full sm:w-auto"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Für iOS herunterladen
                </Button>
                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 animate-pulse">
                  Bald verfügbar
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/20 to-[#00D4AA]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src={statisticsImg}
                alt="Statistics Overview"
                width={300}
                height={600}
                className="relative rounded-2xl shadow-2xl mx-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/20 to-[#00D4AA]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src={workoutDetailsImg}
                alt="Workout Details"
                width={300}
                height={600}
                className="relative rounded-2xl shadow-2xl mx-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/20 to-[#00D4AA]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src={challengesImg}
                alt="Active Challenges"
                width={300}
                height={600}
                className="relative rounded-2xl shadow-2xl mx-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4AA]/20 to-[#00D4AA]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src={challengeCreationImg}
                alt="Create Challenge"
                width={300}
                height={600}
                className="relative rounded-2xl shadow-2xl mx-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              Leistungsstarke Funktionen für
              <span className="bg-gradient-to-r from-[#00D4AA] to-[#00D4AA] bg-clip-text text-transparent">
                {" "}
                Radfahrer
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4">
              Alles was du brauchst, um deine Radsport-Leistung zu verfolgen, analysieren und verbessern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">HealthKit-Integration</CardTitle>
                <CardDescription className="text-slate-300">
                  Nahtlose Synchronisation mit iOS HealthKit für umfassende Radsport-Daten inklusive Distanz, Dauer,
                  Geschwindigkeit und Herzfrequenz-Metriken.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Intelligente Analysen</CardTitle>
                <CardDescription className="text-slate-300">
                  Betrachte akkumulierte Distanzen, Trainingsanzahl und detaillierte Leistungsmetriken über anpassbare
                  Zeiträume.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Persönliche Herausforderungen</CardTitle>
                <CardDescription className="text-slate-300">
                  Erstelle individuelle Herausforderungen für tägliche, wöchentliche, monatliche oder jährliche Ziele
                  und verfolge deinen Fortschritt in Echtzeit.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">iOS-Widgets</CardTitle>
                <CardDescription className="text-slate-300">
                  Bleibe motiviert mit Widgets auf einen Blick, die deinen täglichen Fortschritt und wichtige Metriken
                  direkt auf deinem Homescreen anzeigen.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Trainingshistorie</CardTitle>
                <CardDescription className="text-slate-300">
                  Zugriff auf detaillierte Informationen zu jedem aufgezeichneten Training inklusive Streckendaten,
                  Leistungsmetriken und Fortschrittsverfolgung.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Fortschrittsverfolgung</CardTitle>
                <CardDescription className="text-slate-300">
                  Überwache deine Radsport-Reise mit umfassenden Statistiken und visuellen Fortschrittsindikatoren über
                  alle Zeiträume.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              Wähle Deinen
              <span className="bg-gradient-to-r from-[#00D4AA] to-[#00D4AA] bg-clip-text text-transparent"> Plan</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4">
              Starte kostenlos und upgrade, wenn du bereit für erweiterte Funktionen bist
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm relative">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Kostenlos</CardTitle>
                <CardDescription className="text-slate-300">Perfekt für den Einstieg</CardDescription>
                <div className="text-3xl font-bold text-white mt-4">€0</div>
                <div className="text-slate-400">Für immer</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Basis-Trainingsverfolgung
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Bis zu 2 aktive Herausforderungen
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Nur Tages-Widget
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Basis-Trainingsdetails
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Monthly Plan */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm relative">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Monatlich Pro</CardTitle>
                <CardDescription className="text-slate-300">
                  Vollzugriff, monatlich abgerechnet. Verfügbar über In-App-Kauf
                </CardDescription>
                <div className="text-3xl font-bold text-white mt-4">€0.99</div>
                <div className="text-slate-400">pro Monat</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Unbegrenzte Herausforderungen
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Alle Widget-Typen
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Detaillierte Trainingsanalysen
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Erweiterte Fortschrittsverfolgung
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Yearly Plan */}
            <Card className="bg-slate-800/50 border-[#00D4AA] backdrop-blur-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-[#00D4AA] to-[#00D4AA] text-white">
                  <Star className="w-4 h-4 mr-1" />
                  Bester Wert
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-white text-2xl">Jährlich Pro</CardTitle>
                <CardDescription className="text-slate-300">
                  Spare 17% mit jährlicher Abrechnung. Verfügbar über In-App-Kauf
                </CardDescription>
                <div className="text-3xl font-bold text-white mt-4">€9.99</div>
                <div className="text-slate-400">pro Jahr</div>
                <div className="text-sm text-[#00D4AA]">Spare €2,89 jährlich</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Unbegrenzte Herausforderungen
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Alle Widget-Typen
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Detaillierte Trainingsanalysen
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Erweiterte Fortschrittsverfolgung
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Lifetime Plan */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm relative">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Lebenslang Pro</CardTitle>
                <CardDescription className="text-slate-300">
                  Einmaliger Kauf, lebenslanger Zugriff. Verfügbar über In-App-Kauf
                </CardDescription>
                <div className="text-3xl font-bold text-white mt-4">€24.99</div>
                <div className="text-slate-400">einmalig</div>
                <div className="text-sm text-[#00D4AA]">Bester Langzeitwert</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Unbegrenzte Herausforderungen
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Alle Widget-Typen
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Detaillierte Trainingsanalysen
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-[#00D4AA] mr-3" />
                    Lebenslange Updates
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              Kontakt
              <span className="bg-gradient-to-r from-[#00D4AA] to-[#00D4AA] bg-clip-text text-transparent">
                {" "}
                aufnehmen
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4">
              Hast du Fragen oder Feedback? Wir würden gerne von dir hören.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Kontaktinformationen</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">E-Mail</div>
                    <div className="text-slate-300">j.manke@icloud.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Plattform</div>
                    <div className="text-slate-300">iOS App Store</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Sende uns eine Nachricht</CardTitle>
                <CardDescription className="text-slate-300">
                  Wir melden uns so schnell wie möglich bei dir.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" action="mailto:j.manke@icloud.com" method="post" encType="text/plain">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-[#00D4AA]"
                      placeholder="Dein Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      E-Mail
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-[#00D4AA]"
                      placeholder="deine.email@beispiel.de"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">
                      Betreff
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-[#00D4AA]"
                      placeholder="Worum geht es?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Nachricht
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-[#00D4AA] min-h-[120px]"
                      placeholder="Erzähle uns mehr..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#00D4AA] to-[#00D4AA] hover:from-[#00D4AA] hover:to-[#00D4AA] text-white"
                  >
                    Nachricht senden
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8 sm:py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00D4AA] to-[#00D4AA] rounded-lg flex items-center justify-center">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Ride Streak</span>
            </div>
            <div className="text-slate-400 text-center md:text-right">
              <p className="text-sm sm:text-base">&copy; 2025 Ride Streak. Alle Rechte vorbehalten.</p>
              <p className="text-xs sm:text-sm mt-1">Von Radfahrern für Radfahrer gemacht.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
