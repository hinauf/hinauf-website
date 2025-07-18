import React from 'react';
import { WordPressPost } from '../types/wordpress';
import { SEOHead } from './SEOHead';

interface BlogPostProps {
  post: WordPressPost;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <>
      <SEOHead yoastData={post.yoast_head_json} />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          
          <div className="flex items-center text-gray-600 text-sm">
            <time dateTime={post.date} className="mr-4">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>By Author</span>
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </>
  );
};