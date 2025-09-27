import { Hero, Features, HowItWorks, CallToAction } from '@/components/home'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </div>
  )
}
