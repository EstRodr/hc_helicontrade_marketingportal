# Strapi CMS Setup Guide for HeliconTrade

## 🎯 **Overview**

This guide will help you set up Strapi CMS for managing HeliconTrade marketing site content. We recommend self-hosting on your remote server to keep costs low during development.

---

## 🚀 **Quick Setup Commands**

### **Create New Strapi Project**
```bash
# Create new Strapi project
npx create-strapi-app@latest helicontrade-cms --quickstart

# Or with specific database
npx create-strapi-app@latest helicontrade-cms --dbclient=postgres --dbhost=localhost --dbport=5432 --dbname=helicontrade_cms --dbusername=your_username --dbpassword=your_password
```

### **Development Setup**
```bash
cd helicontrade-cms
npm install
npm run develop
```

---

## 📋 **Content Types to Create**

### **1. Article (Blog Posts)**
```javascript
// Content Type: Article
{
  "title": "Text",
  "slug": "UID (from title)",
  "content": "Rich Text",
  "excerpt": "Text",
  "featured_image": "Media",
  "author": "Text",
  "publish_date": "Date",
  "tags": "JSON",
  "seo": {
    "meta_title": "Text",
    "meta_description": "Text"
  }
}
```

### **2. Landing Page Sections**
```javascript
// Content Type: Landing Section
{
  "section_name": "Text",
  "title": "Text", 
  "subtitle": "Text",
  "content": "Rich Text",
  "cta_text": "Text",
  "cta_link": "Text",
  "background_image": "Media",
  "order": "Number"
}
```

### **3. Features**
```javascript
// Content Type: Feature
{
  "name": "Text",
  "description": "Rich Text",
  "icon": "Media",
  "category": "Enumeration", // ['trading', 'research', 'education']
  "is_core_feature": "Boolean",
  "coming_soon": "Boolean"
}
```

### **4. Team Members**
```javascript
// Content Type: Team Member
{
  "name": "Text",
  "position": "Text",
  "bio": "Rich Text",
  "photo": "Media",
  "linkedin_url": "Text",
  "twitter_url": "Text",
  "order": "Number"
}
```

### **5. Legal Pages**
```javascript
// Content Type: Legal Page
{
  "page_type": "Enumeration", // ['privacy', 'terms', 'cookies', 'user-agreement']
  "title": "Text",
  "content": "Rich Text",
  "last_updated": "Date",
  "version": "Text"
}
```

---

## 🔧 **Configuration Files**

### **Database Configuration (config/database.js)**
```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres', // or 'sqlite' for development
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'helicontrade_cms'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

### **Server Configuration (config/server.js)**
```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
```

---

## 🔐 **Environment Variables**

### **Create .env file:**
```bash
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=helicontrade_cms
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=false

# Security
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
API_TOKEN_SALT=your-api-token-salt
TRANSFER_TOKEN_SALT=your-transfer-token-salt

# CORS (for your marketing site)
CORS_ENABLED=true
CORS_CREDENTIALS=true
CORS_ORIGIN=http://helicontrade.local:3002,https://helicontrade.com
```

---

## 🚀 **Deployment on Your Remote Server**

### **1. Server Prerequisites**
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install PostgreSQL (recommended)
sudo apt-get install postgresql postgresql-contrib
```

### **2. Deploy Strapi**
```bash
# Clone your repository
git clone https://github.com/yourusername/helicontrade-cms.git
cd helicontrade-cms

# Install dependencies
npm install

# Build for production
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### **3. Nginx Configuration**
```nginx
server {
    listen 80;
    server_name cms.helicontrade.com;
    
    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔗 **Integration with Marketing Site**

### **Update Marketing Site .env**
```bash
# Add to your marketing site .env
NUXT_PUBLIC_STRAPI_URL=https://cms.helicontrade.com
NUXT_PUBLIC_STRAPI_TOKEN=your-api-token-from-strapi
```

### **Example API Usage in Nuxt**
```javascript
// composables/useStrapi.js
export const useStrapi = () => {
  const config = useRuntimeConfig()
  
  const fetchArticles = async () => {
    const { data } = await $fetch(`${config.public.strapiUrl}/api/articles`, {
      headers: {
        'Authorization': `Bearer ${config.public.strapiToken}`
      }
    })
    return data
  }
  
  const fetchLandingSections = async () => {
    const { data } = await $fetch(`${config.public.strapiUrl}/api/landing-sections`, {
      params: { sort: 'order:asc' },
      headers: {
        'Authorization': `Bearer ${config.public.strapiToken}`
      }
    })
    return data
  }
  
  return {
    fetchArticles,
    fetchLandingSections
  }
}
```

---

## 📊 **Cost Comparison**

### **Self-Hosted (Recommended for Start)**
- **Server Cost**: $20-50/month (your existing server)
- **Maintenance**: Your time
- **Total**: $20-50/month

### **Strapi Cloud**
- **Starter Plan**: $99/month
- **Pro Plan**: $399/month
- **Maintenance**: Included
- **Total**: $99+/month

**Recommendation**: Start self-hosted, migrate to Strapi Cloud when revenue scales.

---

## 🎯 **Next Steps**

1. **Create Repository**: `helicontrade-cms`
2. **Set Up Locally**: Test content types and API
3. **Deploy to Server**: Use your remote server
4. **Integrate**: Update marketing site to fetch from Strapi
5. **Content Creation**: Start adding blog posts and page content

This setup will give you a powerful, scalable CMS that grows with your business! 🚀
