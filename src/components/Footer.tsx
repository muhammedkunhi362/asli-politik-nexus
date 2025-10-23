import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Anton', 'Impact', 'Bebas Neue', 'Arial Black', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span style={{ color: '#dc2626' }}>Asli</span>
              <span style={{ color: '#000000' }}>Politik</span>
            </span>
            <p className="text-sm text-muted-foreground mt-2">
              Insightful political analysis and geopolitical commentary.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/geopolitics_west" className="text-muted-foreground hover:text-primary transition-colors">
                  Geopolitics
                </Link>
              </li>
              <li>
                <Link to="/category/india_national" className="text-muted-foreground hover:text-primary transition-colors">
                  India
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Asli Politik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
