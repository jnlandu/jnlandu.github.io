---
layout: default
title: Tutorials
permalink: /tutorials/
description: Educational content covering AI, machine learning, mathematics, and programming topics.
---

<div class="container" style="padding-top: 2rem; padding-bottom: 4rem;">
  <header class="text-center mb-3">
    <h1>{{ page.title }}</h1>
    <p class="text-muted">{{ page.description }}</p>
  </header>

  <div class="post-list">
    {% for tutorial in site.tutorials %}
      <article class="post-card">
        <h2 class="post-title">
          <a href="{{ tutorial.url | relative_url }}">{{ tutorial.title | escape }}</a>
        </h2>
        
        {% if tutorial.excerpt %}
          <p class="post-excerpt">{{ tutorial.excerpt | strip_html | truncatewords: 35 }}</p>
        {% endif %}
        
        <div class="post-meta">
          {% if tutorial.date %}
            <time class="post-date">
              <i class="fas fa-calendar-alt"></i>
              {{ tutorial.date | date: "%B %d, %Y" }}
            </time>
          {% endif %}
          
          {% if tutorial.difficulty %}
            <span class="tutorial-difficulty">
              <i class="fas fa-layer-group"></i>
              {{ tutorial.difficulty }}
            </span>
          {% endif %}
          
          {% if tutorial.duration %}
            <span class="tutorial-duration">
              <i class="fas fa-clock"></i>
              {{ tutorial.duration }}
            </span>
          {% endif %}
          
          {% if tutorial.tags %}
            <div class="tags">
              {% for tag in tutorial.tags %}
                <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>

  {% if site.tutorials.size == 0 %}
    <div class="text-center" style="padding: 4rem 0;">
      <i class="fas fa-graduation-cap" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
      <h3>Tutorials Coming Soon</h3>
      <p class="text-muted">I'm preparing comprehensive tutorials on AI, ML, and mathematics. Stay tuned!</p>
    </div>
  {% endif %}

  <div class="text-center mt-3">
    <p class="text-muted">Want to suggest a tutorial topic or contribute content?</p>
    <a href="{{ '/contact/' | relative_url }}" class="btn btn-primary">
      <i class="fas fa-lightbulb"></i>
      Share Your Ideas
    </a>
  </div>
</div>