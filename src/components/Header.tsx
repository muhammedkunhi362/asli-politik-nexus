import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { categories } from "@/lib/categories";
import { Moon, Sun } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Anton', 'Impact', 'Bebas Neue', 'Arial Black', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span style={{ color: '#dc2626' }}>Asli</span>
              <span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Politik</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-sm font-sans transition-colors hover:text-foreground text-muted-foreground">
                Geopolitics
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md bg-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-border">
                <div className="p-2">
                  {categories.geopolitics.subcategories.map((cat) => (
                    <Link
                      key={cat.value}
                      to={`/category/${cat.value}`}
                      className="block px-4 py-2 text-sm rounded-md hover:bg-secondary transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-sm font-sans transition-colors hover:text-foreground text-muted-foreground">
                India
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md bg-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-border">
                <div className="p-2">
                  {categories.india.subcategories.map((cat) => (
                    <Link
                      key={cat.value}
                      to={`/category/${cat.value}`}
                      className="block px-4 py-2 text-sm rounded-md hover:bg-secondary transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/search" className="text-sm font-sans transition-colors hover:text-foreground text-muted-foreground">
              Search
            </Link>
            <Button 
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full p-2 hover:bg-secondary"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`text-xl transition-transform duration-300 inline-block ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
              {isMenuOpen ? "✕" : "☰"}
            </span>
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border animate-fade-in">
            <div className="animate-fade-up">
              <p className="text-sm font-bold text-muted-foreground mb-2">Geopolitics</p>
              {categories.geopolitics.subcategories.map((cat) => (
                <Link
                  key={cat.value}
                  to={`/category/${cat.value}`}
                  className="block text-sm py-2 pl-4 hover:bg-secondary transition-colors rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <div className="animate-fade-up-delay-1">
              <p className="text-sm font-bold text-muted-foreground mb-2">India</p>
              {categories.india.subcategories.map((cat) => (
                <Link
                  key={cat.value}
                  to={`/category/${cat.value}`}
                  className="block text-sm py-2 pl-4 hover:bg-secondary transition-colors rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <Link
              to="/search"
              className="block text-sm font-medium py-2 hover:bg-secondary transition-colors rounded-md animate-fade-up-delay-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            <Button 
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="w-full rounded-full transition-all animate-fade-up-delay-3 flex items-center justify-center gap-2"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-5 w-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
