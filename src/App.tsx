import React from 'react'
import { SEOHead } from './components/SEOHead'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { useWordPressPosts } from './hooks/useWordPress'
import { generateSkipLink } from './utils/accessibility'

function App() {
  const { posts, loading, error } = useWordPressPosts({ per_page: 6 })
  const skipLink = generateSkipLink('main-content')

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h1>
          <p className="text-gray-700">{error}</p>
          <p className="text-sm text-gray-500 mt-2">
            Make sure your WordPress instance is running and accessible.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead 
        title="Headless WordPress + React + Tailwind"
        description="A modern headless CMS solution with WordPress, React, and Tailwind CSS"
      />
      
      <a {...skipLink}>Skip to main content</a>
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to Your
                <span className="block text-yellow-300">Modern Website</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Built with WordPress, React, and Tailwind CSS
              </p>
              <div className="space-x-4">
                <a
                  href="#posts"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
                >
                  View Posts
                </a>
                <a
                  href="/about"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Posts Section */}
          <section id="posts" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Posts</h2>
              <p className="text-lg text-gray-600">
                Discover our latest articles and insights
              </p>
            </div>
            
            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-500 mb-6">
                  Create some posts in your WordPress admin to see them here.
                </p>
                <a
                  href="/wp-admin"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Go to WordPress Admin
                </a>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        <a 
                          href={`/post/${post.slug}`} 
                          className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                      </h3>
                      <time 
                        dateTime={post.date} 
                        className="text-sm text-gray-500 block mb-4"
                      >
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <div 
                        className="text-gray-700 prose prose-sm max-w-none mb-4"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                      <a
                        href={`/post/${post.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read more
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Call to Action */}
          <section className="bg-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Explore our content and discover what we have to offer
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Get in Touch
            </a>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
