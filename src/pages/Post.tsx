import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User } from "lucide-react";
import { getCategoryLabel, type CategoryValue } from "@/lib/categories";
import { format } from "date-fns";

const Post = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {isLoading ? (
          <article className="container mx-auto px-4 py-12 max-w-4xl">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <Skeleton className="h-96 w-full mb-8" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </article>
        ) : post ? (
          <article className="container mx-auto px-4 py-12 max-w-4xl">
            <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent/90">
              {getCategoryLabel(post.category as CategoryValue)}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {post.author_name}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {format(new Date(post.published_at), "MMMM dd, yyyy")}
              </span>
            </div>
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg mb-8 shadow-md"
              />
            )}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
              <div className="whitespace-pre-wrap">{post.content}</div>
            </div>
          </article>
        ) : (
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground">The post you're looking for doesn't exist.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Post;