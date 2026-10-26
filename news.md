---
layout: page
title: "News"
permalink: /news/
description: "Fellowships, papers, schools, and other updates."
---

{% assign all_news = site.news | sort: "date" | reverse %}
{% assign years = all_news | group_by_exp: "item", "item.date | date: '%Y'" %}

{% for year in years %}
<h2>{{ year.name }}</h2>
<ul class="plain">
  {% for item in year.items %}
    <li>
      <span class="date">{{ item.date | date: "%b" }}</span> —
      {% if item.inline %}
        {{ item.content | markdownify | remove: '<p>' | remove: '</p>' | strip }}
      {% else %}
        <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {% endif %}
    </li>
  {% endfor %}
</ul>
{% endfor %}
