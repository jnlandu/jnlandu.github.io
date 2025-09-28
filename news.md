---
layout: default
title: "News & Updates"
permalink: /news/
description: "All news, achievements, fellowships, and updates from Jeremie Nlandu Mabiala"
---

<section class="news-header-section">
  <div class="container">
    <header class="page-header">
      <div class="page-eyebrow">All Updates</div>
      <h1 class="page-title">News & Updates</h1>
      <p class="page-subtitle">
        All my achievements, fellowships, conferences, and exciting projects in chronological order.
      </p>
    </header>
  </div>
  
</section>

<section class="news-content-section">
  <div class="container">
    <div class="news-page-grid">
      <div class="news-main">
        <div class="news-timeline-full">
          {% assign all_news = site.news | sort: "date" | reverse %}
          {% for news in all_news %}
          <article class="news-item-full">
            <div class="news-date-full">{{ news.date | date: "%B %d, %Y" }}</div>
            <div class="news-content-full">
              <h2 class="news-title-full">
                <i class="{{ news.icon | default: 'fas fa-newspaper' }} news-icon"></i>
                {{ news.title }}
              </h2>
              <div class="news-description-full">
                {{ news.content | markdownify }}
              </div>
              {% if news.tags and news.tags.size > 0 %}
              <div class="news-tags-full">
                {% for tag in news.tags %}
                  <span class="tag chip">{{ tag }}</span>
                {% endfor %}
              </div>
              {% endif %}
            </div>
          </article>
          {% endfor %}
        </div>
      </div>

      <aside class="news-sidebar-full">
        <div class="sidebar-section">
          <h3 class="sidebar-title">Categories</h3>
          <div class="category-list">
            {% assign all_tags = site.news | map: "tags" | join: "," | split: "," | uniq | sort %}
            {% for tag in all_tags %}
              {% if tag != "" %}
              <a href="#" class="category-tag" onclick="filterByTag('{{ tag }}')">
                {{ tag }}
              </a>
              {% endif %}
            {% endfor %}
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Timeline</h3>
          <div class="year-list">
            {% assign years = site.news | group_by_exp: "item", "item.date | date: '%Y'" | sort: "name" | reverse %}
            {% for year in years %}
            <a href="#" class="year-link" onclick="filterByYear('{{ year.name }}')">
              {{ year.name }} ({{ year.items.size }})
            </a>
            {% endfor %}
          </div>
        </div>

        {% assign current_project = site.current_projects | where: "featured", true | sort: "date" | reverse | first %}
        {% if current_project %}
        <div class="sidebar-section">
          <h3 class="sidebar-title">Current Project</h3>
          <div class="current-project-mini">
            <h4>{{ current_project.title }}</h4>
            {% if current_project.subtitle %}
              <p class="project-subtitle">{{ current_project.subtitle }}</p>
            {% endif %}
            <div class="project-status-mini">
              <span class="status-badge">{{ current_project.status }}</span>
              {% if current_project.progress %}
                <div class="progress-bar">
                  <div class="progress-fill" style="width: {{ current_project.progress }}%"></div>
                </div>
              {% endif %}
            </div>
          </div>
        </div>
        {% endif %}
      </aside>
    </div>
  </div>
</section>

<script>
function filterByTag(tag) {
  const items = document.querySelectorAll('.news-item-full');
  items.forEach(item => {
    const tags = item.querySelector('.news-tags-full');
    if (tags && tags.textContent.includes(tag)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function filterByYear(year) {
  const items = document.querySelectorAll('.news-item-full');
  items.forEach(item => {
    const date = item.querySelector('.news-date-full');
    if (date && date.textContent.includes(year)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Show all items
function showAll() {
  const items = document.querySelectorAll('.news-item-full');
  items.forEach(item => {
    item.style.display = 'block';
  });
}
</script>