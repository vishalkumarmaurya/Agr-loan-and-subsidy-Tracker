import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, DollarSign, BarChart, Tractor } from 'lucide-react';
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="items-center">
      <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-full mb-4">
        <Icon className="w-8 h-8 text-green-600" />
      </div>
      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-green-50 dark:bg-green-900/20 py-20 md:py-32">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-700/40"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white">
              Empowering Farmers, One Click at a Time
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Effortlessly track your agricultural loans and government subsidies with a simple, secure, and farmer-friendly dashboard.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link to="/register">Get Started for Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-20 md:py-28 bg-white dark:bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose ALST?</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                We provide the tools you need to stay on top of your finances, so you can focus on what you do best.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={DollarSign}
                title="Loan Tracking"
                description="Monitor all your active loan applications and amounts in one centralized dashboard."
              />
              <FeatureCard
                icon={BarChart}
                title="Subsidy Overview"
                description="Keep a clear record of all government subsidies you've applied for and received."
              />
              <FeatureCard
                icon={CheckCircle}
                title="Status Updates"
                description="Get instant visibility into the status of each application—Approved, In Review, or Rejected."
              />
              <FeatureCard
                icon={Tractor}
                title="Scheme Discovery"
                description="Browse and discover new financial aid schemes that can help your farm grow."
              />
            </div>
          </div>
        </section>
        {/* Call to Action Section */}
        <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Take Control of Your Farm's Finances?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Join hundreds of farmers who are simplifying their financial management with ALST.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link to="/register">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}