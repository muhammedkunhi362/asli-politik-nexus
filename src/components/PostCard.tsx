import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { getCategoryLabel, type CategoryValue } from "@/lib/categories";
import { format } from "date-fns";

interface PostCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: CategoryValue;
  authorName: string;
  publishedAt: string;
}

export const PostCard = ({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  authorName,
  publishedAt,
}: PostCardProps) => {
  return (
    <Link
      to={`/post/${slug}`}
      className="block group"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02] h-80">
        {featuredImage && (
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <Badge className="mb-2 bg-primary text-primary-foreground">
            {getCategoryLabel(category)}
          </Badge>
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-white/90 text-sm mb-3 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center gap-3 text-white/80 text-xs">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {authorName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(publishedAt), "MMM dd, yyyy")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};