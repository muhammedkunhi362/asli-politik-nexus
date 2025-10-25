// src/pages/Home.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const POSTS_PER_PAGE = 9;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const { data: postsData, isLoading } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => {
      const from = (currentPage - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from("posts")
        .select("*", { count: "exact" })
        .order("published_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        posts: data || [],
        totalCount: count || 0,
      };
    },
  });

  const totalPages = Math.ceil((postsData?.totalCount || 0) / POSTS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-serif font-bold text-black animate-fade-in">
              Insightful Political Analysis &<br />
              Geopolitical Commentary
            </h1>
            <p className="mt-4 text-base md:text-lg text-black-200 max-w-3xl animate-fade-in">
              More than just politics! We discuss everything. From Geopolitics to regional political dynamics, Economy, Society and so on. Stay Informed and Build your perspective. Follow us and Join Our Community.
            </p>
            <div className="flex items-center gap-4 mt-3 animate-fade-in">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
                aria-label="Follow us on X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            
            {/* Subscribe Button */}
            <div className="flex justify-center mt-8 animate-fade-in">
              <Button
                onClick={() => navigate('/subscribe')}
                className="bg-transparent hover:bg-black/5 text-gray-700 font-normal font-sans px-8 py-6 rounded-lg text-lg border border-gray-400 transition-all hover:shadow-md hover:scale-105 hover:border-gray-600"
              >
                Subscribe for Free
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : postsData?.posts && postsData.posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postsData.posts.map((post, index) => {
                  const delays = [
                    'animate-fade-up',
                    'animate-fade-up-delay-1',
                    'animate-fade-up-delay-2',
                    'animate-fade-up-delay-3',
                    'animate-fade-up-delay-4',
                    'animate-fade-up-delay-5',
                    'animate-fade-up-delay-6',
                    'animate-fade-up-delay-7',
                    'animate-fade-up-delay-8',
                  ];
                  return (
                    <div
                      key={post.id}
                      className={`opacity-0 ${delays[index % 9]}`}
                    >
                      <PostCard
                        id={post.id}
                        title={post.title}
                        slug={post.slug}
                        excerpt={post.excerpt}
                        featuredImage={post.featured_image || undefined}
                        category={post.category}
                        authorName={post.author_name}
                        publishedAt={post.published_at}
                      />
                    </div>
                  );
                })}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts available yet.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
