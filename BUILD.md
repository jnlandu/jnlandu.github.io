# 🚀 AI Engineer Website - Build & Deployment Guide

## Quick Start

```bash
# Clone and setup
git clone https://github.com/jnlandu/jnlandu.github.io.git
cd jnlandu.github.io

# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve --livereload

# Visit http://localhost:4000
```

## 🎯 Website Overview

This Jekyll website has been completely rebuilt as a modern AI engineer portfolio featuring:

### ✨ New Features
- **Modern AI-focused Design**: Professional dark theme with AI color palette
- **Interactive Homepage**: Animated hero section with floating elements
- **Project Showcase**: Dedicated layouts for AI/ML projects
- **Responsive Design**: Mobile-first approach with advanced CSS Grid/Flexbox
- **Performance Optimized**: Fast loading with lazy loading and code splitting
- **SEO Enhanced**: Structured data and meta tags for better search visibility

### 🎨 Design System
- **Color Palette**: AI-focused blues, purples, and accent colors
- **Typography**: Inter font family for modern, readable text
- **Components**: Reusable card components, buttons, and layouts
- **Animations**: Smooth transitions and hover effects

### 📁 Updated Structure
```
├── _layouts/
│   ├── home.html           # New AI-focused homepage
│   ├── project.html        # Project showcase layout
│   └── default.html        # Updated base layout
├── assets/
│   ├── css/
│   │   ├── ai-homepage.css # New AI-themed styles
│   │   └── custom/         # Updated custom styles
│   └── js/
│       ├── homepage.js     # Interactive homepage features
│       └── main.js         # Core JavaScript
├── _projects/              # AI/ML project showcases
├── _posts/                 # AI-focused blog posts
└── _config.yml            # Updated configuration
```

## 🔧 Configuration

### Site Settings (`_config.yml`)
```yaml
title: Jeremie Nlandu Mabiala - AI Engineer
description: AI Master's student specializing in ML, DL, and mathematical modeling
email: jeremie@aims.ac.za
url: "https://jnlandu.github.io"

# Professional details
profession:
  current_role: AI Master's Student
  institution: AIMS Senegal
  program: African Master in Machine Intelligence (AMMI)

# AI specializations
specializations:
  - name: Machine Learning
    level: advanced
    tools: [Python, PyTorch, TensorFlow, Scikit-learn]
  - name: Computer Vision
    level: intermediate
    tools: [OpenCV, PIL, Matplotlib]
  - name: Natural Language Processing
    level: intermediate
    tools: [NLTK, spaCy, Transformers]
  - name: Mathematical Modeling
    level: advanced
    tools: [NumPy, SciPy, R]
```

### Navigation Structure
```yaml
header_pages:
  - index.md
  - about.md
  - research.md
  - projects.md
  - blog.md
  - courses.md
  - contact.md
```

## 📝 Content Management

### Adding Projects
Create new project files in `_projects/` with this format:

```yaml
---
layout: project
title: "Your AI Project Title"
date: 2024-01-15
categories: [AI, Machine Learning, Computer Vision]
tags: [PyTorch, Python, Deep Learning]
technologies: [Python, PyTorch, OpenCV, NumPy]
featured: true
github: "https://github.com/jnlandu/project-repo"
image: "/assets/images/projects/project-image.jpg"
excerpt: "Brief description of your AI project"
---

# Project content in Markdown
```

### Adding Blog Posts
Create new posts in `_posts/` following the naming convention:
`YYYY-MM-DD-title.md`

```yaml
---
layout: post
title: "Your AI Blog Post Title"
date: 2024-01-15
categories: [AI, Machine Learning, Deep Learning]
tags: [Artificial Intelligence, Technology, Research]
author: Jeremie Nlandu Mabiala
excerpt: "Brief post description"
toc: true
---

# Post content in Markdown
```

### Course Materials
Add course content to `_courses/` directory:

```yaml
---
layout: course-default
title: "Course Name"
icon: "🎓"
description: "Course description"
---

# Course content
```

