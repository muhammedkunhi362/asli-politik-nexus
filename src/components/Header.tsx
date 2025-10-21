import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { categories } from "@/lib/categories";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-primary rounded-lg p-2">
              <h1 className="text-xl font-bold text-primary-foreground">AP</h1>
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Asli Politik
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium transition-colors hover:text-primary">
                Geopolitics
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-lg bg-popover shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {categories.geopolitics.subcategories.map((cat) => (
                    <Link
                      key={cat.value}
                      to={`/category/${cat.value}`}
                      className="block px-4 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-sm font-medium transition-colors hover:text-primary">
                India
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-lg bg-popover shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {categories.india.subcategories.map((cat) => (
                    <Link
                      key={cat.value}
                      to={`/category/${cat.value}`}
                      className="block px-4 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/search" className="text-sm font-medium transition-colors hover:text-primary">
              <Search className="h-5 w-5" />
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
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
          </div>
        )}
      </div>
    </header>
  );
};