# News Collection

This folder contains news items that are automatically displayed on the homepage.

## File Structure

Each news item should be a Markdown file with the following front matter:

```yaml
---
title: "Your News Title"
date: YYYY-MM-DD
icon: "fas fa-icon-name"  # FontAwesome icon class
featured: true/false       # true = appears in main News section, false = appears in Archive
tags:
  - Tag1
  - Tag2
  - Tag3
---

Your news content here in Markdown format. This will be automatically truncated for display.
```

## Examples

### Featured News (appears in main section)
```yaml
---
title: "Major Achievement"
date: 2024-01-15
icon: "fas fa-trophy"
featured: true
tags:
  - Achievement
  - Award
---

Description of your major achievement...
```

### Archive News (appears in "More News" section)
```yaml
---
title: "Historical Achievement"
date: 2020-06-01
icon: "fas fa-graduation-cap"
featured: false
tags:
  - Education
  - Past
---

Description of older news...
```

## Adding New News

1. Create a new `.md` file in this `_news` folder
2. Use the naming convention: `YYYY-MM-description.md`
3. Add the required front matter
4. Write your content in Markdown
5. The news will automatically appear on the homepage after Jekyll regenerates

## Icons

Use FontAwesome icons. Common examples:
- `fas fa-award` - Awards/achievements
- `fas fa-graduation-cap` - Education/degrees
- `fas fa-trophy` - Competitions/wins
- `fas fa-plane` - Travel/conferences
- `fas fa-book` - Publications/books
- `fas fa-briefcase` - Jobs/positions
- `fas fa-star` - Recognition
- `fas fa-certificate` - Certifications

## Tags

Use descriptive tags that will help categorize your news. Examples:
- Fellowship, Scholarship, Award, Achievement
- Conference, Travel, Speaking
- Publication, Research, Teaching
- Mathematics, Machine Learning, AI
- AIMS, University names, Organization names

## Images: cover and gallery

News items support an optional cover image and a gallery on their individual detail pages.

Front matter fields:

```yaml
# Optional hero image displayed above the content
cover_image: /assets/static/img/default.jpg

# Optional gallery of images; shows as a grid with a lightbox on click
gallery:
  - /assets/static/img/indaba.jpeg
  - /assets/static/img/indaba2.png
  - /assets/static/img/indaba3.png
```

Example with cover + gallery:

```yaml
---
title: "Conference Talk at Indaba"
date: 2024-08-20
icon: "fas fa-microphone"
featured: true
tags: [Conference, Talk]
cover_image: /assets/static/img/indaba.jpeg
gallery:
  - /assets/static/img/indaba.jpeg
  - /assets/static/img/indaba2.png
  - /assets/static/img/indaba3.png
---

Short summary here. The full content appears on the detail page.
```

Where to put images:
- Place images under `assets/static/img/` (recommended). You can also create a subfolder like `assets/static/img/news/` if you prefer to organize by section.
- Reference images with absolute paths (starting with `/assets/...`) so they work both locally and in production.

Tips:
- Prefer reasonable sizes (≤ 2000px on the long edge); Jekyll doesn’t resize images by default.
- Use `loading: lazy` is already applied in the template for gallery thumbnails.
- If you add a gallery, clicking a thumbnail opens a lightweight lightbox overlay; click anywhere outside the image or the × icon to close.