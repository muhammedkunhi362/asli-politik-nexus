// src/pages/Subscribe.tsx
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle2, Mail, TrendingUp, Globe, Users } from 'lucide-react';

const Subscribe = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || name.trim().length < 2) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbx9wZP0XP0kUFc9f278sR-Yx6UpINMFBHAxRV8GoeI0MW1GvIxrtn1t8KYMTzOaBjmAog/exec';
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          timestamp: new Date().toISOString(),
        }),
      });

      toast.success('Successfully subscribed! Welcome to Asli Politik!');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-6 animate-fade-in">
                Subscribe to Asli Politik
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in">
                Get weekly insights on geopolitics, political analysis, and in-depth commentary delivered straight to your inbox.
              </p>
            </div>
          </div>
        </section>

        {/* Subscription Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12 animate-fade-up">
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-accent/10 p-4 rounded-full">
                    <Mail className="w-12 h-12 text-accent" />
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                  Join Our Newsletter
                </h2>
                <p className="text-center text-muted-foreground mb-8">
                  Subscribe for free and never miss an update
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background border-2 border-input focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg px-4 py-3 text-base"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border-2 border-input focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg px-4 py-3 text-base"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-6 rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe for Free'}
                  </Button>
                </form>

                <p className="text-xs text-center text-muted-foreground mt-6">
                  By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                What You'll Get
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex gap-4 animate-fade-up">
                  <div className="flex-shrink-0">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Weekly Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      In-depth political and geopolitical analysis delivered every week
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 animate-fade-up-delay-1">
                  <div className="flex-shrink-0">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Globe className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Global Perspectives
                    </h3>
                    <p className="text-muted-foreground">
                      Coverage of international affairs and regional dynamics
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 animate-fade-up-delay-2">
                  <div className="flex-shrink-0">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Expert Commentary
                    </h3>
                    <p className="text-muted-foreground">
                      Insights from political analysts and subject matter experts
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 animate-fade-up-delay-3">
                  <div className="flex-shrink-0">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Exclusive Content
                    </h3>
                    <p className="text-muted-foreground">
                      Early access to articles and special reports for subscribers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Subscribe;
