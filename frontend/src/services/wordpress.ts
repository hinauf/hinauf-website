import axios from 'axios';
import { WordPressPost, WordPressPage, WordPressMedia } from '../types/wordpress';

const API_BASE_URL = process.env.VITE_WORDPRESS_API_URL || 'http://localhost:8080/wp-json/wp/v2';

const wpApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class WordPressService {
  static async getPosts(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    categories?: number[];
    tags?: number[];
    orderby?: 'date' | 'title' | 'menu_order';
    order?: 'asc' | 'desc';
  }): Promise<WordPressPost[]> {
    try {
      const response = await wpApi.get('/posts', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  static async getPost(id: number): Promise<WordPressPost> {
    try {
      const response = await wpApi.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  static async getPostBySlug(slug: string): Promise<WordPressPost> {
    try {
      const response = await wpApi.get(`/posts`, { params: { slug } });
      if (response.data.length === 0) {
        throw new Error('Post not found');
      }
      return response.data[0];
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      throw error;
    }
  }

  static async getPages(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    parent?: number;
    orderby?: 'date' | 'title' | 'menu_order';
    order?: 'asc' | 'desc';
  }): Promise<WordPressPage[]> {
    try {
      const response = await wpApi.get('/pages', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  }

  static async getPage(id: number): Promise<WordPressPage> {
    try {
      const response = await wpApi.get(`/pages/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  }

  static async getPageBySlug(slug: string): Promise<WordPressPage> {
    try {
      const response = await wpApi.get(`/pages`, { params: { slug } });
      if (response.data.length === 0) {
        throw new Error('Page not found');
      }
      return response.data[0];
    } catch (error) {
      console.error('Error fetching page by slug:', error);
      throw error;
    }
  }

  static async getMedia(id: number): Promise<WordPressMedia> {
    try {
      const response = await wpApi.get(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching media:', error);
      throw error;
    }
  }

  static async getCategories(): Promise<any[]> {
    try {
      const response = await wpApi.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  static async getTags(): Promise<any[]> {
    try {
      const response = await wpApi.get('/tags');
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }
}