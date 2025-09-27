---

layout: default
title: Projects
permalink: /projects/
description: A showcase of my research projects, software development work, and academic contributions.
---

<div class="container" style="padding-top: 2rem; padding-bottom: 4rem;">
  <header class="text-center mb-3">
    <h1>{{ page.title }}</h1>
    <p class="text-muted">{{ page.description }}</p>
  </header>

  <div class="post-list">
    {% for project in site.projects %}
      <article class="post-card">
        <h2 class="post-title">
          <a href="{{ project.url | relative_url }}">{{ project.title | escape }}</a>
        </h2>
        
        {% if project.excerpt %}
          <p class="post-excerpt">{{ project.excerpt | strip_html | truncatewords: 30 }}</p>
        {% endif %}
        
        <div class="post-meta">
          {% if project.date %}
            <time class="post-date">
              <i class="fas fa-calendar-alt"></i>
              {{ project.date | date: "%B %Y" }}
            </time>
          {% endif %}
          
          {% if project.status %}
            <span class="project-status">
              <i class="fas fa-info-circle"></i>
              {{ project.status }}
            </span>
          {% endif %}
          
          {% if project.tech %}
            <div class="tags">
              {% for tech in project.tech %}
                <span class="tag">{{ tech }}</span>
              {% endfor %}
            </div>
          {% endif %}
          
          {% if project.links %}
            <div class="project-links" style="margin-top: 1rem;">
              {% for link in project.links %}
                <a href="{{ link.url }}" class="btn btn-secondary" target="_blank" rel="noopener">
                  <i class="{{ link.icon | default: 'fas fa-external-link-alt' }}"></i>
                  {{ link.title }}
                </a>
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>

  {% if site.projects.size == 0 %}
    <div class="text-center" style="padding: 4rem 0;">
      <i class="fas fa-code" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
      <h3>Projects Coming Soon</h3>
      <p class="text-muted">I'm currently working on several exciting projects. Check back soon for updates!</p>
    </div>
  {% endif %}

  <div class="text-center mt-3">
    <a href="{{ '/contact/' | relative_url }}" class="btn btn-primary">
      <i class="fas fa-envelope"></i>
      Collaborate With Me
    </a>
  </div>
</div>
