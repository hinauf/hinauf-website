# Tailwind Plus Template Installation Guide

This guide will walk you through installing and integrating Tailwind Plus templates into your WordPress headless CMS project.

## Prerequisites

- Tailwind Plus subscription (https://tailwindui.com/)
- Completed WordPress and React setup
- Project running successfully

## Step 1: Access Tailwind Plus

1. Visit https://tailwindui.com/
2. Log in with your Tailwind Plus credentials
3. Navigate to "Templates" section
4. Browse available templates

## Step 2: Choose a Template

### Recommended Templates for WordPress CMS:

1. **Spotlight** - Blog/content-focused template
2. **Salient** - Marketing/business template  
3. **Syntax** - Documentation/technical template
4. **Catalyst** - Application/dashboard template

### Template Selection Criteria:
- Compatible with your content structure
- Matches your design requirements
- Includes components you need (blog posts, pages, navigation)

## Step 3: Download Template

1. Select your chosen template
2. Click "Download" or "Get Template"
3. Extract the downloaded ZIP file
4. Review the template structure

## Step 4: Install Template Dependencies

Most Tailwind Plus templates require additional dependencies:

```bash
cd frontend

# Common dependencies for Tailwind Plus templates
npm install @headlessui/react @heroicons/react clsx

# For templates with forms
npm install @hookform/resolvers react-hook-form yup

# For templates with animations
npm install framer-motion

# For templates with charts/graphs
npm install recharts

# For templates with rich text editing
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
```

## Step 5: Integration Process

### 5.1 Create Template Components Directory

```bash
mkdir -p frontend/src/components/template
```

### 5.2 Copy Template Files

Copy the template components to your project:

```bash
# Example structure after copying
frontend/src/components/template/
├── Header.tsx
├── Footer.tsx
├── Navigation.tsx
├── PostCard.tsx
├── PostList.tsx
├── PageLayout.tsx
└── ...
```

### 5.3 Update Imports

Update component imports to use relative paths:

```typescript
// Before (template file)
import { ChevronRightIcon } from '@heroicons/react/20/solid'

// After (your project)
import { ChevronRightIcon } from '@heroicons/react/20/solid'
```

## Step 6: Adapt Components for WordPress

### 6.1 Replace Static Data with WordPress API

**Before (static data):**
```typescript
const posts = [
  {
    id: 1,
    title: "Static Blog Post",
    excerpt: "This is static content..."
  }
]
```

**After (WordPress integration):**
```typescript
import { useWordPressPosts } from '../../hooks/useWordPress'

const BlogSection = () => {
  const { posts, loading, error } = useWordPressPosts({ per_page: 6 })
  
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

### 6.2 Update PostCard Component

```typescript
import { WordPressPost } from '../../types/wordpress'

interface PostCardProps {
  post: WordPressPost
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <a 
            href={`/post/${post.slug}`}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </h3>
        <time className="text-sm text-gray-500 block mb-3">
          {new Date(post.date).toLocaleDateString()}
        </time>
        <div 
          className="text-gray-700 prose prose-sm"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </div>
    </article>
  )
}
```

### 6.3 Add SEO Integration

```typescript
import { SEOHead } from '../../components/SEOHead'

const BlogPage = () => {
  const { posts, loading, error } = useWordPressPosts()
  
  return (
    <>
      <SEOHead 
        title="Blog - Your Site Name"
        description="Latest blog posts and articles"
      />
      {/* Rest of component */}
    </>
  )
}
```

## Step 7: Update Main App Component

Replace the basic App.tsx with the template structure:

```typescript
import React from 'react'
import { Header } from './components/template/Header'
import { Footer } from './components/template/Footer'
import { BlogSection } from './components/template/BlogSection'
import { SEOHead } from './components/SEOHead'

function App() {
  return (
    <>
      <SEOHead 
        title="Your Site Name"
        description="Your site description"
      />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <BlogSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
```

## Step 8: Configure Routing (Optional)

If your template includes multiple pages, set up React Router:

```bash
npm install react-router-dom @types/react-router-dom
```

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { PostPage } from './pages/PostPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/post/:slug" element={<PostPage />} />
      </Routes>
    </Router>
  )
}
```

## Step 9: Customize Styling

### 9.1 Update Tailwind Config

Add any custom colors or fonts from the template:

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add template-specific colors
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        // Add template fonts
        'display': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

### 9.2 Add Template-Specific Styles

```css
/* frontend/src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import template-specific styles */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Add any custom component styles */
.template-specific-class {
  /* Template customizations */
}
```

## Step 10: Test and Optimize

### 10.1 Test Template Integration

```bash
cd frontend
npm run dev
```

Verify:
- All components render correctly
- WordPress data displays properly
- Navigation works
- SEO tags are present
- Accessibility features function

### 10.2 Performance Optimization

```bash
# Analyze bundle size
npm run build
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/assets/*.js

# Optimize images
npm install imagemin imagemin-webp-webpack-plugin
```

## Step 11: Production Deployment

### 11.1 Build for Production

```bash
npm run build
```

### 11.2 Deploy

```bash
# Vercel
npx vercel

# Netlify
netlify deploy --prod --dir=dist

# Other hosting providers
# Upload dist/ folder contents
```

## Troubleshooting

### Common Issues:

1. **Missing Dependencies**
   ```bash
   # Install missing packages
   npm install [package-name]
   ```

2. **CSS Conflicts**
   - Check Tailwind config
   - Verify PostCSS configuration
   - Clear build cache

3. **Component Errors**
   - Check import paths
   - Verify TypeScript types
   - Update component props

4. **WordPress API Issues**
   - Verify API endpoint
   - Check CORS configuration
   - Test API directly

### Performance Issues:

1. **Large Bundle Size**
   - Use code splitting
   - Lazy load components
   - Remove unused dependencies

2. **Slow API Calls**
   - Implement caching
   - Use React Query
   - Optimize WordPress queries

## Best Practices

1. **Code Organization**
   - Keep template components separate
   - Use consistent naming conventions
   - Document component usage

2. **Accessibility**
   - Maintain WCAG compliance
   - Test with screen readers
   - Verify keyboard navigation

3. **SEO**
   - Ensure meta tags work
   - Test structured data
   - Validate canonical URLs

4. **Performance**
   - Monitor bundle size
   - Optimize images
   - Use proper caching

## Next Steps

After successful template installation:

1. Customize branding and colors
2. Add your specific content
3. Implement additional features
4. Set up analytics
5. Configure monitoring
6. Plan content strategy

## Resources

- [Tailwind Plus Documentation](https://tailwindui.com/documentation)
- [WordPress REST API Reference](https://developer.wordpress.org/rest-api/)
- [React TypeScript Guide](https://react-typescript-cheatsheet.netlify.app/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)