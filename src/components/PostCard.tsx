import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
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
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <Link to={`/post/${slug}`}>
        {featuredImage && (
          <div className="overflow-hidden h-48">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          <Badge className="w-fit mb-2 bg-accent text-accent-foreground hover:bg-accent/90">
            {getCategoryLabel(category)}
          </Badge>
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {authorName}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {format(new Date(publishedAt), "MMM dd, yyyy")}
          </span>
        </CardFooter>
      </Link>
    </Card>
  );
};