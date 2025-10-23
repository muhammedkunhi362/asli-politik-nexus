import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

const POSTS_PER_PAGE = 9;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
        <section className="bg-gradient-hero py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-serif font-bold text-black animate-fade-in">
              Insightful Political Analysis &<br />
              Geopolitical Commentary
            </h1>
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
                {postsData.posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    featuredImage={post.featured_image || undefined}
                    category={post.category}
                    authorName={post.author_name}
                    publishedAt={post.published_at}
                  />
                ))}
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