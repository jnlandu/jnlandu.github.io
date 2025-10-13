# Jeremie Mabiala - Personal Academic Website

This is my personal website. You can find it live  at [jnlandu.github.io](https://jnlandu.github.io). Feel free to copy it.




The whole website is built with jekyll and deployed on Github Pages. If you like it, you can copy it. I describe below how you can set it up and run it locally.

## Features
- **Modern Design**: Clean, professional dark theme with pink accent colors
- **Responsive Layout**: Optimized for all device sizes
- **Academic Focus**: Sections for education, research, publications, and projects
- **Interactive Elements**: Smooth scrolling, animations, and dynamic content
- **SEO Optimized**: Built-in Jekyll SEO plugin and meta tags
- **Fast Performance**: Optimized CSS and JavaScript

## Live Demo

Visit the live website: [jnlandu.github.io](https://jnlandu.github.io)

## Tech Stack
- **Framework**: Jekyll 3.10.0
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6.0
- **Deployment**: GitHub Pages
- **Version Control**: Git

## 📁 Project Structure

```
jnlandu.github.io/
├── _config.yml                 # Jekyll configuration
├── _layouts/                   # Page layouts
│   ├── default.html           # Main layout template
│   ├── home.html              # Homepage layout
│   └── post.html              # Blog post layout
├── _includes/                  # Reusable components
│   ├── header.html            # Site header
│   ├── footer.html            # Site footer
│   └── bio.html               # Biography section
├── _sass/                      # SCSS partials
├── _posts/                     # Blog posts
├── _projects/                  # Project portfolio
├── _news/                      # News and updates
├── assets/                     # Static assets
│   ├── css/                   # Stylesheets
│   ├── js/                    # JavaScript files
│   └── images/                # Images and media
├── pages/                      # Static pages
│   ├── about.md
│   ├── projects.md
│   ├── posts.md
│   └── contact.md
└── index.md                    # Homepage
```

## Installation & Setup

### Prerequisites
- Ruby 2.7+
- Bundler
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/jnlandu/jnlandu.github.io.git
   cd jnlandu.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```
If you have don't have bundler installed, you can install it with:
```bash
gem install bundler
```
If you don't have ruby installed, you can install it with a version manager like `brew` or `rvm`.

3. **Start the development server**
   ```bash
   bundle exec jekyll serve --livereload
   ```
The project will be available at `http://localhost:4000` with live reload enabled.

4. **Open in browser**
   ```
   http://localhost:4000
   ```

## Known Issues

### Current Layout Problems (as of October 2025)

#### Issue #1: Header Contact Information Overflow
![Header Contact Issue](./docs/images/header-contact-issue.png)

**Problem**: On smaller screens, the header contact information (phone number and email) overflows and creates layout issues.

**Details**:
- Phone number `+27 71 44 35 490` and email `jnlandu two zeros at gmail dot com` don't wrap properly
- Header becomes cluttered on mobile devices
- Navigation menu toggle button gets pushed down

**Proposed Solutions**:
- [ ] Implement responsive contact display (hide on mobile)
- [ ] Add compact icon-only contact for small screens
- [ ] Improve header flexbox layout
- [ ] Add media queries for screens < 768px

#### Issue #2: Mobile Navigation Menu Positioning
![Navigation Menu Issue](./docs/images/nav-menu-issue.png)

**Problem**: The slide-out navigation menu doesn't position correctly on very small screens.

**Details**:
- Menu slides in from the right but doesn't cover full screen properly
- Close button (×) positioning needs adjustment
- Menu items need better spacing on mobile
- Background overlay could be improved

**Proposed Solutions**:
- [ ] Fix menu width to 100vw on mobile
- [ ] Improve close button positioning
- [ ] Add better touch targets for menu items
- [ ] Enhance mobile navigation animations

#### Issue #3: Hero Section Contact Display
![Hero Section Issue](./docs/images/hero-contact-issue.png)

**Problem**: Contact information in hero section appears disconnected from the main content.

**Details**:
- Contact blocks (phone and email) appear to float independently
- Inconsistent spacing with the hero image
- Layout breaks on certain screen sizes
- Contact information hierarchy needs improvement

**Proposed Solutions**:
- [ ] Integrate contact info better with hero layout
- [ ] Improve visual connection between elements
- [ ] Add consistent spacing and alignment
- [ ] Consider moving contact to dedicated section

## Development Workflow

### Branch Strategy
- `main`: Production branch (auto-deploys to GitHub Pages)
- `dev`: Development branch (current active)
- Feature branches: `feature/feature-name`

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit relevant files
   - Test locally with `bundle exec jekyll serve`

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Open PR to `dev` branch
   - Review and merge after testing

## Content Management

### Adding Blog Posts
Create new files in `_posts/` with format: `YYYY-MM-DD-title.md`

```yaml
---
layout: post
title: "Your Post Title"
date: 2025-10-13
categories: [AI, Research]
tags: [machine-learning, python]
---

Your post content here...
```

### Adding Projects
Create new files in `_projects/` with project details:

```yaml
---
title: "Project Name"
status: "Completed"
technologies: [Python, PyTorch, Flask]
github: "https://github.com/username/repo"
demo: "https://demo-url.com"
---

Project description...
```

### Adding News Items
Create files in `_news/` for updates and achievements:

```yaml
---
title: "Achievement Title"
date: 2025-10-13
icon: "fas fa-award"
featured: true
tags: [Fellowship, Award]
---

News content...
```

## Customization

### Theme Colors
Edit `assets/css/professional-clean.css`:

```css
:root {
  --primary-bg: #0b1220;
  --accent-primary: #ff6b9d;
  --text-primary: #e6edf3;
  /* ... more variables */
}
```

### Layout Modifications
- Header: Edit `_layouts/default.html`
- Homepage: Edit `_layouts/home.html`
- Footer: Edit `_includes/footer.html`

## Responsive Design

The site uses CSS Grid and Flexbox for responsive layouts:

- **Desktop**: Full sidebar layouts, multi-column grids
- **Tablet**: Adapted layouts with adjusted spacing
- **Mobile**: Single-column layouts, collapsible navigation

### Media Queries
- `@media (max-width: 768px)`: Tablet and below
- `@media (max-width: 480px)`: Mobile phones
- `@media (max-width: 380px)`: Very small screens (Galaxy Z Fold, etc.)

## SEO & Performance

### SEO Features
- Jekyll SEO plugin
- Meta tags and Open Graph
- Structured data
- XML sitemap, traditional SEO sitemap
- Robots.txt, for AI crawlers.

### Performance Optimizations
- Minified CSS and JavaScript
- Optimized images
- Lazy loading
- Fast loading fonts


## Deployment

### Automatic Deployment
The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment
```bash
# Build the site
bundle exec jekyll build

# Deploy to GitHub Pages
git push origin main
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Issue Reporting
When reporting issues, please include:
- Browser and version
- Screen size/device
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Jeremie Mabiala**
- Website: [jnlandu.github.io](https://jnlandu.github.io)
- Email: jnlandu [00] at gmail dot com
- LinkedIn: [linkedin.com/in/jnlandu0a](https://linkedin.com/in/jnlandu0a)
- GitHub: [github.com/jnlandu](https://github.com/jnlandu)

