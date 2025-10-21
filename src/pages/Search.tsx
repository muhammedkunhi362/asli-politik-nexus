import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/PostCard";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: searchQuery.length > 0,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Search Articles</h1>
            <div className="max-w-2xl relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for articles..."
                className="pl-10 bg-background text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          {!searchQuery ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Enter a search query to find articles.</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Searching...</p>
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Found {posts.length} {posts.length === 1 ? "result" : "results"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
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
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No results found for "{searchQuery}".</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;