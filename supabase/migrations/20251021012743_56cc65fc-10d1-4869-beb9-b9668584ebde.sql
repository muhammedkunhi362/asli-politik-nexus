-- Create enum for post categories
CREATE TYPE category_type AS ENUM (
  'geopolitics_west',
  'geopolitics_latin_america',
  'geopolitics_africa',
  'geopolitics_middle_east',
  'geopolitics_asia_major',
  'geopolitics_south_asia',
  'geopolitics_central_east_asia',
  'geopolitics_southeast_asia',
  'india_national',
  'india_regional'
);

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  category category_type NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Admin',
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Posts are viewable by everyone"
ON public.posts
FOR SELECT
USING (true);

-- Create policy for authenticated users to insert posts
CREATE POLICY "Authenticated users can create posts"
ON public.posts
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy for authenticated users to update posts
CREATE POLICY "Authenticated users can update posts"
ON public.posts
FOR UPDATE
TO authenticated
USING (true);

-- Create policy for authenticated users to delete posts
CREATE POLICY "Authenticated users can delete posts"
ON public.posts
FOR DELETE
TO authenticated
USING (true);

-- Create index on category for faster filtering
CREATE INDEX idx_posts_category ON public.posts(category);

-- Create index on slug for faster single post lookups
CREATE INDEX idx_posts_slug ON public.posts(slug);

-- Create index on published_at for sorting
CREATE INDEX idx_posts_published_at ON public.posts(published_at DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();