## 🎨 Customization

### Colors & Branding
Edit colors in `assets/css/custom/custom.css`:

```css
:root {
  --brand-color: #2563eb;        /* AI Primary Blue */
  --brand-color-light: #3b82f6;  /* Light Blue */
  --brand-color-dark: #1d4ed8;   /* Dark Blue */
  --ai-secondary: #7c3aed;       /* Purple */
  --ai-accent: #06b6d4;          /* Cyan */
  
  /* Dark theme colors */
  --bg-light-black: #0f172a;
  --bg-light-black-secondary: #1e293b;
  --text-white: #f8fafc;
}
```

### Homepage Sections
The homepage consists of several sections you can customize:

1. **Hero Section**: Update personal info in `_config.yml`
2. **Specializations**: Edit the `specializations` array in config
3. **Featured Projects**: Add `featured: true` to project front matter
4. **Blog Posts**: Recent posts are automatically displayed
5. **Contact**: Update social links in config

### Fonts & Typography
The site uses Inter font family. To change fonts, update the imports in `custom.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
```

## 🚀 Deployment

### GitHub Pages (Automatic)
1. Push changes to the `main` branch
2. GitHub Pages will automatically build and deploy
3. Visit `https://jnlandu.github.io`

### Manual Deployment
```bash
# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# The site will be generated in _site/
# Upload contents to your web server
```

### Development Commands
```bash
# Development server with live reload
bundle exec jekyll serve --livereload

# Build only
bundle exec jekyll build

# Clean build files
bundle exec jekyll clean

# Include drafts
bundle exec jekyll serve --drafts

# Custom port
bundle exec jekyll serve --port 4001
```

## 📊 Performance & SEO

### Optimization Features
- **Image Optimization**: WebP support with fallbacks
- **CSS Minification**: Compressed stylesheets in production
- **JavaScript Loading**: Deferred script loading
- **Lazy Loading**: Images load on scroll
- **Caching**: Browser caching headers

### SEO Features
- **Meta Tags**: Comprehensive meta tag system
- **Structured Data**: JSON-LD markup for rich snippets
- **Open Graph**: Social media sharing optimization
- **Sitemap**: Auto-generated XML sitemap
- **RSS Feed**: Blog post syndication

### Analytics
The site includes Google Analytics integration. Update the tracking ID in `_config.yml`:

```yaml
google_analytics: YOUR_GA_TRACKING_ID
```

## 🔧 Troubleshooting

### Common Issues

**Bundle install fails:**
```bash
# Update RubyGems
gem update --system
gem install bundler
bundle install
```

**Jekyll serve fails:**
```bash
# Clean and rebuild
bundle exec jekyll clean
bundle exec jekyll serve
```

**Styles not loading:**
- Check that `custom.css` imports are correct
- Verify SCSS compilation in `_sass/` directory
- Clear browser cache

**Images not displaying:**
- Ensure images are in `assets/images/`
- Check file paths in Markdown
- Verify image file extensions

### Performance Issues
```bash
# Profile build time
bundle exec jekyll build --profile

# Check for large files
find _site -type f -size +1M

# Optimize images
# Use tools like ImageOptim or online compressors
```

## 📱 Browser Support

The website supports:
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🤝 Contributing

To contribute to the website:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** and test locally
4. **Commit changes**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines
- Test all changes locally before committing
- Follow existing code style and structure
- Update documentation for new features
- Optimize images before adding them
- Test responsive design on multiple devices

## 📞 Support

For questions or support:
- **Email**: [jeremie@aims.ac.za](mailto:jeremie@aims.ac.za)
- **GitHub Issues**: [Create an issue](https://github.com/jnlandu/jnlandu.github.io/issues)
- **LinkedIn**: [Connect with me](https://linkedin.com/in/jeremie-nlandu-mabiala-aa3a1b1b)

---

**Built with ❤️ for the AI community** | **Powered by Jekyll & GitHub Pages**
