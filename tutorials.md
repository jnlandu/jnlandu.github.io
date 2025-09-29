---
layout: default
title: "Learning Tutorials"
permalink: /tutorials/
description: "Comprehensive tutorials covering AI, machine learning, mathematics, and programming topics"
---

<style>
/* Force disable scroll-snap and ensure page starts at top */
html, body, *, .container {
  scroll-snap-type: none !important;
  scroll-snap-align: none !important;
  scroll-snap-stop: normal !important;
}

/* Ensure page starts at very top */
body { scroll-padding-top: 0 !important; }
</style>

<section class="tutorials-header-section" id="tutorials-top">
  <div class="container">
    <header class="page-header">
      <div class="page-eyebrow">All Tutorials</div>
      <h1 class="page-title">Tutorials</h1>
      <p class="page-subtitle">{{ page.description }}</p>
    </header>
  </div>
 </section>

<section class="posts-content-section" id="tutorials-content">
  <div class="container">
    <div class="posts-page-grid">
      <div class="posts-main">
        {% if site.tutorials.size > 0 %}
        <div class="posts-timeline-full">
          {% for tutorial in site.tutorials %}
          <article class="post-item-full">
            <div class="post-date-full">{{ tutorial.date | date: "%B %d, %Y" }}</div>
            <div class="post-content-full">
              <h2 class="post-title-full">
                <i class="fas fa-chalkboard-teacher post-icon"></i>
                {% if tutorial.video_url %}
                  <a href="{{ tutorial.video_url }}" target="_blank" rel="noopener">{{ tutorial.title | escape }}</a>
                {% else %}
                  <a href="{{ tutorial.url | relative_url }}">{{ tutorial.title | escape }}</a>
                {% endif %}
              </h2>
              <div class="post-description-full">
                {% if tutorial.summary %}
                  {% assign content_text = tutorial.summary | strip_html | strip_newlines %}
                  {% if content_text.size > 200 %}
                    {{ content_text | truncate: 200 | append: '... ' }}
                    {% if tutorial.video_url %}
                      <a href="{{ tutorial.video_url }}" target="_blank" rel="noopener" class="post-more-link">watch</a>
                    {% else %}
                      <a href="{{ tutorial.url | relative_url }}" class="post-more-link">read more</a>
                    {% endif %}
                  {% else %}
                    {{ tutorial.summary | strip_html }}
                  {% endif %}
                {% elsif tutorial.excerpt %}
                  {% assign content_text = tutorial.excerpt | strip_html | strip_newlines %}
                  {% if content_text.size > 200 %}
                    {{ content_text | truncate: 200 | append: '... ' }}
                    {% if tutorial.video_url %}
                      <a href="{{ tutorial.video_url }}" target="_blank" rel="noopener" class="post-more-link">watch</a>
                    {% else %}
                      <a href="{{ tutorial.url | relative_url }}" class="post-more-link">read more</a>
                    {% endif %}
                  {% else %}
                    {{ tutorial.excerpt | strip_html }}
                  {% endif %}
                {% else %}
                  {% assign content_text = tutorial.content | strip_html | strip_newlines %}
                  {% if content_text.size > 200 %}
                    {{ content_text | truncate: 200 | append: '... ' }}
                    {% if tutorial.video_url %}
                      <a href="{{ tutorial.video_url }}" target="_blank" rel="noopener" class="post-more-link">watch</a>
                    {% else %}
                      <a href="{{ tutorial.url | relative_url }}" class="post-more-link">read more</a>
                    {% endif %}
                  {% else %}
                    {{ content_text }}
                  {% endif %}
                {% endif %}
              </div>

              {% if tutorial.tags and tutorial.tags.size > 0 %}
              <div class="post-meta-full">
                <div class="post-tags-full">
                  {% for tag in tutorial.tags limit:5 %}
                    <span class="tag chip">{{ tag }}</span>
                  {% endfor %}
                </div>
              </div>
              {% endif %}
            </div>
          </article>
          {% endfor %}
        </div>
        {% else %}
        <div class="posts-empty">
          <div class="empty-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <h3>No tutorials yet</h3>
          <p>Check back soon for new content!</p>
        </div>
        {% endif %}
      </div>

      <aside class="posts-sidebar-full">
        <div class="sidebar-section">
          <h3 class="sidebar-title">Topics</h3>
          <div class="tag-cloud">
            {% assign all_tags = site.tutorials | map: "tags" | join: "," | split: "," | uniq | sort %}
            {% for tag in all_tags limit:20 %}
              {% if tag != "" %}
              <a href="#" class="tag-cloud-item" onclick="filterByTag('{{ tag }}')">{{ tag }}</a>
              {% endif %}
            {% endfor %}
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">Archive</h3>
          <div class="archive-list">
            {% assign tuts_by_year = site.tutorials | group_by_exp: "item", "item.date | date: '%Y'" | sort: "name" | reverse %}
            {% for year in tuts_by_year %}
            <div class="archive-year">
              <h4 class="archive-year-title">{{ year.name }}</h4>
              {% assign tuts_by_month = year.items | group_by_exp: "item", "item.date | date: '%B'" %}
              {% for month in tuts_by_month %}
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

        {% assign recent_tuts = site.tutorials | sort: 'date' | reverse | limit: 5 %}
        {% if recent_tuts.size > 0 %}
        <div class="sidebar-section">
          <h3 class="sidebar-title">Recent Tutorials</h3>
          <div class="recent-posts-list">
            {% for tut in recent_tuts %}
            <a href="{{ tut.video_url | default: tut.url | relative_url }}" {% if tut.video_url %}target="_blank" rel="noopener"{% endif %} class="recent-post-item">
              <div class="recent-post-icon">
                <i class="fas fa-chalkboard-teacher"></i>
              </div>
              <div class="recent-post-content">
                <h5>{{ tut.title | truncate: 40 }}</h5>
                <span class="recent-post-date">{{ tut.date | date: "%b %d, %Y" }}</span>
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

