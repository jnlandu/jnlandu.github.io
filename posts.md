---
layout: default
title: Blog Posts
permalink: /posts/
description: Thoughts and insights on AI, machine learning, mathematics, and technology.
---

<div class="container" style="padding-top: 2rem; padding-bottom: 4rem;">
  <header class="text-center mb-3">
    <h1>{{ page.title }}</h1>
    <p class="text-muted">{{ page.description }}</p>
  </header>

  <div class="post-list">
    {% for post in site.posts %}
      <article class="post-card">
        <h2 class="post-title">
          <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
        </h2>
        
        {% if post.excerpt %}
          <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 40 }}</p>
        {% endif %}
        
        <div class="post-meta">
          <time class="post-date">
            <i class="fas fa-calendar-alt"></i>
            {{ post.date | date: "%B %d, %Y" }}
          </time>
          
          {% if post.categories.size > 0 %}
            <span class="post-categories">
              <i class="fas fa-folder"></i>
              {% for category in post.categories %}
                <a href="{{ '/categories/' | append: category | relative_url }}">{{ category }}</a>
                {% unless forloop.last %}, {% endunless %}
              {% endfor %}
            </span>
          {% endif %}
          
          {% if post.tags.size > 0 %}
            <div class="tags">
              {% for tag in post.tags limit:5 %}
                <a href="{{ '/tags/' | append: tag | relative_url }}" class="tag">{{ tag }}</a>
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>

  {% if site.posts.size == 0 %}
    <div class="text-center" style="padding: 4rem 0;">
      <i class="fas fa-edit" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
      <h3>No posts yet</h3>
      <p class="text-muted">Check back soon for new content!</p>
    </div>
  {% endif %}
</div>
