---
layout: page
title: Projects
permalink: /projects/
description: Research and software projects.
---

{% assign projects_with_date = site.projects | where_exp: "item", "item.date != nil" | sort: 'date' | reverse %}
{% assign projects_without_date = site.projects | where_exp: "item", "item.date == nil" %}
{% assign sorted_projects = projects_with_date | concat: projects_without_date %}

{% if sorted_projects.size > 0 %}
<ul class="plain">
  {% for project in sorted_projects %}
    <li>
      <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
      {% if project.date %}<span class="date">· {{ project.date | date: "%Y" }}</span>{% endif %}
      {% if project.excerpt %}<br>{{ project.excerpt | strip_html | truncate: 180 }}{% endif %}
    </li>
  {% endfor %}
</ul>
{% else %}
<p>No projects listed yet.</p>
{% endif %}