<!-- Dots Navigation for Tutorials Page -->
<nav class="section-dots" aria-label="Tutorials Sections">
  <a href="#tutorials-top" class="dot" aria-label="Top"></a>
  <a href="#tutorials-content" class="dot" aria-label="Content"></a>
  <a href="#footer" class="dot" aria-label="Footer"></a>
 </nav>

<script>
// Intersection observers for dots and animations
const dots = document.querySelectorAll('.section-dots .dot');
const footerEl = document.getElementById('footer') || document.querySelector('.site-footer');
const sections = [
  document.getElementById('tutorials-top'),
  document.getElementById('tutorials-content'),
  footerEl
].filter(Boolean);

function setActiveDot(index) { dots.forEach((d, i) => d.classList.toggle('active', i === index)); }

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

  window.addEventListener('scroll', () => {
    const footerIdx = sections.length - 1;
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) : 0;
    const atBottom = (window.innerHeight + window.scrollY) >= (doc.scrollHeight - 16);
    if (progress >= 0.85 || atBottom) { setActiveDot(footerIdx); return; }
    let closestIdx = 0, minDist = Infinity;
    const scrollMid = window.scrollY + window.innerHeight / 2;
    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      const center = rect.top + window.scrollY + rect.height / 2;
      const dist = Math.abs(center - scrollMid);
      if (dist < minDist) { minDist = dist; closestIdx = i; }
    });
    setActiveDot(closestIdx);
  }, { passive: true });
}

function animateItems() {
  const items = Array.from(document.querySelectorAll('.post-item-full'));
  items.forEach((el, idx) => { el.style.setProperty('--slide-delay', `${Math.min(idx * 120, 480)}ms`); });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  items.forEach(el => io.observe(el));
}

// Disable scroll-snap and ensure page starts at top
function disableScrollSnapAndScrollToTop() {
  document.documentElement.style.scrollSnapType = 'none !important';
  document.body.style.scrollSnapType = 'none !important';
  const containers = document.querySelectorAll('*');
  containers.forEach(el => {
    const computed = window.getComputedStyle(el);
    if (computed.scrollSnapType && computed.scrollSnapType !== 'none') { el.style.scrollSnapType = 'none !important'; }
  });
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0; document.body.scrollTop = 0;
  const style = document.createElement('style');
  style.textContent = `html, body, * { scroll-snap-type: none !important; scroll-snap-align: none !important; scroll-padding-top: 0 !important; }`;
  document.head.appendChild(style);
}

// Filters
function filterByMonth(month, year) {
  const items = document.querySelectorAll('.post-item-full');
  items.forEach(item => {
    const date = item.querySelector('.post-date-full');
    item.style.display = (date && date.textContent.includes(month) && date.textContent.includes(year)) ? 'block' : 'none';
  });
  items.forEach(item => item.classList.remove('in-view')); animateItems();
}

function filterByTag(tag) {
  const items = document.querySelectorAll('.post-item-full');
  items.forEach(item => {
    const tags = item.querySelector('.post-tags-full');
    item.style.display = (tags && tags.textContent.includes(tag)) ? 'block' : 'none';
  });
  items.forEach(item => item.classList.remove('in-view')); animateItems();
}

function showAll() {
  document.querySelectorAll('.post-item-full').forEach(item => { item.style.display = 'block'; item.classList.remove('in-view'); });
  animateItems();
}

// Run immediately
disableScrollSnapAndScrollToTop();

document.addEventListener('DOMContentLoaded', () => {
  disableScrollSnapAndScrollToTop();
  bindDots();
  observeSections();
  animateItems();
});

window.addEventListener('load', () => { disableScrollSnapAndScrollToTop(); });
</script>