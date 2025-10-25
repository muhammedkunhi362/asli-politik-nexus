import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-black animate-fade-in">
              About Us
            </h1>
            <p className="mt-4 text-lg text-black-200 animate-fade-in">
              Understanding Politics, Geopolitics, and the World Around Us
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            <div className="animate-fade-up">
              <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to <span className="font-bold">AsliPolitik</span> – your trusted source for insightful political analysis and geopolitical commentary. We are dedicated to providing readers with in-depth perspectives on the complex world of politics, both on the global stage and within India's dynamic political landscape.
              </p>
            </div>

            <div className="animate-fade-up-delay-1">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                At AsliPolitik, we believe that informed citizens are the cornerstone of a healthy democracy. Our mission is to cut through the noise and deliver clear, objective analysis on the issues that matter most. We strive to present multiple perspectives, encouraging critical thinking and fostering meaningful dialogue among our readers.
              </p>
            </div>

            <div className="animate-fade-up-delay-2">
              <h2 className="text-3xl font-bold mb-4">What We Cover</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Geopolitics</h3>
                  <p className="leading-relaxed">
                    From international relations to regional conflicts, we analyze how global powers interact and how these dynamics shape our world. Our geopolitical coverage includes topics such as diplomacy, trade wars, security alliances, and emerging power structures.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Indian Politics</h3>
                  <p className="leading-relaxed">
                    We provide comprehensive coverage of India's political landscape, from national elections to policy debates, state politics to parliamentary proceedings. Our analysis helps readers understand the forces shaping India's democratic journey.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Economy & Society</h3>
                  <p className="leading-relaxed">
                    Politics doesn't exist in a vacuum. We examine the intersection of politics with economics, social issues, and cultural trends, providing a holistic view of the forces shaping our societies.
                  </p>
                </div>
              </div>
            </div>

            <div className="animate-fade-up-delay-3">
              <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to journalistic integrity and balanced reporting. While we acknowledge that complete objectivity is an aspiration, we strive to present facts accurately and analyze them fairly. We welcome diverse viewpoints and encourage our readers to form their own informed opinions.
              </p>
            </div>

            <div className="animate-fade-up-delay-4">
              <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                AsliPolitik is more than just a blog – it's a community of engaged citizens who care about understanding the world around them. We encourage you to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Follow us on social media for daily updates and discussions</li>
                <li>Share our articles to spread informed political discourse</li>
                <li>Engage with our content and contribute your perspectives</li>
              </ul>
            </div>

            <div className="animate-fade-up-delay-5 bg-secondary p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
              <p className="text-muted-foreground mb-4">
                Follow us on social media to stay updated with our latest analyses and join the conversation:
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/aslipolitik?igsh=MTRwM2I3ems0ZG40NQ==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg hover:shadow-md transition-all"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg hover:shadow-md transition-all"
                  aria-label="Follow us on X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X (Twitter)
                </a>
              </div>
            </div>

            <div className="animate-fade-up-delay-6 text-center pt-8 border-t">
              <p className="text-muted-foreground italic">
                Thank you for being part of the AsliPolitik community. Together, let's build a more informed and engaged society.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
