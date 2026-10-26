---
layout: page
title: "Blog"
permalink: /posts/
description: "Notes on machine learning, linear algebra, and optimization."
---

{% comment %} Drafts with commented-out front matter have no tags; skip them. {% endcomment %}
{% assign posts = site.posts | where_exp: "p", "p.tags.size > 0" %}
{% assign years = posts | group_by_exp: "post", "post.date | date: '%Y'" %}

{% for year in years %}
<h2>{{ year.name }}</h2>
<ul class="plain">
  {% for post in year.items %}
    <li>
      <span class="date">{{ post.date | date: "%b %-d" }}</span> —
      <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      {% if post.summary %}<br><span class="date">{{ post.summary | strip_html | truncate: 160 }}</span>{% endif %}
    </li>
  {% endfor %}
</ul>
{% else %}
<p>No posts yet. They're on the way.</p>
{% endfor %}

{% if posts.size > 0 %}
<p class="meta">Browse by <a href="{{ '/tags/' | relative_url }}">tag</a> or <a href="{{ '/years/' | relative_url }}">year</a> · <a href="{{ '/feed.xml' | relative_url }}">RSS</a></p>
{% endif %}
