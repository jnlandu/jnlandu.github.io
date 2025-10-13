---
layout: default
title: Projects
permalink: /projects/
description: A showcase of my research projects, software development work, and academic contributions.
---

<style>
/* Simple styling */
html, body, *, .container { scroll-snap-type: none !important; scroll-snap-align: none !important; }
body { scroll-padding-top: 0 !important; }

/* Header */
.projects-header { padding: 2rem 0 1rem; }
.projects-header h1 { margin-bottom: .5rem; }
.projects-header p { color: var(--text-secondary); }

/* Search bar */
.search-container { margin: 1.5rem 0; }
.search-box { width: 100%; max-width: 400px; padding: .75rem 1rem; border: 1px solid var(--border-color); border-radius: .5rem; background: var(--card-bg); color: var(--text-primary); font-size: .9rem; }
.search-box:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 2px rgba(255, 107, 157, 0.25); }
.search-box::placeholder { color: var(--text-muted); }

/* Simple grid */
.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 1rem; }
.project-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; transition: box-shadow .2s ease; }
.project-card:hover { box-shadow: var(--shadow-md); }

.project-title { margin: 0 0 .5rem; font-size: 1.1rem; font-weight: 700; }
.project-title a { color: var(--text-primary); text-decoration: none; }
.project-title a:hover { color: var(--accent-primary); }

.project-desc { color: var(--text-secondary); margin-bottom: .75rem; line-height: 1.5; }

.project-meta { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; font-size: .85rem; color: var(--text-muted); }
.project-status { padding: .2rem .5rem; border-radius: .3rem; font-weight: 600; font-size: .8rem; }
.project-status.completed { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
.project-status.in-progress { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.project-status.planning { background: rgba(99, 102, 241, 0.15); color: #6366f1; }
.project-status.unknown { background: rgba(156, 163, 175, 0.15); color: #9ca3af; }

.project-links { margin-top: .75rem; display: flex; gap: .5rem; }
.project-link { background: var(--border-color); color: var(--text-primary); padding: .4rem .7rem; border-radius: .4rem; text-decoration: none; font-size: .85rem; display: inline-flex; align-items: center; gap: .4rem; }
.project-link:hover { background: var(--accent-primary); color: var(--primary-bg); }

@media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr; } }
</style>

<!-- Header -->
<section class="projects-header" id="projects-top">
  <div class="container">
    <header class="page-header">
      <h1>{{ page.title }}</h1>
      <p>{{ page.description }}</p>
      
      <!-- Search -->
      <div class="search-container">
        <input type="text" class="search-box" id="projectSearch" placeholder="Search projects by name, description, or technology...">
      </div>
    </header>
  </div>
</section>

<!-- Projects List -->
<section id="projects-content">
  <div class="container">
    {% if site.projects.size > 0 %}
      <div class="projects-grid" id="projectsGrid">
        {% assign projects_with_date = site.projects | where_exp: "item", "item.date != nil" | sort: 'date' | reverse %}
        {% assign projects_without_date = site.projects | where_exp: "item", "item.date == nil" %}
        {% assign sorted_projects = projects_with_date | concat: projects_without_date %}
        {% for project in sorted_projects %}
          <article 
            class="project-card"
            data-status="{{ project.status | default: 'unknown' | downcase | replace: ' ', '-' }}">
            
            <h3 class="project-title">
              <a href="{{ project.url | relative_url }}">{{ project.title | escape }}</a>
            </h3>
            
            <p class="project-desc">
              {% if project.excerpt %}
                {{ project.excerpt | strip_html | truncatewords: 20 }}
              {% else %}
                {{ project.content | strip_html | truncatewords: 20 }}
              {% endif %}
            </p>
            
            <!-- Hidden tech data for search -->
            <div class="project-tech-data" style="display: none;">
              {% if project.technologies %}
                {% for tech in project.technologies %}{{ tech }}{% unless forloop.last %}, {% endunless %}{% endfor %}
              {% endif %}
            </div>
            
            <div class="project-meta">
              {% if project.status %}
                <span class="project-status {{ project.status | downcase | replace: ' ', '-' }}">{{ project.status }}</span>
              {% endif %}
              {% if project.date %}
                <span>{{ project.date | date: "%b %Y" }}</span>
              {% endif %}
              {% if project.category %}
                <span>{{ project.category }}</span>
              {% endif %}
            </div>
            
            {% if project.github or project.demo %}
              <div class="project-links">
                {% if project.github %}
                  <a class="project-link" href="{{ project.github }}" target="_blank" rel="noopener">
                    <i class="fab fa-github"></i> Source
                  </a>
                {% endif %}
                {% if project.demo %}
                  <a class="project-link" href="{{ project.demo }}" target="_blank" rel="noopener">
                    <i class="fas fa-external-link-alt"></i> Demo
                  </a>
                {% endif %}
              </div>
            {% endif %}
          </article>
        {% endfor %}
      </div>
    {% else %}
      <div class="projects-empty">
        <div class="empty-icon"><i class="fas fa-code"></i></div>
        <h3>Projects coming soon</h3>
        <p>I'm currently working on several exciting projects. Check back soon!</p>
      </div>
    {% endif %}
  </div>
</section>

<!-- CTA -->
<section class="projects-cta-section">
  <div class="container">
    <div class="cta-content">
      <h3>Interested in collaborating?</h3>
      <p>Feel free to reach out if you'd like to work together.</p>
      <a href="{{ '/contact/' | relative_url }}" class="btn btn-primary">Get in touch</a>
    </div>
  </div>
</section>

<script>
(function() {
  const searchBox = document.getElementById('projectSearch');
  const cards = () => Array.from(document.querySelectorAll('.project-card'));
  
  let searchQuery = '';

  function applyFilters() {
    cards().forEach((c) => {
      let searchMatch = true;
      if (searchQuery.trim()) {
        const title = c.querySelector('.project-title a').textContent.toLowerCase();
        const desc = c.querySelector('.project-desc').textContent.toLowerCase();
        const tech = c.querySelector('.project-tech-data') ? c.querySelector('.project-tech-data').textContent.toLowerCase() : '';
        const searchText = (title + ' ' + desc + ' ' + tech).toLowerCase();
        searchMatch = searchText.includes(searchQuery.toLowerCase());
      }
      
      c.style.display = searchMatch ? '' : 'none';
    });
  }

  // Search functionality
  if (searchBox) {
    searchBox.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      applyFilters();
    });
  }
})();
</script>
