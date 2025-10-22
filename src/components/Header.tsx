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
            <span className="text-2xl font-serif font-bold text-foreground">Asli Politik</span>
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
              size="sm"
              className="bg-foreground text-background hover:bg-primary rounded-full px-4 font-sans"
            >
              Get started
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-xl">{isMenuOpen ? "✕" : "☰"}</span>
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <div>
              <p className="text-sm font-bold text-muted-foreground mb-2">Geopolitics</p>
              {categories.geopolitics.subcategories.map((cat) => (
                <Link
                  key={cat.value}
                  to={`/category/${cat.value}`}
                  className="block text-sm py-2 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground mb-2">India</p>
              {categories.india.subcategories.map((cat) => (
                <Link
                  key={cat.value}
                  to={`/category/${cat.value}`}
                  className="block text-sm py-2 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <Link
              to="/search"
              className="block text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            <Button 
              size="sm"
              className="w-full bg-foreground text-background hover:bg-primary rounded-full"
            >
              Get started
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};