---
layout: page
title: Blog
permalink: /blog/
---

<h1>Blog</h1>

{% if site.posts.size > 0 %}
<ul class="post-list">
    {% for post in site.posts %}
    <li class="post-item">
        <h2 class="post-title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>
        <div class="meta">
            <span class="meta-item">{{ post.date | date: "%B %d, %Y" }}</span>
            {% if post.categories %}
            <span class="meta-item">{{ post.categories | first }}</span>
            {% endif %}
        </div>
        {% if post.excerpt %}
        <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 200 }}</p>
        {% endif %}
        {% if post.tags %}
        <div class="tags">
            {% for tag in post.tags limit: 3 %}
            <span class="tag">{{ tag }}</span>
            {% endfor %}
        </div>
        {% endif %}
    </li>
    {% endfor %}
</ul>
{% else %}
<p>No posts yet.</p>
{% endif %}
