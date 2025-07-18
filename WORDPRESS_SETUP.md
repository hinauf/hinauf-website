# WordPress Setup Guide

## Prerequisites
- PHP 8.0 or higher
- MySQL 5.7+ or MariaDB 10.3+
- Web server (Apache/Nginx)
- Composer (for plugin management)

## Local Development Setup

### Option 1: Local Development Environment

1. **Install Local Development Stack**
   ```bash
   # Using XAMPP (Windows/Mac/Linux)
   # Download from https://www.apachefriends.org/

   # Using MAMP (Mac/Windows)
   # Download from https://www.mamp.info/

   # Using Laravel Valet (Mac)
   brew install php
   composer global require laravel/valet
   valet install
   ```

2. **Download WordPress**
   ```bash
   # Navigate to your web directory
   cd /path/to/your/web/directory
   
   # Download WordPress
   wget https://wordpress.org/latest.tar.gz
   tar -xzf latest.tar.gz
   mv wordpress headless-wp
   cd headless-wp
   ```

3. **Create Database**
   ```sql
   CREATE DATABASE wordpress_headless;
   CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'wp_password';
   GRANT ALL PRIVILEGES ON wordpress_headless.* TO 'wp_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Configure WordPress**
   ```bash
   # Copy sample config
   cp wp-config-sample.php wp-config.php
   
   # Edit wp-config.php with your database details
   ```

   Add these configurations to `wp-config.php`:
   ```php
   <?php
   // Database settings
   define('DB_NAME', 'wordpress_headless');
   define('DB_USER', 'wp_user');
   define('DB_PASSWORD', 'wp_password');
   define('DB_HOST', 'localhost');
   define('DB_CHARSET', 'utf8');
   define('DB_COLLATE', '');

   // Enable CORS for headless usage
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);

   // Add authentication keys (generate from https://api.wordpress.org/secret-key/1.1/salt/)
   define('AUTH_KEY',         'your-unique-phrase-here');
   define('SECURE_AUTH_KEY',  'your-unique-phrase-here');
   define('LOGGED_IN_KEY',    'your-unique-phrase-here');
   define('NONCE_KEY',        'your-unique-phrase-here');
   define('AUTH_SALT',        'your-unique-phrase-here');
   define('SECURE_AUTH_SALT', 'your-unique-phrase-here');
   define('LOGGED_IN_SALT',   'your-unique-phrase-here');
   define('NONCE_SALT',       'your-unique-phrase-here');

   $table_prefix = 'wp_';

   if ( ! defined( 'ABSPATH' ) ) {
       define( 'ABSPATH', __DIR__ . '/' );
   }

   require_once ABSPATH . 'wp-settings.php';
   ```

5. **Install WordPress**
   - Visit `http://localhost/headless-wp` in your browser
   - Follow the installation wizard
   - Create admin user account

### Option 2: Using Docker (Alternative)

1. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     wordpress:
       image: wordpress:latest
       ports:
         - "8080:80"
       environment:
         WORDPRESS_DB_HOST: mariadb
         WORDPRESS_DB_NAME: wordpress
         WORDPRESS_DB_USER: wordpress
         WORDPRESS_DB_PASSWORD: wordpress
       volumes:
         - ./wp-content:/var/www/html/wp-content

     mariadb:
       image: mariadb:latest
       environment:
         MYSQL_ROOT_PASSWORD: rootpassword
         MYSQL_DATABASE: wordpress
         MYSQL_USER: wordpress
         MYSQL_PASSWORD: wordpress
       volumes:
         - mariadb_data:/var/lib/mysql

   volumes:
     mariadb_data:
   ```

2. **Run Docker Compose**
   ```bash
   docker-compose up -d
   ```

## WordPress Configuration for Headless CMS

### 1. Install Required Plugins

```bash
# Navigate to your WordPress directory
cd /path/to/wordpress

# Install plugins via WP-CLI (recommended)
wp plugin install wordpress-seo --activate
wp plugin install wp-cors --activate
wp plugin install custom-post-type-ui --activate
wp plugin install advanced-custom-fields --activate
```

### 2. Configure CORS

Add to your theme's `functions.php` or create a custom plugin:

```php
<?php
// Enable CORS for REST API
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
}
add_action('init','add_cors_http_header');

// Handle preflight requests
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: http://localhost:5173');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        return $value;
    });
});
```

### 3. Configure Yoast SEO

1. **Install Yoast SEO Plugin**
   - Go to Plugins → Add New
   - Search for "Yoast SEO"
   - Install and activate

2. **Enable REST API Support**
   - Go to SEO → General → Features
   - Enable "REST API: Head endpoint"

3. **Configure SEO Settings**
   - Go to SEO → General → Your info
   - Set up organization/person details
   - Configure social profiles

### 4. Test API Endpoints

Verify your setup by testing these endpoints:

```bash
# Test basic REST API
curl http://localhost:8080/wp-json/wp/v2/posts

# Test Yoast SEO data
curl http://localhost:8080/wp-json/wp/v2/posts?_embed=1

# Test pages
curl http://localhost:8080/wp-json/wp/v2/pages
```

## Frontend Integration

1. **Copy environment file**
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. **Update environment variables**
   ```env
   VITE_WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Production Deployment

### WordPress (Backend)
1. Deploy WordPress to your hosting provider
2. Configure SSL certificates
3. Update CORS settings to use production domain
4. Configure caching (Redis/Memcached)
5. Set up automated backups

### React App (Frontend)
1. Update `VITE_WORDPRESS_API_URL` to production URL
2. Build production assets: `npm run build`
3. Deploy to hosting service (Vercel, Netlify, etc.)

## Security Considerations

1. **WordPress Security**
   - Keep WordPress and plugins updated
   - Use strong passwords
   - Install security plugins (Wordfence, iThemes Security)
   - Disable file editing in wp-config.php: `define('DISALLOW_FILE_EDIT', true);`

2. **API Security**
   - Use HTTPS in production
   - Implement rate limiting
   - Consider JWT authentication for admin operations
   - Validate CORS origins

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS headers are properly configured
   - Check browser console for specific error messages

2. **API Not Responding**
   - Verify WordPress permalink structure
   - Check .htaccess file permissions
   - Ensure REST API is enabled

3. **Yoast Data Not Appearing**
   - Verify Yoast SEO plugin is active
   - Check REST API endpoint is enabled in Yoast settings
   - Test API endpoint directly

### Performance Optimization

1. **WordPress**
   - Install caching plugins (WP Rocket, W3 Total Cache)
   - Optimize images (WebP format)
   - Use CDN for media files

2. **React App**
   - Implement lazy loading for components
   - Use React Query for API caching
   - Optimize bundle size with code splitting

## Next Steps

After completing this setup:
1. Create content in WordPress admin
2. Test API endpoints
3. Implement React components to display content
4. Configure SEO metadata
5. Add accessibility features
6. Install Tailwind Plus templates