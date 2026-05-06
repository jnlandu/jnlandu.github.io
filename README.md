# Jérémie Mabiala — Personal Website

Personal academic website, live at [jnlandu.github.io](https://jnlandu.github.io). Built with Jekyll and deployed on GitHub Pages. Feel free to use it as a starting point for your own.

## Preview

<div align="center">

**Homepage**
<img width="800" alt="Homepage Preview" src="https://github.com/user-attachments/assets/bab5f329-8d29-4b77-9b99-157e8da99506" />

**Projects Page**
<img width="800" alt="Projects Page Preview" src="https://github.com/user-attachments/assets/38bbbf37-7733-4a9a-9bd0-53d623fd5f67" />

**Mobile**
<img width="300" alt="Mobile Preview" src="https://github.com/user-attachments/assets/c7d86298-1aa5-4d61-9327-08091e9a3b41" />

</div>

---

## Tech Stack

- **Framework**: Jekyll 3.10.0
- **Styling**: Custom CSS (CSS Grid + Flexbox)
- **Icons**: Font Awesome 6.0
- **Deployment**: GitHub Pages

## Project Structure

```
jnlandu.github.io/
├── _config.yml          # Site configuration
├── _layouts/            # Page layouts (default, home, post, project-detail…)
├── _includes/           # Reusable components (header, footer, bio…)
├── _sass/               # SCSS partials
├── _posts/              # Blog posts
├── _projects/           # Project portfolio entries
├── _news/               # News and updates
├── assets/
│   ├── css/             # Stylesheets (professional-clean.css)
│   ├── profiles/        # Profile images
│   └── static/          # Static files (CV, etc.)
├── about.md
├── contact.md
├── news.md
└── index.md
```

## Local Development

**Prerequisites:** Ruby 2.7+, Bundler, Git.

```bash
# Clone
git clone https://github.com/jnlandu/jnlandu.github.io.git
cd jnlandu.github.io

# Install dependencies
bundle install

# Serve with live reload
bundle exec jekyll serve --livereload
```

Site runs at `http://localhost:4000`.

If Bundler is not installed: `gem install bundler`.

## Content Management

### Blog post

Create `_posts/YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "Post Title"
date: 2025-01-01
categories: [AI, Research]
tags: [machine-learning, python]
---

Content here.
```

### Project

Create a file in `_projects/`:

```yaml
---
title: "Project Name"
status: "Completed"
technologies: [Python, PyTorch]
github: "https://github.com/username/repo"
demo: "https://demo-url.com"
---

Description here.
```

### News item

Create a file in `_news/`:

```yaml
---
title: "Achievement Title"
date: 2025-01-01
icon: "fas fa-award"
featured: true
tags: [Fellowship, Award]
---

Content here.
```

## Customization

Theme colors are CSS variables in `assets/css/professional-clean.css`:

```css
:root {
  --primary-bg: #0b1220;
  --accent-primary: #ff6b9d;
  --text-primary: #e6edf3;
}
```

Key layout files:
- Header + JS: `_layouts/default.html`
- Homepage: `_layouts/home.html`
- Footer: `_includes/footer.html`

## Deployment

Pushes to `main` deploy automatically via GitHub Pages.

## License

MIT — see [LICENSE](LICENSE).

## Author

**Jérémie Mabiala** — [jnlandu00@gmail.com](mailto:jnlandu00@gmail.com)
