---
layout: default
title: "Blog Posts"
permalink: /posts/
description: "Thoughts and insights on AI, machine learning, mathematics, and technology from Jeremie Nlandu Mabiala"
---

<style>
/* Force disable scroll-snap and ensure page starts at top */
html, body, *, .container {
  scroll-snap-type: none !important;
  scroll-snap-align: none !important;
  scroll-snap-stop: normal !important;
}

/* Ensure page starts at very top */
body {
  scroll-padding-top: 0 !important;
}
</style>

<section class="posts-header-section" id="posts-top">
  <div class="container">
    <header class="page-header">
      <div class="page-eyebrow">All Articles</div>
      <h1 class="page-title">Blog Posts</h1>
      <p class="page-subtitle">
        {{ page.description }}
      </p>
    </header>
  </div>
</section>

<section class="posts-content-section" id="posts-content">
  <div class="container">
    <div class="posts-page-grid">
      <div class="posts-main">
        {% if site.posts.size > 0 %}
        <div class="posts-timeline-full">
          {% for post in site.posts %}
          <article class="post-item-full">
            <div class="post-date-full">{{ post.date | date: "%B %d, %Y" }}</div>
            <div class="post-content-full">
              <h2 class="post-title-full">
                {% if post.categories.size > 0 %}
                  <i class="fas fa-folder post-icon"></i>
                {% else %}
                  <i class="fas fa-file-alt post-icon"></i>
                {% endif %}
                <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
              </h2>
              <div class="post-description-full">
                {% if post.excerpt %}
                  {% assign content_text = post.excerpt | strip_html | strip_newlines %}
                  {% if content_text.size > 200 %}
                    {{ content_text | truncate: 200 | append: '... ' }}<a href="{{ post.url | relative_url }}" class="post-more-link">read more</a>
                  {% else %}
                    {{ post.excerpt | strip_html }}
                  {% endif %}
                {% else %}
                  {% assign content_text = post.content | strip_html | strip_newlines %}
                  {% if content_text.size > 200 %}
                    {{ content_text | truncate: 200 | append: '... ' }}<a href="{{ post.url | relative_url }}" class="post-more-link">read more</a>
                  {% else %}
                    {{ content_text }}
                  {% endif %}
                {% endif %}
              </div>
              
              {% if post.categories.size > 0 or post.tags.size > 0 %}
              <div class="post-meta-full">
                {% if post.categories.size > 0 %}
                <div class="post-categories-full">
                  {% for category in post.categories %}
                    <a href="{{ '/categories/' | append: category | relative_url }}" class="category-chip">{{ category }}</a>
                  {% endfor %}
                </div>
                {% endif %}
                
                {% if post.tags.size > 0 %}
                <div class="post-tags-full">
                  {% for tag in post.tags limit:5 %}
                    <a href="{{ '/tags/' | append: tag | relative_url }}" class="tag chip">{{ tag }}</a>
                  {% endfor %}
                </div>
                {% endif %}
              </div>
              {% endif %}
            </div>
          </article>
          {% endfor %}
        </div>
        {% else %}
        <div class="posts-empty">
          <div class="empty-icon">
            <i class="fas fa-edit"></i>
          </div>
          <h3>No posts yet</h3>
          <p>Check back soon for new content!</p>
        </div>
        {% endif %}
      </div>

      <aside class="posts-sidebar-full">
        <div class="sidebar-section">
          <h3 class="sidebar-title">Categories</h3>
          <div class="category-list">
            {% assign all_categories = site.posts | map: "categories" | join: "," | split: "," | uniq | sort %}
            {% for category in all_categories %}
              {% if category != "" %}
              <a href="{{ '/categories/' | append: category | relative_url }}" class="category-tag">
                {{ category }}
                <span class="category-count">
                  ({% assign category_posts = site.posts | where: "categories", category %}{{ category_posts.size }})
                </span>
              </a>
              {% endif %}
            {% endfor %}
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Popular Tags</h3>
          <div class="tag-cloud">
            {% assign all_tags = site.posts | map: "tags" | join: "," | split: "," | uniq | sort %}
            {% for tag in all_tags limit:20 %}
              {% if tag != "" %}
              <a href="{{ '/tags/' | append: tag | relative_url }}" class="tag-cloud-item">
                {{ tag }}
              </a>
              {% endif %}
            {% endfor %}
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Archive</h3>
          <div class="archive-list">
            {% assign posts_by_year = site.posts | group_by_exp: "item", "item.date | date: '%Y'" | sort: "name" | reverse %}
            {% for year in posts_by_year %}
            <div class="archive-year">
              <h4 class="archive-year-title">{{ year.name }}</h4>
              {% assign posts_by_month = year.items | group_by_exp: "item", "item.date | date: '%B'" %}
              {% for month in posts_by_month %}
              <div class="archive-month">
                <a href="#" class="archive-month-link" onclick="filterByMonth('{{ month.name }}', '{{ year.name }}')">
                  {{ month.name }} ({{ month.items.size }})
                </a>
              </div>
              {% endfor %}
            </div>
            {% endfor %}
          </div>
        </div>

        {% assign recent_posts = site.posts | limit: 5 %}
        {% if recent_posts.size > 0 %}
        <div class="sidebar-section">
          <h3 class="sidebar-title">Recent Posts</h3>
          <div class="recent-posts-list">
            {% for post in recent_posts %}
            <a href="{{ post.url | relative_url }}" class="recent-post-item">
              <div class="recent-post-icon">
                {% if post.categories.size > 0 %}
                  <i class="fas fa-folder"></i>
                {% else %}
                  <i class="fas fa-file-alt"></i>
                {% endif %}
              </div>
              <div class="recent-post-content">
                <h5>{{ post.title | truncate: 40 }}</h5>
                <span class="recent-post-date">{{ post.date | date: "%b %d, %Y" }}</span>
              </div>
            </a>
            {% endfor %}
          </div>
        </div>
        {% endif %}
      </aside>
    </div>
  </div>
