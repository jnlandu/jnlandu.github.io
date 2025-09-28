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