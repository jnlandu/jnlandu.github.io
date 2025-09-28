# Current Projects Collection

This folder contains current projects, books, and ongoing work that are displayed in the News section sidebar.

## File Structure

Each current project should be a Markdown file with the following front matter:

```yaml
---
title: "Project Title"
subtitle: "Optional subtitle"
author: "Author Name"
date: YYYY-MM-DD
status: "In Progress | Completed | On Hold"
progress: 75  # Optional: percentage completion (0-100)
type: "book | research | software | course"
icon: "fas fa-icon-name"  # FontAwesome icon class
cover_image: "./path/to/cover.png"  # Optional: cover image
featured: true/false  # Only featured projects appear in sidebar
tags:
  - Tag1
  - Tag2
---

Project description in Markdown format. This will be automatically truncated for display in the sidebar.
```

## Examples

### Book Project
```yaml
---
title: "Mathematics for Data Science"
subtitle: "Linear Algebra with Python"
author: "Jeremie Nlandu Mabiala"
date: 2024-09-01
status: "In Progress"
progress: 75
type: "book"
icon: "fas fa-book-open"
featured: true
tags:
  - Mathematics
  - Data Science
  - Python
  - Book
---

Description of the book project...
```

### Research Project
```yaml
---
title: "Neural Network Optimization"
subtitle: "Advanced Gradient Descent Methods"
date: 2024-10-01
status: "In Progress"
progress: 45
type: "research"
icon: "fas fa-brain"
featured: false
tags:
  - Research
  - Machine Learning
  - Optimization
---

Description of the research project...
```

### Software Project
```yaml
---
title: "ML Toolkit"
subtitle: "Python Library for Data Scientists"
date: 2024-08-15
status: "Completed"
progress: 100
type: "software"
icon: "fas fa-code"
featured: true
tags:
  - Software
  - Python
  - Open Source
---

Description of the software project...
```

## Adding New Projects

1. Create a new `.md` file in this `_current_projects` folder
2. Use the naming convention: `YYYY-MM-project-name.md`
3. Add the required front matter
4. Write your project description in Markdown
5. Set `featured: true` if you want it to appear in the News sidebar
6. The project will automatically appear after Jekyll regenerates

## Icons

Use FontAwesome icons. Common examples:
- `fas fa-book-open` - Books/publications
- `fas fa-brain` - Research/AI projects
- `fas fa-code` - Software/coding projects
- `fas fa-graduation-cap` - Educational content
- `fas fa-chart-line` - Data analysis projects
- `fas fa-cogs` - Technical projects
- `fas fa-lightbulb` - Innovation projects
- `fas fa-project-diagram` - General projects

## Status Options

- **In Progress** - Currently working on it
- **Completed** - Finished project
- **On Hold** - Temporarily paused
- **Planning** - In planning phase
- **Beta** - In testing/beta phase
- **Published** - Published/released

## Progress Bar

- Add `progress: X` (where X is 0-100) to show a progress bar
- Progress bar will display below the status badge
- Shows percentage completion visually

## Display Logic

- Only projects with `featured: true` appear in the News sidebar
- Most recent featured project is displayed
- If no featured projects exist, the sidebar section won't appear
- Projects are sorted by date (newest first)