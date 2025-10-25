// src/components/SubscriptionForm.tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your Google Apps Script Web App URL
      const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
        }),
      });

      toast.success('Successfully subscribed! Check your inbox.');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white border-2 border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg px-4 py-3 text-sm"
          disabled={isSubmitting}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe Free'}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Join our newsletter for weekly insights and analysis
      </p>
    </div>
  );
};
