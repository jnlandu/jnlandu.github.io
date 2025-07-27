---
layout: page
title: Projects
permalink: /projects/
---

<h1>Projects</h1>

{% if site.projects.size > 0 %}
<div class="projects-grid">
    {% for project in site.projects %}
    <div class="project-card">
        <h2 class="project-title">
            <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
        </h2>
        {% if project.excerpt %}
        <p class="project-description">{{ project.excerpt | strip_html | truncate: 150 }}</p>
        {% endif %}
        <div class="meta">
            {% if project.date %}
            <span class="meta-item">{{ project.date | date: "%B %Y" }}</span>
            {% endif %}
            {% if project.github %}
            <span class="meta-item"><a href="{{ project.github }}" target="_blank">GitHub</a></span>
            {% endif %}
        </div>
        {% if project.technologies %}
        <div class="tags">
            {% for tech in project.technologies limit: 4 %}
            <span class="tag">{{ tech }}</span>
            {% endfor %}
        </div>
        {% endif %}
    </div>
    {% endfor %}
</div>
{% else %}
<p>No projects yet.</p>
{% endif %}
