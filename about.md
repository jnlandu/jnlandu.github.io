---
layout: page
title: About Me
description: AI Master's student passionate about Mathematics, Machine Learning, and Mathematical Modeling
permalink: /about/
---

<section id="about" class="about-section">
  <div class="about-content">
    <header class="posts-header">
      <div>
        <div class="posts-eyebrow">About</div>
        <h1 class="posts-title">Jérémie N. Mabiala</h1>
        <p class="posts-subtitle">AI Master's Student & Mathematician — AIMS Senegal</p>
      </div>
    </header>

    <div class="about-split">
      <div class="about-left">
        <img 
          src="{{ '/profile4.png' | relative_url }}" 
          alt="{{ site.profile_alt | default: site.title }}"
          class="about-portrait"
          loading="lazy"
        >
      </div>
      <div class="about-right">
        {% include bio.html %}
      </div>
    </div>
  </div>
</section>

<section id="education" class="about-section">
  <div class="about-content">
    <header class="posts-header">
      <div>
        <div class="posts-eyebrow">Education</div>
        <h2 class="posts-title">Education</h2>
        <p class="posts-subtitle">Formal training focused on AI, mathematical sciences, and rigorous problem solving.</p>
      </div>
    </header>

    <div class="resume-grid" data-animate="stagger">
      <div class="resume-timeline">
        <div class="resume-item">
          <div class="resume-top">
            <span class="resume-role">MSc in Artificial Intelligence</span>
            <span class="resume-date">2024 – Present</span>
          </div>
          <div class="resume-company">African Institute for Mathematical Sciences (AIMS), Senegal</div>
        </div>
        <div class="resume-item">
          <div class="resume-top">
            <span class="resume-role">MSc in Mathematical Sciences</span>
            <span class="resume-date">2023 – 2024</span>
          </div>
          <div class="resume-company">Stellenbosch University & AIMS South Africa</div>
          <p class="resume-desc">Awarded the fully funded AIMS scholarship for academic excellence.</p>
        </div>
        <div class="resume-item">
          <div class="resume-top">
            <span class="resume-role">BSc in Mathematics</span>
            <span class="resume-date">2015 – 2021</span>
          </div>
          <div class="resume-company">University of Kinshasa, Kinshsas, DR Congo</div>
        </div>
      </div>

      <div class="resume-aside">
        <h3 class="mb-1">Focus Areas</h3>
        <div class="skills-grid">
          <span class="tag chip">NLP</span>
          <span class="tag chip">Computer Vision</span>
          <span class="tag chip">MLOps</span>
          <span class="tag chip">Biostatistics</span>
          <span class="tag chip">Mathematical Modelling</span>
          <span class="tag chip">Network Analysis</span>
          <span class="tag chip">Data Analysis</span>
          <span class="tag chip">Statistical Modelling</span>
          <span class="tag chip">Advanced Python</span>
          <span class="tag chip">Probability</span>
          <span class="tag chip">Statistics</span>
          <span class="tag chip">Databases</span>
          <span class="tag chip">Programming</span>
          <span class="tag chip">Algorithmics</span>
          <span class="tag chip">Optimization</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="resume" class="about-section">
  <div class="about-content">
    <header class="posts-header">
      <div>
        <div class="posts-eyebrow">Experience</div>
        <h2 class="posts-title">Experience & Skills</h2>
        <p class="posts-subtitle">A snapshot of roles, projects, and tools I use day-to-day.</p>
      </div>
    </header>

    <div class="resume-grid" data-animate="stagger">
      <div class="resume-timeline">
        <div class="resume-item">
          <div class="resume-top">
            <span class="resume-role">Teaching Assistant in Machine Learning</span>
            <span class="resume-date">Feb 2025 — Present</span>
          </div>
          <div class="resume-company">AIMS, Senegal</div>
            <p class="resume-desc">Conducted <strong>intensive bootcamps</strong> in Advanced Linear Algebra, Python Programming, and PyTorch.</p>
        </div>
        <div class="resume-item">
          <div class="resume-top">
            <span class="resume-role">Assistant lecturer</span>
            <span class="resume-date">2022 — 2023</span>
          </div>
          <div class="resume-company">University of Kinshasa • School of Maths, Statistics, & Computer Science</div>
            <p class="resume-desc">Taught undergraduate courses in <em><strong>Real Analysis</em></strong> and  <strong><em>Linear Algebra</strong></em>.</p>
        </div>
      </div>

      <div class="resume-aside">
        <h3 class="mb-1">Core Skills</h3>
        <div class="skills-grid">
          <span class="tag chip">Python</span>
          <span class="tag chip">FastAPI</span>
          <span class="tag chip">PyTorch</span>
          <span class="tag chip">TensorFlow</span>
          <span class="tag chip">NLP</span>
          <span class="tag chip">Time-series</span>
          <span class="tag chip">Statistics</span>
          <span class="tag chip">JAX</span>
          <span class="tag chip">Pandas</span>
          <span class="tag chip">Docker</span>
        </div>
        <h3 class="mt-2 mb-1">Links</h3>
        <div class="resume-actions">
            <a href="#about" class="btn btn-secondary"><i class="fas fa-id-card"></i> View Bio</a>
            <a href="{{ '/contact/' | relative_url }}" class="btn btn-secondary"><i class="fas fa-paper-plane"></i> Contact</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="more" class="about-section">
  <div class="about-content">
    <header class="posts-header">
      <div>
        <div class="posts-eyebrow">Extras</div>
        <h2 class="posts-title">Beyond Work</h2>
        <p class="posts-subtitle">A few things I enjoy when I'm not studying or teaching.</p>
      </div>
    </header>

    <div class="skills-grid">
      <span class="tag chip">Writing</span>
      <span class="tag chip">Teaching</span>
      <span class="tag chip">Open Source</span>
      <span class="tag chip">Reading</span>
      <span class="tag chip">Mentoring</span>
    </div>

    <div class="resume-actions" style="margin-top:1.5rem;">
      <a href="{{ '/assets/static/resume.pdf' | relative_url }}" class="btn btn-primary" download>
        <i class="fas fa-file-download"></i>
        Download CV
      </a>
      <a href="{{ '/projects/' | relative_url }}" class="btn btn-secondary">
        <i class="fas fa-code"></i>
        View Projects
      </a>
    </div>
  </div>
</section>