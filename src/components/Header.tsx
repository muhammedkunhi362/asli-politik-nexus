import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { categories } from "@/lib/categories";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "Montserrat, letterSpacing: '0.05em' }}>
              <span style={{ color: '#dc2626' }}>ASLI</span>
              <span style={{ color: '#000000' }}>POLITIK</span>
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
            <Link to="/about" className="text-sm font-sans transition-colors hover:text-foreground text-muted-foreground">
              About Us
            </Link>
            <Link to="/search" className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border hover:border-foreground transition-colors">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-sans text-muted-foreground">Search</span>
            </Link>
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
              to="/about"
              className="block text-sm font-medium py-2 hover:bg-secondary transition-colors rounded-md animate-fade-up-delay-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link to="/search" className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border hover:border-foreground transition-colors">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-sans text-muted-foreground">Search</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
