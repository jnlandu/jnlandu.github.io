---
layout: page
title: Contact
permalink: /contact/
description: Get in touch for collaborations, speaking opportunities, or general inquiries.
---

# Contact

I'm always excited to connect with fellow researchers, students, and anyone interested in artificial intelligence, machine learning, and mathematics. Whether you're looking to collaborate on research, invite me to speak at an event, or simply want to discuss the fascinating world of AI, I'd love to hear from you.

## Get in Touch

### Email

{% if site.email %}
- **Primary**: [{{ site.email.first }}](mailto:{{ site.email.first }})
{% if site.email.size > 1 %}
- **Alternative**: [{{ site.email.last }}](mailto:{{ site.email.last }})
{% endif %}
{% endif %}

### Professional Networks

{% if site.data.social %}
{% for social in site.data.social %}
{% unless social.title == 'Email' %}
- **{{ social.title }}**: [{{ social.url }}]({{ social.url }})
{% endunless %}
{% endfor %}
{% endif %}

## Location

Currently based in **Mbour, Senegal** while pursuing my studies at AIMS.

## Collaboration

I'm open to discussing:
- Research collaborations in AI/ML
- Speaking opportunities at conferences or events
- Consulting on AI projects with social impact
- Mentoring opportunities for aspiring AI researchers

Feel free to reach out if you'd like to chat about AI, mathematics, research, or anything related to technology in Africa!

## What I'm Looking For

### Research Collaborations
- Projects in theoretical machine learning
- Functional data analysis applications
- Large language model research
- Mathematical modeling initiatives

### Speaking Opportunities
- Academic conferences and workshops
- University seminars and guest lectures
- AI/ML community meetups
- Educational outreach programs

### Mentorship & Teaching
- Supervising undergraduate research projects
- Mentoring aspiring AI researchers
- Contributing to educational content
- Participating in diversity and inclusion initiatives

## Response Time

I typically respond to emails within 2-3 business days. If you have an urgent inquiry, please mention it in your subject line.

## Office Hours

As a student, I don't have formal office hours, but I'm generally available for discussions:
- **Monday-Friday**: 9:00 AM - 6:00 PM (GMT)
- **Weekend**: Limited availability for urgent matters

---

## Preferred Communication

For the best response, please:

1. **Be specific** about your inquiry or proposal
2. **Include relevant context** about your background or organization
3. **Mention any deadlines** if applicable
4. **Attach relevant documents** if discussing potential collaborations

I look forward to connecting with you and exploring how we can work together to advance the field of artificial intelligence!

---

*"The best conversations happen when curious minds meet."*