</section>

<!-- Dots Navigation for Posts Page -->
<nav class="section-dots" aria-label="Posts Sections">
  <a href="#posts-top" class="dot" aria-label="Top"></a>
  <a href="#posts-content" class="dot" aria-label="Content"></a>
  <a href="#footer" class="dot" aria-label="Footer"></a>
</nav>

<script>
// Intersection observers for dots and animations
const dots = document.querySelectorAll('.section-dots .dot');
const footerEl = document.getElementById('footer') || document.querySelector('.site-footer');
const sections = [
  document.getElementById('posts-top'),
  document.getElementById('posts-content'),
  footerEl
].filter(Boolean);

function setActiveDot(index) {
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function bindDots() {
  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      sections[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function observeSections() {
  const headerH = getComputedStyle(document.documentElement).getPropertyValue('--header-h').trim() || '80px';
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const idx = sections.indexOf(entry.target);
      if (idx >= 0 && entry.isIntersecting) setActiveDot(idx);
    });
  }, { threshold: [0.15, 0.3, 0.5], rootMargin: `-${headerH} 0px 40% 0px` });

  sections.forEach(s => obs.observe(s));

  // Fallback: update active dot on scroll by checking nearest section
  window.addEventListener('scroll', () => {
    const footerIdx = sections.length - 1;
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) : 0;
    const atBottom = (window.innerHeight + window.scrollY) >= (doc.scrollHeight - 16);
    
    if (progress >= 0.85 || atBottom) { 
      setActiveDot(footerIdx); 
      return; 
    }

    let closestIdx = 0;
    let minDist = Infinity;
    const scrollMid = window.scrollY + window.innerHeight / 2;
    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      const center = rect.top + window.scrollY + rect.height / 2;
      const dist = Math.abs(center - scrollMid);
      if (dist < minDist) { 
        minDist = dist; 
        closestIdx = i; 
      }
    });
    setActiveDot(closestIdx);
  }, { passive: true });
}

function animatePostItems() {
  const items = Array.from(document.querySelectorAll('.post-item-full'));
  // Initialize stagger delays
  items.forEach((el, idx) => {
    el.style.setProperty('--slide-delay', `${Math.min(idx * 120, 480)}ms`);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  items.forEach(el => io.observe(el));
}

// Disable scroll-snap and ensure page starts at top
function disableScrollSnapAndScrollToTop() {
  // Force disable scroll-snap on all possible containers
  document.documentElement.style.scrollSnapType = 'none !important';
  document.body.style.scrollSnapType = 'none !important';
  
  // Find and disable scroll-snap on any containers that might have it
  const containers = document.querySelectorAll('*');
  containers.forEach(el => {
    const computed = window.getComputedStyle(el);
    if (computed.scrollSnapType && computed.scrollSnapType !== 'none') {
      el.style.scrollSnapType = 'none !important';
    }
  });
  
  // Force scroll to absolute top
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  // Override any CSS that might be setting scroll-snap
  const style = document.createElement('style');
  style.textContent = `
    html, body, * { 
      scroll-snap-type: none !important; 
      scroll-snap-align: none !important;
      scroll-padding-top: 0 !important;
    }
  `;
  document.head.appendChild(style);
}

// Run immediately
disableScrollSnapAndScrollToTop();

document.addEventListener('DOMContentLoaded', () => {
  disableScrollSnapAndScrollToTop();
  bindDots();
  observeSections();
  animatePostItems();
});

// Also run after everything loads
window.addEventListener('load', () => {
  disableScrollSnapAndScrollToTop();
});

// Filter functions
function filterByMonth(month, year) {
  const items = document.querySelectorAll('.post-item-full');
  items.forEach(item => {
    const date = item.querySelector('.post-date-full');
    if (date && date.textContent.includes(month) && date.textContent.includes(year)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  // Refresh animations for visible items
  items.forEach(item => item.classList.remove('in-view'));
  animatePostItems();
}

function filterByCategory(category) {
  const items = document.querySelectorAll('.post-item-full');
  items.forEach(item => {
    const categories = item.querySelector('.post-categories-full');
    if (categories && categories.textContent.includes(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  items.forEach(item => item.classList.remove('in-view'));
  animatePostItems();
}

// Show all items
function showAll() {
  const items = document.querySelectorAll('.post-item-full');
  items.forEach(item => {
    item.style.display = 'block';
  });
  items.forEach(item => item.classList.remove('in-view'));
  animatePostItems();
}
</script>
