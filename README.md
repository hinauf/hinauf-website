# Headless WordPress + React + Tailwind CSS Project

A modern, SEO-optimized, and accessible website built with WordPress as a headless CMS, React with TypeScript, and Tailwind CSS 4.1.

## Features

- **Headless WordPress CMS**: WordPress backend with REST API
- **React + TypeScript**: Modern frontend with type safety
- **Tailwind CSS 4.1**: Utility-first CSS framework
- **SEO Optimized**: Yoast SEO integration with meta tags
- **Accessible**: WCAG 2.2 compliant with screen reader support
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized loading and caching

## Project Structure

```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   └── SEOHead.tsx   # SEO metadata component
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useWordPress.ts
│   │   ├── services/         # API services
│   │   │   └── wordpress.ts
│   │   ├── types/            # TypeScript types
│   │   │   └── wordpress.ts
│   │   └── utils/            # Utility functions
│   │       └── accessibility.ts
│   ├── .env.example          # Environment variables template
│   └── package.json
├── WORDPRESS_SETUP.md        # WordPress installation guide
└── README.md                 # This file
```

## Quick Start

### 1. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 2. WordPress Setup

Follow the detailed guide in `WORDPRESS_SETUP.md` to set up WordPress with:
- MariaDB database
- Yoast SEO plugin
- CORS configuration
- REST API endpoints

### 3. Environment Configuration

Update `frontend/.env` with your WordPress API URL:

```env
VITE_WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### API Integration

The project includes pre-built services for WordPress REST API:

- `WordPressService.getPosts()` - Fetch blog posts
- `WordPressService.getPages()` - Fetch pages
- `WordPressService.getMedia()` - Fetch media files

### SEO Features

- Yoast SEO metadata integration
- Open Graph tags
- Twitter Card support
- JSON-LD structured data
- Canonical URLs

### Accessibility Features

- WCAG 2.2 compliant
- Screen reader support
- Keyboard navigation
- Focus management
- Skip links
- Semantic HTML

## Tailwind Plus Integration

Once your project is set up, follow these steps to install a Tailwind Plus template:

1. **Access Tailwind Plus**
   - Visit https://tailwindui.com/
   - Log in with your Tailwind Plus account

2. **Choose a Template**
   - Browse application templates
   - Select a template that fits your needs
   - Download the template files

3. **Install Template**
   - Extract template files to `frontend/src/components/`
   - Install any additional dependencies
   - Update routing and API integration

4. **Customize**
   - Replace placeholder content with WordPress data
   - Update colors and branding
   - Add your specific functionality

## Deployment

### WordPress (Backend)

1. Deploy to hosting provider (WP Engine, Kinsta, etc.)
2. Configure SSL certificates
3. Install and configure plugins
4. Set up database

### React App (Frontend)

1. Update API URL in environment variables
2. Build production bundle: `npm run build`
3. Deploy to hosting service:
   - Vercel: `npx vercel`
   - Netlify: `npm run build && netlify deploy`
   - GitHub Pages: Configure build workflow

## Performance Optimization

### WordPress
- Use caching plugins (WP Rocket, W3 Total Cache)
- Optimize images (WebP format)
- CDN for media files
- Database optimization

### React App
- Code splitting with React.lazy()
- Image optimization
- Bundle analysis
- React Query for API caching

## Security

- HTTPS in production
- WordPress security plugins
- CORS configuration
- Input validation
- Regular updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the WordPress setup guide
2. Review the troubleshooting section
3. Open an issue on GitHub