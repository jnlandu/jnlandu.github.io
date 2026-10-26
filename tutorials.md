---
layout: page
title: "Tutorials"
permalink: /tutorials/
description: "Tutorials on machine learning, mathematics, and programming."
---

{% assign tutorials = site.tutorials | sort: 'date' | reverse %}

{% if tutorials.size > 0 %}
<ul class="plain">
  {% for tutorial in tutorials %}
    <li>
      {% if tutorial.date %}<span class="date">{{ tutorial.date | date: "%b %Y" }}</span> — {% endif %}
      <a href="{{ tutorial.url | relative_url }}">{{ tutorial.title }}</a>
      {% if tutorial.video_url %} · <a href="{{ tutorial.video_url }}">video</a>{% endif %}
      {% if tutorial.summary %}<br><span class="date">{{ tutorial.summary | strip_html | truncate: 160 }}</span>{% endif %}
    </li>
  {% endfor %}
</ul>
{% else %}
<p>No tutorials yet.</p>
{% endif %}
