# Jeremie Mabiala - Personal Academic Website

This is my personal website. You can find it live at [jnlandu.github.io](https://jnlandu.github.io). Feel free to copy it.

## Preview

### Desktop View
<div align="center">

**Homepage - Dark Theme**  
<img width="800" alt="Homepage Preview" src="https://github.com/user-attachments/assets/bab5f329-8d29-4b77-9b99-157e8da99506" />

**Projects Page - Portfolio Layout**  
<img width="800" alt="Projects Page Preview" src="https://github.com/user-attachments/assets/38bbbf37-7733-4a9a-9bd0-53d623fd5f67" />

</div>

### Mobile View
<div align="center">

**Responsive Mobile Design**  
<img width="300" alt="Mobile Preview" src="https://github.com/user-attachments/assets/c7d86298-1aa5-4d61-9327-08091e9a3b41" />

</div>

---

The whole website is built with Jekyll and deployed on GitHub Pages. If you like it, you can copy it. I describe below how you can set it up and run it locally.

## Features

The webiste has an academic flavour(and maybe professional focuss too) with sections for education, research, publications, projects, and blog posts. You can easily customize it to fit your needs.

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
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Jeremie Mabiala**
- Email: jnlandu [00] at gmail dot com
- LinkedIn: [linkedin.com/in/jnlandu0a](https://linkedin.com/in/jnlandu0a)

