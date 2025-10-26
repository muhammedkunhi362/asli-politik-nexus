import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center">
            <span className="text-3xl font-black" style={{ fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '-0.02em' }}>
              <span style={{ color: '#dc2626' }}>Asli</span>
              <span style={{ color: '#000000' }}>P</span>
            </span>
            <svg className="w-5 h-5" viewBox="0 0 100 100" style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '4px', marginLeft: '-1px', marginRight: '-1px' }}>
              <circle cx="50" cy="50" r="48" fill="#000000"/>
              <circle cx="50" cy="50" r="45" fill="white"/>
              <g stroke="#000000" strokeWidth="3" fill="none">
                <ellipse cx="50" cy="50" rx="28" ry="45"/>
                <ellipse cx="50" cy="50" rx="45" ry="28"/>
                <line x1="5" y1="50" x2="95" y2="50"/>
                <path d="M 50 5 Q 35 50 50 95" fill="none"/>
                <path d="M 50 5 Q 65 50 50 95" fill="none"/>
              </g>
            </svg>
            <span className="text-3xl font-black" style={{ fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '-0.02em', color: '#000000' }}>
              litik
            </span>
          </Link>
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
