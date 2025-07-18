import { useState, useEffect } from 'react';
import { WordPressPost, WordPressPage } from '../types/wordpress';
import { WordPressService } from '../services/wordpress';

export const useWordPressPosts = (params?: {
  page?: number;
  per_page?: number;
  search?: string;
  categories?: number[];
  tags?: number[];
}) => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await WordPressService.getPosts(params);
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [params?.page, params?.per_page, params?.search, params?.categories, params?.tags]);

  return { posts, loading, error };
};

export const useWordPressPost = (id?: number, slug?: string) => {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id && !slug) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        let fetchedPost: WordPressPost;
        
        if (id) {
          fetchedPost = await WordPressService.getPost(id);
        } else if (slug) {
          fetchedPost = await WordPressService.getPostBySlug(slug);
        } else {
          throw new Error('Either id or slug must be provided');
        }
        
        setPost(fetchedPost);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, slug]);

  return { post, loading, error };
};

export const useWordPressPages = (params?: {
  page?: number;
  per_page?: number;
  search?: string;
  parent?: number;
}) => {
  const [pages, setPages] = useState<WordPressPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const fetchedPages = await WordPressService.getPages(params);
        setPages(fetchedPages);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [params?.page, params?.per_page, params?.search, params?.parent]);

  return { pages, loading, error };
};

export const useWordPressPage = (id?: number, slug?: string) => {
  const [page, setPage] = useState<WordPressPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id && !slug) {
      setLoading(false);
      return;
    }

    const fetchPage = async () => {
      try {
        setLoading(true);
        let fetchedPage: WordPressPage;
        
        if (id) {
          fetchedPage = await WordPressService.getPage(id);
        } else if (slug) {
          fetchedPage = await WordPressService.getPageBySlug(slug);
        } else {
          throw new Error('Either id or slug must be provided');
        }
        
        setPage(fetchedPage);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, slug]);

  return { page, loading, error };
};