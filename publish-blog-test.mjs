// Simple test script to publish blog without relying on import.meta.env
import { createClient } from '@supabase/supabase-js';

// Set environment variables directly
const supabaseUrl = 'https://liysyufshixdxwmdulgb.supabase.co';
const supabaseKey = 'sb_publishable_q6Q8F0hcojceAxywE5Q45w_lkmXWkAK';

const supabase = createClient(supabaseUrl, supabaseKey);

// Blog post data for the second blog: Implementing Row Level Security (RLS) for Supabase Storage in React Applications
const blogData = {
  id: "2a1b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  title: "Implementing Row Level Security (RLS) for Supabase Storage in React Applications",
  slug: "implementing-rls-supabase-storage-react",
  excerpt: "Learn how to secure your Supabase storage buckets with Row Level Security policies to protect user uploads while maintaining a seamless experience in your React applications.",
  content: `# 🔐 Implementing Row Level Security (RLS) for Supabase Storage in React Applications

> **"Security isn't just about keeping bad things out—it's about letting the right things in, at the right time, for the right people."**

## 📋 Introduction: Why RLS Matters for Storage

When building applications that allow users to upload files (profile pictures, documents, media, etc.), securing those uploads is crucial. Supabase Storage provides a powerful solution, but by default, storage buckets are accessible to anyone with the URL. Row Level Security (RLS) policies give you granular control over who can read, write, update, and delete files in your storage buckets.

In my recent work on the React portfolio (commit [3550a24](https://github.com/vedprakash007/react-portfolio/commit/3550a24)), I implemented RLS policies for the uploads bucket to ensure that:
- Users can only upload to their own designated folders
- Users can only read files they have permission to access
- File operations are properly authenticated and authorized
- The system remains performant and easy to use

## 🔧 Setting Up Supabase Storage with RLS

### 1. Creating the Storage Bucket

First, create a storage bucket for user uploads:

\`\`\`sql
-- Insert into storage.buckets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'uploads',
  'uploads',
  true, -- Set to false for completely private buckets
  52428800, -- 50MB limit
  ARRAY['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'text/plain']
);
\`\`\`

### 2. Implementing RLS Policies

The key to secure storage is implementing proper RLS policies. Here's what I implemented for the uploads bucket:

\`\`\`sql
-- Enable RLS on the storage.objects table
alter table storage.objects enable row level security;

-- Policy: Users can insert (upload) files to their own folder
create policy "Users can upload to their own folder"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'uploads' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can select (read) their own files
create policy "Users can read their own files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'uploads' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can update their own files
create policy "Users can update their own files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'uploads' and
  (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'uploads' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can delete their own files
create policy "Users can delete their own files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'uploads' and
  (storage.foldername(name))[1] = auth.uid()::text
);
\`\`\`

### 3. Understanding the Storage Folder Structure

The policies above assume a specific folder structure where each user gets their own top-level folder:

\`\`\`
uploads/
├── user-uuid-1/
│   ├── profile.jpg
│   ├── resume.pdf
│   └── project-screenshot.png
├── user-uuid-2/
│   ├── avatar.png
│   └── document.docx
└── shared/ (optional, for publicly accessible files)
\`\`\`

The \`storage.foldername(name)\` function extracts the first folder segment from the file path, which we use to identify the user's UUID.

## ⚙️ React Implementation: Secure File Uploads

### 1. Setting Up the Supabase Client

First, ensure your Supabase client is properly configured with authentication:

\`\`\`typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
\`\`\`

### 2. Secure File Upload Component

Here's a React component that implements secure file uploads with RLS:

\`\`\`typescript
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface UploadResult {
  success: boolean
  error?: string
  data?: {
    path: string
    url: string
  }
}

export const SecureFileUpload = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Get the current user's session
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('User must be authenticated to upload files')
      }

      // Create a unique file path within the user's folder
      const fileExt = file.name.split('.').pop()
      const fileName = \`\${crypto.randomUUID()}.{\$fileExt}\`
      const filePath = \`\${user.id}/\${fileName}\`

      // Upload the file
      const { data, error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Get the public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from('uploads').getPublicUrl(filePath)

      setSuccess(\`File uploaded successfully! URL: \${publicUrl}\`)
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload')
    } finally {
      setLoading(false)
      e.target.value = '' // Reset input
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.gif,.pdf,.txt"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        disabled={loading}
      />

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          Uploading...
          <div className="h-4 w-4 border-2 border-gray-500 border-t-gray-200 rounded-full animate-spin" />
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">{success}</p>}
    </div>
  )
}
\`\`\`

### 3. Secure File Download/Access

When serving files to users, ensure they can only access files they're permitted to see:

\`\`\`typescript
export const getSecureFileUrl = async (filePath: string): Promise<string | null> => {
  try {
    // Verify the user has access to this file
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    // Check if the file belongs to the current user
    const fileUserId = filePath.split('/')[0]
    if (fileUserId !== user.id) {
      // Optional: Implement shared file logic here
      return null
    }

    // Get the public URL (RLS will still apply on the storage side)
    const {
      data: { publicUrl },
    } = supabase.storage.from('uploads').getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error getting secure file URL:', error)
    return null
  }
}
\`\`\`

## 🛡️ Advanced RLS Policies for Complex Scenarios

### Shared Folders with Access Control

For scenarios where files need to be shared between users (like project collaborations), you can implement more complex policies:

\`\`\`sql
-- Create a shared_files access control table
create table shared_files (
  id uuid primary key default gen_random_uuid(),
  bucket_id text not null,
  file_path text not null,
  user_id uuid references auth.users not null,
  permission_level text check (permission_level in ('read', 'write', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Policy: Users can read files they have been granted access to
create policy "Users can read shared files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'uploads' and
  exists (
    select 1 from shared_files
    where bucket_id = storage.objects.bucket_id
      and file_path = storage.objects.name
      and user_id = auth.uid()
      and permission_level = 'read'
  )
);
\`\`\`

### Public Files with Moderation

For cases where you want to allow certain files to be publicly accessible (like profile pictures or portfolio items):

\`\`\`sql
-- Policy: Public read access for approved files
create policy "Public can read approved files"
on storage.objects for select
to public
using (
  bucket_id = 'uploads' and
  (storage.foldername(name))[1] = 'public' and
  (select is_approved from public_files where file_path = storage.objects.name)
);
\`\`\`

## 🧪 Testing Your RLS Implementation

### 1. Using Supabase Studio SQL Editor

Test your policies directly in the SQL editor:

\`\`\`sql
-- Test as a specific user
set request.jwt.claims ->> 'sub' to '00000000-0000-0000-0000-000000000000';

-- Try to insert a file in another user's folder (should fail)
insert into storage.objects (bucket_id, name, metadata)
values ('uploads', 'wrong-user/test.txt', '{}');

-- Try to insert a file in the correct user's folder (should succeed)
insert into storage.objects (bucket_id, name, metadata)
values ('uploads', '00000000-0000-0000-0000-000000000000/test.txt', '{}');
\`\`\`

### 2. Testing with React Query or SWR

In your React application, test different scenarios:

\`\`\`typescript
// Test upload as authenticated user
const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(\`user-id/\${file.name}\`, file)

  if (error) {
    console.error('Upload failed (expected if not authorized):', error)
    return null
  }

  return data
}

// Test access to another user's file (should fail or return null based on policy)
const accessFile = async (filePath: string) => {
  const { data, error } = await supabase.storage
    .from('uploads')
    .download(filePath)

  if (error) {
    console.log('Access denied (expected):', error.message)
    return null
  }

  return data
}
\`\`\`

## 📊 Performance Considerations

### 1. Policy Efficiency

RLS policies are evaluated for every storage operation, so keep them efficient:

- Use indexed columns in your WHERE clauses when possible
- Avoid complex subqueries in policies
- Consider using security definer functions for complex logic
- Test policies with EXPLAIN ANALYZE to understand performance

### 2. Caching Strategies

While RLS adds a layer of security, it doesn't significantly impact performance for most applications:

- Supabase Storage already uses CDN caching for public assets
- Authentication tokens are cached on the client side
- Policy evaluation happens server-side and is optimized
- Consider implementing client-side caching for frequently accessed files

### 3. Rate Limiting

Combine RLS with rate limiting to prevent abuse:

\`\`\`typescript
// In your upload handler, add rate limiting
const lastUploadTime = localStorage.getItem('lastUploadTime')
const now = Date.now()

if (lastUploadTime && (now - parseInt(lastUploadTime)) < 5000) { // 5 seconds
  throw new Error('Please wait 5 seconds between uploads')
}

localStorage.setItem('lastUploadTime', String(now))
\`\`\`

## 🎯 Best Practices for Secure Storage

### 1. Principle of Least Privilege

Always start with the most restrictive policies and gradually open access as needed:

- Start with no public access
- Grant only the minimum required permissions
- Regularly audit and review your policies
- Use separate buckets for different sensitivity levels

### 2. File Validation

Never rely solely on client-side validation:

- Implement server-side file type validation
- Scan uploaded files for malware when possible
- Enforce file size limits at both client and server levels
- Validate file names to prevent path traversal attacks

### 3. Monitoring and Auditing

Set up monitoring to detect suspicious activity:

\`\`\`sql
-- Create an audit log table for storage operations
create table storage_audit_log (
  id uuid primary key default gen_random_uuid(),
  bucket_id text not null,
  operation text not null, -- INSERT, SELECT, UPDATE, DELETE
  user_id uuid,
  file_path text not null,
  ip_address inet,
  user_agent text,
  success boolean not null,
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a trigger function to log operations
create or replace function log_storage_operation()
returns trigger as $$
begin
  insert into storage_audit_log (
    bucket_id, operation, user_id, file_path,
    ip_address, user_agent, success, error_message
  ) values (
    new.bucket_id,
    tg_op,
    case when current_setting('request.jwt.claims', true) is null
         then null
         else (current_setting('request.jwt.claims', true) ->> 'sub')::uuid
    end,
    new.name,
    inet_client_addr(),
    current_setting('request.user_agent', true),
    tg_op in ('INSERT', 'UPDATE', 'DELETE'),
    case when tg_op = 'DELETE' then null
         else pg_last_sql_error()
    end
  );
  return new;
end;
$$ language plpgsql security definer;

-- Attach the trigger to the storage.objects table
create trigger storage_audit_trigger
after insert or update or delete on storage.objects
for each row execute function log_storage_operation();
\`\`\`

## 🏁 Conclusion & Live Implementation

Implementing Row Level Security for Supabase Storage transforms your file upload system from a potential security vulnerability into a robust, user-controlled feature that:

- ✅ **Protects user privacy** by ensuring users can only access their own files
- ✅ **Maintains usability** with seamless integration into React applications
- ✅ **Scales effectively** from personal projects to enterprise applications
- ✅ **Provides auditability** through comprehensive logging capabilities
- ✅ **Flexibly accommodates** complex sharing and collaboration scenarios

You can see a similar implementation in action in the file upload features of my React portfolio. The RLS policies ensure that even if someone somehow obtained a file URL, they couldn't access it without proper authentication and authorization.

The source code for this implementation is available in:
- [src/lib/supabase.ts](https://github.com/vedprakash007/react-portfolio/blob/main/src/lib/supabase.ts) (Supabase client setup)
- [src/components/upload/](https://github.com/vedprakash007/react-portfolio/tree/main/src/components) (Upload components - check recent commits)
- [supabase/migrations/](https://github.com/vedprakash007/react-portfolio/tree/main/supabase/migrations) (Database migrations including RLS policies)

> **🔒 Security Challenge**: Try implementing RLS for your own Supabase storage buckets. Start with the basic user-isolation approach shown above, then gradually add more complex scenarios like shared folders or public file access as your application requirements evolve. Remember to test thoroughly using both the Supabase SQL editor and your React application!

**What security measures have you implemented for file uploads in your applications?** Share your experiences in the comments below—I'd love to learn from your approaches as well.
  `,
  cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzQ2NzN8MHwxfHNlYXJjaHwxfHxTdG9yYWdlJTIwU2VjdXJpdHl8ZW58MHx8fHwxNjYyNjY4NjQw&ixlib=rb-1.2.1&q=80&w=1080",
  author: "Ved Prakash",
  published_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  is_published: true,
  read_time_minutes: 10
};

async function publishBlog() {
  try {
    const { error } = await supabase
      .from('blogs')
      .upsert(blogData);

    if (error) {
      console.error('Error saving blog:', error);
      return false;
    }

    console.log('Blog post published successfully!');
    return true;
  } catch (error) {
    console.error('Error publishing blog:', error);
    return false;
  }
}

publishBlog().then(success => {
  if (!success) {
    process.exit(1);
  }
});