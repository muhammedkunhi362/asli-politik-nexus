-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('post-images', 'post-images', true);

-- Create policies for post image uploads
CREATE POLICY "Post images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'post-images');

CREATE POLICY "Authenticated users can upload post images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'post-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update post images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'post-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete post images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'post-images' AND auth.role() = 'authenticated');