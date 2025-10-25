import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pagination } from "@/components/Pagination";
import { toast } from "sonner";
import { LogOut, Plus, Edit, Trash2, Upload, Mail, CheckCircle2 } from "lucide-react";
import { getAllCategories, getCategoryLabel, type CategoryValue } from "@/lib/categories";
import { z } from "zod";

const POSTS_PER_PAGE = 10;

// Replace this with your Google Apps Script Web App URL
// Get it from: Extensions → Apps Script → Deploy → Web app URL
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbycH1uVUSg36HCKNdesFoAbajkhsHZNQ_l2AK2HMDcO8qCP91kmC9fhVFEtxUroGAveWQ/exec";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z.string().min(1, "Slug is required").max(200, "Slug too long"),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt too long"),
  content: z.string().min(1, "Content is required"),
  category: z.string(),
  author_name: z.string().min(1, "Author name is required").max(100, "Author name too long"),
  featured_image: z.string().optional(),
});

// Function to send notification via Google Apps Script
const sendNewPostNotification = async (postData: any) => {
  console.log('📧 Attempting to send notification...', {
    url: GOOGLE_APPS_SCRIPT_URL,
    timestamp: new Date().toISOString()
  });

  try {
    const payload = {
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      category: postData.category,
      author_name: postData.author_name,
      featured_image: postData.featured_image || '',
      post_url: `${window.location.origin}/post/${postData.slug}`,
      published_at: new Date().toISOString(),
    };

    console.log('📦 Payload:', JSON.stringify(payload, null, 2));

    // Send request to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('✅ Notification request sent successfully');
    console.log('ℹ️ Note: Due to no-cors mode, response status cannot be verified');
    console.log('ℹ️ Check Google Apps Script execution logs for confirmation');
    
    return { 
      success: true,
      message: 'Notification request sent (check Apps Script logs for confirmation)'
    };
  } catch (error) {
    console.error('❌ Error sending notification:', error);
    throw error;
  }
};

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [lastNotificationStatus, setLastNotificationStatus] = useState<{
    sent: boolean;
    timestamp: string;
  } | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author_name: "Admin",
    featured_image: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: postsData } = useQuery({
    queryKey: ["admin-posts", currentPage],
    queryFn: async () => {
      const from = (currentPage - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from("posts")
        .select("*", { count: "exact" })
        .order("published_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { posts: data || [], totalCount: count || 0 };
    },
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("posts").insert([data]);
      if (error) throw error;
      return data;
    },
    onSuccess: async (postData) => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success("Post created successfully!");
      
      // Send notification to subscribers
      try {
        console.log('🚀 Starting email notification process...');
        const loadingToastId = toast.loading("Sending email notifications to subscribers...");
        
        const result = await sendNewPostNotification(postData);
        
        toast.dismiss(loadingToastId);
        
        if (result.success) {
          setLastNotificationStatus({
            sent: true,
            timestamp: new Date().toISOString()
          });
          toast.success(
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-semibold">Email notifications sent!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Check Google Apps Script logs to verify delivery
                </p>
              </div>
            </div>,
            { duration: 5000 }
          );
        }
      } catch (error) {
        console.error('❌ Notification error:', error);
        setLastNotificationStatus({
          sent: false,
          timestamp: new Date().toISOString()
        });
        toast.error(
          <div>
            <p className="font-semibold">Post created but email notifications failed</p>
            <p className="text-xs text-muted-foreground mt-1">
              Check browser console (F12) and Apps Script logs
            </p>
          </div>,
          { duration: 6000 }
        );
      }
      
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create post");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from("posts").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success("Post updated successfully!");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update post");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success("Post deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete post");
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      author_name: "Admin",
      featured_image: "",
    });
    setEditingPost(null);
    setImageFile(null);
    setImagePreview("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('post-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsUploading(true);
      let imageUrl = formData.featured_image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const validated = postSchema.parse({ ...formData, featured_image: imageUrl });
      
      if (editingPost) {
        updateMutation.mutate({ id: editingPost.id, data: validated });
      } else {
        createMutation.mutate(validated);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to upload image");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author_name: post.author_name,
      featured_image: post.featured_image || "",
    });
    setImagePreview(post.featured_image || "");
    setIsDialogOpen(true);
  };

  const totalPages = Math.ceil((postsData?.totalCount || 0) / POSTS_PER_PAGE);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Email Notification Status Banner */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-blue-900">📧 Email Notifications Setup</p>
              <p className="text-sm text-blue-700 mt-1">
                Google Apps Script URL is configured. When you create a new post, email notifications will be sent to all subscribers.
              </p>
              <div className="mt-2 p-2 bg-white/50 rounded border border-blue-100">
                <p className="text-xs font-mono text-blue-800 break-all">
                  {GOOGLE_APPS_SCRIPT_URL}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <a 
                  href="https://script.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  → Open Apps Script Console
                </a>
                <span className="text-blue-400">|</span>
                <button
                  onClick={() => {
                    console.log('Google Apps Script URL:', GOOGLE_APPS_SCRIPT_URL);
                    console.log('Press F12 to open Developer Console for detailed logs');
                  }}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  → View Console Logs
                </button>
              </div>
              {lastNotificationStatus && (
                <div className="mt-3 p-2 bg-white rounded border border-blue-100">
                  <p className="text-xs text-blue-700">
                    <strong>Last notification:</strong>{' '}
                    {lastNotificationStatus.sent ? '✅ Sent' : '❌ Failed'} at{' '}
                    {new Date(lastNotificationStatus.timestamp).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Setup Instructions Card */}
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center gap-2">
              <span>⚙️</span> Quick Setup Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-amber-800 space-y-2">
            <p><strong>Spreadsheet Structure:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Sheet name: <code className="bg-amber-100 px-1 rounded">Subscribers</code></li>
              <li>Column A: <strong>Name</strong> (e.g., John Doe)</li>
              <li>Column B: <strong>Email</strong> (e.g., john@gmail.com)</li>
              <li>Start data from Row 2 (Row 1 is for headers)</li>
            </ul>
            <p className="mt-3"><strong>Deployment:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Deploy as Web App with "Who has access" set to <strong>Anyone</strong></li>
              <li>Grant all required permissions when prompted</li>
            </ul>
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Manage Posts</h2>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Edit Post" : "Create New Post & Notify Subscribers"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAllCategories().map((cat: { value: string; label: string }) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author Name</Label>
                  <Input
                    id="author"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Featured Image</Label>
                  <div className="space-y-2">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    {imagePreview && (
                      <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Upload an image (max 5MB) or leave empty
                    </p>
                  </div>
                </div>
                
                {!editingPost && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p className="text-xs text-blue-700">
                        <strong>Note:</strong> Creating this post will automatically send email notifications to all subscribers in your Google Sheet.
                      </p>
                    </div>
                  </div>
                )}
                
                <Button type="submit" className="w-full" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : editingPost ? (
                    "Update Post"
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Create Post & Notify Subscribers
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {postsData?.posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getCategoryLabel(post.category as CategoryValue)} • {post.author_name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this post?")) {
                          deleteMutation.mutate(post.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
