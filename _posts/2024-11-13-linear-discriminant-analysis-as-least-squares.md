---
layout: post
title: "Deriving Linear Discriminant Analysis as a Least Squares Problem"
toc: false
author: Jeremie Mabiala
author_profile: "./assets/static/logo.jpeg"
summary: >-
  Fisher's LDA and ordinary least squares look like they have nothing to do
  with each other. With the right label encoding, they find exactly the same
  projection direction. Here is the derivation, and why I think it is useful.
tags: [machine-learning, linear-algebra, classification, optimization]
redirect_from:
  - /posts/lda-as-ols-en
  - /2024/11/13/lda-as-ols-en/
last_modified_at: 2025-05-01
---

Linear Discriminant Analysis (LDA) and Ordinary Least Squares (OLS) regression
usually live in different chapters of the textbook. LDA is a classifier: it looks
for a projection that pulls two classes as far apart as possible. OLS is a
regressor: it fits a linear function to continuous targets by minimising squared
errors.

When I first saw that these two methods are secretly solving the same linear
system, I was surprised. It is a classical fact (you can find it in Bishop's
book, for instance), but the textbook derivation goes by quickly, and I wanted to
see every step. So let's slow down and do it properly. The punchline is that, for
two classes and a carefully chosen encoding of the labels, OLS gives exactly
the same projection direction as Fisher's LDA. Along the way, we will see the
scatter matrices of LDA appear on their own from the regression equations, which
I find quite satisfying.

## Fisher's Linear Discriminant Analysis

### Setup

Let $\lbrace \mathbf{x}_n, c_n\rbrace _{n=1}^{N}$ be a labelled dataset in $\mathbb{R}^d$ with
two classes $C_1$ and $C_2$, containing $N_1$ and $N_2$ samples
($N_1 + N_2 = N$). The class means are

$$\mathbf{m}_k = \frac{1}{N_k}\sum_{n \in C_k} \mathbf{x}_n, \qquad k = 1, 2,$$

and the overall mean is $\mathbf{m} = \frac{1}{N}\sum_{n=1}^{N}\mathbf{x}_n = \frac{N_1}{N}\mathbf{m}_1 + \frac{N_2}{N}\mathbf{m}_2$.

<figure style="margin: 2rem 0;">
<svg viewBox="0 0 560 300" role="img" aria-labelledby="setup-title setup-desc" style="width:100%; max-width:560px; display:block; margin:0 auto; color:var(--fg);">
  <title id="setup-title">Two classes, their means, and the overall mean</title>
  <desc id="setup-desc">A larger class C1 and a smaller class C2 of points in the plane. Each class mean is marked with a cross. The overall mean m lies on the segment joining the two class means, closer to the larger class.</desc>
  <ellipse cx="243.6" cy="137.3" rx="124.9" ry="67.3" transform="rotate(-36.7 243.6 137.3)" fill="#e0623a" fill-opacity="0.07" stroke="#e0623a" stroke-opacity="0.5" stroke-dasharray="4 3"/>
  <circle cx="252.3" cy="75.4" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="196.9" cy="110.6" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="233.2" cy="142.9" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="349.7" cy="73.7" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="244.8" cy="99.0" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="308.0" cy="100.0" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="278.9" cy="149.9" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="227.3" cy="152.5" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="175.2" cy="217.8" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="159.3" cy="175.6" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="237.8" cy="143.1" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="250.9" cy="176.7" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="242.9" cy="119.1" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="287.7" cy="140.9" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="225.6" cy="214.7" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="220.0" cy="224.3" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="170.5" cy="118.3" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="128.3" cy="149.3" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="264.8" cy="130.5" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="271.9" cy="94.6" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="303.6" cy="109.7" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="215.2" cy="164.5" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="193.9" cy="152.3" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="204.7" cy="104.1" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="146.2" cy="214.9" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="195.7" cy="231.3" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="349.8" cy="173.5" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="231.9" cy="153.8" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="336.5" cy="163.1" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="305.0" cy="128.6" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="238.8" cy="156.3" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="281.7" cy="155.0" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="242.9" cy="114.6" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="346.5" cy="174.9" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="329.5" cy="52.1" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="221.0" cy="126.4" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="222.0" cy="73.7" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="258.5" cy="129.6" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="234.8" cy="139.8" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="237.6" cy="165.0" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="358.2" cy="150.3" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="52.5" cy="219.6" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="239.2" cy="115.5" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="236.1" cy="137.2" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="265.1" cy="80.5" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="223.0" cy="151.9" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="351.9" cy="58.2" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="194.0" cy="60.1" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="289.0" cy="130.3" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="183.8" cy="143.6" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="202.2" cy="188.0" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="177.2" cy="177.9" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="306.9" cy="116.1" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="168.9" cy="135.9" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="250.7" cy="91.9" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="312.0" cy="103.5" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="239.3" cy="131.7" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="185.9" cy="128.2" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="321.2" cy="86.0" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <circle cx="234.3" cy="142.3" r="2.6" fill="#e0623a" fill-opacity="0.7"/>
  <ellipse cx="421.4" cy="157.1" rx="108.7" ry="71.6" transform="rotate(-125.8 421.4 157.1)" fill="#2f8fd8" fill-opacity="0.07" stroke="#2f8fd8" stroke-opacity="0.5" stroke-dasharray="4 3"/>
  <circle cx="393.6" cy="174.1" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="410.0" cy="182.8" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="408.4" cy="215.3" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="442.3" cy="156.4" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="377.6" cy="234.7" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="426.9" cy="102.1" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="395.7" cy="160.4" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="402.8" cy="112.1" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="387.8" cy="90.7" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="414.2" cy="104.7" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="428.7" cy="163.2" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="363.6" cy="155.9" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="416.0" cy="117.5" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="437.8" cy="188.1" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="444.9" cy="115.1" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="420.9" cy="169.2" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="410.3" cy="108.2" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="450.4" cy="204.1" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="443.4" cy="180.7" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="394.9" cy="82.2" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="462.6" cy="200.0" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="430.7" cy="130.9" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="399.7" cy="145.8" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="456.0" cy="245.3" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="441.4" cy="124.8" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="449.0" cy="222.1" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="441.0" cy="197.0" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="451.8" cy="135.3" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="436.6" cy="190.7" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <circle cx="401.8" cy="102.6" r="2.6" fill="#2f8fd8" fill-opacity="0.7"/>
  <line x1="243.6" y1="137.3" x2="421.4" y2="157.1" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
  <path d="M236.6,130.3 L250.6,144.3 M236.6,144.3 L250.6,130.3" stroke="currentColor" stroke-width="2.5"/>
  <text x="243.6" y="123.3" font-size="16" text-anchor="middle" font-weight="bold" fill="currentColor">m₁</text>
  <path d="M414.4,150.1 L428.4,164.1 M414.4,164.1 L428.4,150.1" stroke="currentColor" stroke-width="2.5"/>
  <text x="421.4" y="143.1" font-size="16" text-anchor="middle" font-weight="bold" fill="currentColor">m₂</text>
  <circle cx="302.8" cy="143.9" r="5.5" fill="var(--bg)" stroke="currentColor" stroke-width="2.5"/>
  <text x="302.8" y="167.9" font-size="16" text-anchor="middle" font-weight="bold" fill="currentColor">m</text>
  <text x="243.6" y="35.3" font-size="15" text-anchor="middle" fill="#e0623a">class C₁ · N₁ = 60 points</text>
  <text x="421.4" y="274.7" font-size="15" text-anchor="middle" fill="#2f8fd8">class C₂ · N₂ = 30 points</text>
</svg>
  <figcaption class="small" style="text-align:center; margin-top:.6rem;">
    The setup in $d = 2$. Each cross is a class mean; the dashed curves outline
    where most points of each class lie. The overall mean $\mathbf{m}$ sits on the
    segment between $\mathbf{m}_1$ and $\mathbf{m}_2$, pulled towards the larger class.
  </figcaption>
</figure>

### The Fisher criterion

We want a direction $\mathbf{w} \in \mathbb{R}^d$ such that the projections
$y_n = \mathbf{w}^{\top}\mathbf{x}_n$ of the two classes are well separated.
Fisher's idea was to make the class means far apart *relative to* the spread
inside each class. He wrote this as the ratio

$$J(\mathbf{w}) = \frac{\mathbf{w}^{\top} S_B\, \mathbf{w}}{\mathbf{w}^{\top} S_W\, \mathbf{w}}, \tag{1}$$

where the **between-class scatter matrix** is

$$S_B = (\mathbf{m}_1 - \mathbf{m}_2)(\mathbf{m}_1 - \mathbf{m}_2)^{\top},$$

and the **within-class scatter matrix** is

$$S_W = \sum_{k=1}^{2}\sum_{n \in C_k}(\mathbf{x}_n - \mathbf{m}_k)(\mathbf{x}_n - \mathbf{m}_k)^{\top}.$$

### The LDA solution

Setting the gradient of $J$ to zero (or using [Lagrange multipliers](https://en.wikipedia.org/wiki/Lagrange_multiplier)) leads to the
generalised eigenvalue problem

$$S_B\,\mathbf{w} = \lambda\, S_W\,\mathbf{w}. \tag{2}$$

There is a nice shortcut here. Whatever $\mathbf{w}$ is, $S_B\,\mathbf{w}$ always
points along $(\mathbf{m}_1 - \mathbf{m}_2)$, because $S_B$ has rank one. So we
do not need to solve an eigenvalue problem at all:

$$\boxed{\mathbf{w}^{\ast} \propto S_W^{-1}(\mathbf{m}_1 - \mathbf{m}_2).} \tag{3}$$

To classify a point, we project it onto $\mathbf{w}^{\ast}$ and assign it to the class
whose projected mean is closest. Keep formula (3) in mind; we are going to meet
it again from a very different direction.

It helps to see what $S_W^{-1}$ is doing. When the classes are stretched in some
direction, simply projecting onto $\mathbf{m}_1 - \mathbf{m}_2$ mixes them up. Fisher's
direction tilts the projection so that each class becomes narrow on the line:

<figure style="margin: 2rem 0;">
<svg viewBox="0 0 640 306" role="img" aria-labelledby="lda-title lda-desc" style="width:100%; max-width:640px; display:block; margin:0 auto; color:var(--fg);">
  <title id="lda-title">Fisher's linear discriminant: two projections of the same data</title>
  <desc id="lda-desc">Two elongated classes of points. On the left they are projected onto the difference of their means, and the two histograms overlap heavily. On the right they are projected onto Fisher's direction, and the histograms are clearly separated.</desc>
  <defs><marker id="lda-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
  <text x="150.0" y="14" font-size="14" text-anchor="middle" fill="currentColor">Projection onto m₁ − m₂</text>
  <rect x="0" y="22" width="300" height="190" fill="none" stroke="currentColor" stroke-opacity="0.25"/>
  <circle cx="129.5" cy="121.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="130.3" cy="129.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="111.6" cy="145.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="165.9" cy="89.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="163.9" cy="92.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="146.8" cy="109.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="92.0" cy="152.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="149.8" cy="103.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="91.3" cy="180.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="112.7" cy="147.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="144.4" cy="113.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="150.2" cy="114.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="144.5" cy="109.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="118.7" cy="119.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="151.1" cy="94.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="119.8" cy="143.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="127.2" cy="130.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="153.1" cy="102.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="124.4" cy="141.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="122.5" cy="120.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="114.8" cy="138.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="147.7" cy="126.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="137.6" cy="106.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="82.8" cy="173.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="133.5" cy="132.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="149.5" cy="109.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="97.4" cy="148.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="154.1" cy="94.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="174.6" cy="81.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="139.5" cy="131.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="152.7" cy="112.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="124.3" cy="145.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="110.6" cy="150.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="170.6" cy="110.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="97.6" cy="154.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="174.7" cy="79.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="85.8" cy="193.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="145.8" cy="119.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="106.5" cy="138.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="165.6" cy="92.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="142.9" cy="110.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="178.7" cy="75.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="150.1" cy="102.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="94.6" cy="145.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="161.7" cy="92.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="83.8" cy="175.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="158.7" cy="119.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="131.4" cy="114.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="101.5" cy="136.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="151.0" cy="108.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="145.0" cy="106.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="139.5" cy="106.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="118.7" cy="141.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="164.0" cy="95.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="112.9" cy="132.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="175.3" cy="89.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="99.6" cy="156.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="132.4" cy="127.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="173.7" cy="97.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="169.8" cy="103.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="115.4" cy="133.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="166.3" cy="84.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="145.5" cy="110.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="140.4" cy="111.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="131.6" cy="122.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="151.5" cy="106.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="156.6" cy="96.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="189.8" cy="68.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="124.9" cy="135.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="136.0" cy="111.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="127.4" cy="125.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="185.2" cy="102.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="106.4" cy="145.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="146.9" cy="108.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="124.9" cy="124.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="143.8" cy="119.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="200.9" cy="57.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="121.6" cy="135.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="130.3" cy="127.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="63.8" cy="192.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="163.1" cy="108.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="134.5" cy="112.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="159.1" cy="84.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="91.1" cy="166.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="127.3" cy="122.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="165.3" cy="122.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="165.3" cy="109.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="154.5" cy="119.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="141.0" cy="104.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="132.3" cy="122.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="184.4" cy="96.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="160.9" cy="103.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="191.1" cy="94.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="236.2" cy="62.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="187.5" cy="97.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="166.7" cy="106.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="169.1" cy="105.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="122.6" cy="170.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="179.6" cy="112.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="135.9" cy="157.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="196.9" cy="78.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="202.4" cy="91.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="163.3" cy="129.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="183.6" cy="82.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="139.6" cy="123.0" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="189.5" cy="95.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="110.8" cy="151.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="160.7" cy="126.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="173.8" cy="103.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="203.1" cy="91.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="193.4" cy="74.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="201.8" cy="83.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="143.4" cy="125.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="166.3" cy="113.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="201.1" cy="85.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="102.2" cy="177.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="113.9" cy="154.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="171.7" cy="116.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="163.0" cy="109.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="165.3" cy="101.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="161.6" cy="108.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="202.9" cy="64.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="145.4" cy="124.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="113.3" cy="174.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="111.0" cy="154.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="130.5" cy="147.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="158.1" cy="122.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="147.5" cy="129.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="210.8" cy="73.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="177.3" cy="94.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="158.0" cy="135.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="148.5" cy="119.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="119.5" cy="164.0" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="190.0" cy="84.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="163.4" cy="108.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="167.6" cy="125.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="121.6" cy="162.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="187.8" cy="100.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="139.2" cy="147.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="122.5" cy="156.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="131.9" cy="142.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="100.5" cy="171.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="146.2" cy="153.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="182.5" cy="102.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="103.9" cy="181.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="171.0" cy="115.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="184.0" cy="90.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="180.9" cy="97.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="198.7" cy="78.0" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="175.2" cy="128.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="187.1" cy="81.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="155.3" cy="129.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="214.8" cy="88.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="175.7" cy="80.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="138.6" cy="133.0" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="213.4" cy="72.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="178.1" cy="94.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="139.1" cy="140.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="171.0" cy="101.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="162.3" cy="120.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="136.2" cy="146.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="186.9" cy="94.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="140.5" cy="147.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="234.1" cy="40.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="180.2" cy="128.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="179.7" cy="97.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="208.0" cy="71.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="161.4" cy="113.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="111.5" cy="154.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="171.9" cy="116.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="198.5" cy="66.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="125.9" cy="158.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="171.0" cy="108.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="152.6" cy="137.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="219.6" cy="54.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="131.5" cy="160.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="208.5" cy="65.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="211.6" cy="64.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="140.0" cy="136.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="105.8" cy="178.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <line x1="98.1" y1="127.5" x2="204.0" y2="108.0" stroke="currentColor" stroke-width="2" marker-end="url(#lda-arr)"/>
  <rect x="10.0" y="289.1" width="12.7" height="4.9" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="35.5" y="279.2" width="12.7" height="14.8" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="48.2" y="279.2" width="12.7" height="14.8" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="60.9" y="274.3" width="12.7" height="19.7" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="73.6" y="279.2" width="12.7" height="14.8" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="86.4" y="264.5" width="12.7" height="29.5" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="99.1" y="254.6" width="12.7" height="39.4" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="111.8" y="244.8" width="12.7" height="49.2" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="124.5" y="264.5" width="12.7" height="29.5" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="137.3" y="230.0" width="12.7" height="64.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="150.0" y="244.8" width="12.7" height="49.2" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="162.7" y="254.6" width="12.7" height="39.4" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="175.5" y="259.5" width="12.7" height="34.5" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="188.2" y="274.3" width="12.7" height="19.7" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="200.9" y="284.2" width="12.7" height="9.8" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="213.6" y="289.1" width="12.7" height="4.9" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="226.4" y="289.1" width="12.7" height="4.9" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="60.9" y="274.3" width="12.7" height="19.7" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="73.6" y="289.1" width="12.7" height="4.9" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="86.4" y="264.5" width="12.7" height="29.5" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="99.1" y="279.2" width="12.7" height="14.8" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="111.8" y="269.4" width="12.7" height="24.6" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="124.5" y="259.5" width="12.7" height="34.5" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="137.3" y="269.4" width="12.7" height="24.6" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="150.0" y="279.2" width="12.7" height="14.8" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="162.7" y="244.8" width="12.7" height="49.2" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="175.5" y="249.7" width="12.7" height="44.3" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="188.2" y="254.6" width="12.7" height="39.4" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="200.9" y="249.7" width="12.7" height="44.3" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="213.6" y="279.2" width="12.7" height="14.8" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="226.4" y="259.5" width="12.7" height="34.5" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="239.1" y="269.4" width="12.7" height="24.6" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="251.8" y="284.2" width="12.7" height="9.8" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="264.5" y="289.1" width="12.7" height="4.9" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="277.3" y="284.2" width="12.7" height="9.8" fill="#2f8fd8" fill-opacity="0.45"/>
  <line x1="0" y1="294" x2="300" y2="294" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="490.0" y="14" font-size="14" text-anchor="middle" fill="currentColor">Projection onto Fisher’s w*</text>
  <rect x="340" y="22" width="300" height="190" fill="none" stroke="currentColor" stroke-opacity="0.25"/>
  <circle cx="469.5" cy="121.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="470.3" cy="129.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="451.6" cy="145.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="505.9" cy="89.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="503.9" cy="92.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="486.8" cy="109.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="432.0" cy="152.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="489.8" cy="103.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="431.3" cy="180.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="452.7" cy="147.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="484.4" cy="113.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="490.2" cy="114.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="484.5" cy="109.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="458.7" cy="119.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="491.1" cy="94.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="459.8" cy="143.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="467.2" cy="130.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="493.1" cy="102.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="464.4" cy="141.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="462.5" cy="120.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="454.8" cy="138.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="487.7" cy="126.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="477.6" cy="106.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="422.8" cy="173.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="473.5" cy="132.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="489.5" cy="109.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="437.4" cy="148.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="494.1" cy="94.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="514.6" cy="81.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="479.5" cy="131.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="492.7" cy="112.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="464.3" cy="145.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="450.6" cy="150.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="510.6" cy="110.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="437.6" cy="154.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="514.7" cy="79.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="425.8" cy="193.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="485.8" cy="119.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="446.5" cy="138.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="505.6" cy="92.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="482.9" cy="110.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="518.7" cy="75.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="490.1" cy="102.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="434.6" cy="145.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="501.7" cy="92.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="423.8" cy="175.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="498.7" cy="119.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="471.4" cy="114.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="441.5" cy="136.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="491.0" cy="108.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="485.0" cy="106.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="479.5" cy="106.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="458.7" cy="141.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="504.0" cy="95.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="452.9" cy="132.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="515.3" cy="89.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="439.6" cy="156.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="472.4" cy="127.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="513.7" cy="97.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="509.8" cy="103.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="455.4" cy="133.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="506.3" cy="84.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="485.5" cy="110.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="480.4" cy="111.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="471.6" cy="122.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="491.5" cy="106.9" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="496.6" cy="96.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="529.8" cy="68.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="464.9" cy="135.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="476.0" cy="111.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="467.4" cy="125.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="525.2" cy="102.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="446.4" cy="145.8" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="486.9" cy="108.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="464.9" cy="124.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="483.8" cy="119.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="540.9" cy="57.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="461.6" cy="135.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="470.3" cy="127.0" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="403.8" cy="192.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="503.1" cy="108.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="474.5" cy="112.6" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="499.1" cy="84.4" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="431.1" cy="166.2" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="467.3" cy="122.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="505.3" cy="122.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="505.3" cy="109.3" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="494.5" cy="119.7" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="481.0" cy="104.1" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="472.3" cy="122.5" r="2.4" fill="#e0623a" fill-opacity="0.75"/>
  <circle cx="524.4" cy="96.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="500.9" cy="103.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="531.1" cy="94.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="576.2" cy="62.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="527.5" cy="97.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="506.7" cy="106.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="509.1" cy="105.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="462.6" cy="170.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="519.6" cy="112.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="475.9" cy="157.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="536.9" cy="78.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="542.4" cy="91.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="503.3" cy="129.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="523.6" cy="82.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="479.6" cy="123.0" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="529.5" cy="95.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="450.8" cy="151.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="500.7" cy="126.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="513.8" cy="103.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="543.1" cy="91.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="533.4" cy="74.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="541.8" cy="83.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="483.4" cy="125.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="506.3" cy="113.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="541.1" cy="85.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="442.2" cy="177.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="453.9" cy="154.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="511.7" cy="116.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="503.0" cy="109.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="505.3" cy="101.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="501.6" cy="108.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="542.9" cy="64.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="485.4" cy="124.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="453.3" cy="174.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="451.0" cy="154.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="470.5" cy="147.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="498.1" cy="122.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="487.5" cy="129.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="550.8" cy="73.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="517.3" cy="94.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="498.0" cy="135.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="488.5" cy="119.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="459.5" cy="164.0" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="530.0" cy="84.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="503.4" cy="108.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="507.6" cy="125.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="461.6" cy="162.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="527.8" cy="100.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="479.2" cy="147.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="462.5" cy="156.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="471.9" cy="142.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="440.5" cy="171.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="486.2" cy="153.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="522.5" cy="102.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="443.9" cy="181.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="511.0" cy="115.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="524.0" cy="90.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="520.9" cy="97.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="538.7" cy="78.0" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="515.2" cy="128.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="527.1" cy="81.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="495.3" cy="129.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="554.8" cy="88.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="515.7" cy="80.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="478.6" cy="133.0" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="553.4" cy="72.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="518.1" cy="94.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="479.1" cy="140.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="511.0" cy="101.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="502.3" cy="120.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="476.2" cy="146.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="526.9" cy="94.6" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="480.5" cy="147.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="574.1" cy="40.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="520.2" cy="128.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="519.7" cy="97.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="548.0" cy="71.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="501.4" cy="113.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="451.5" cy="154.3" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="511.9" cy="116.9" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="538.5" cy="66.2" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="465.9" cy="158.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="511.0" cy="108.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="492.6" cy="137.4" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="559.6" cy="54.8" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="471.5" cy="160.7" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="548.5" cy="65.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="551.6" cy="64.5" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="480.0" cy="136.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <circle cx="445.8" cy="178.1" r="2.4" fill="#2f8fd8" fill-opacity="0.75"/>
  <line x1="451.5" y1="81.3" x2="530.6" y2="154.3" stroke="currentColor" stroke-width="2" marker-end="url(#lda-arr)"/>
  <rect x="350.0" y="282.0" width="12.7" height="12.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="362.7" y="290.0" width="12.7" height="4.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="375.5" y="274.0" width="12.7" height="20.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="388.2" y="254.0" width="12.7" height="40.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="400.9" y="254.0" width="12.7" height="40.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="413.6" y="238.0" width="12.7" height="56.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="426.4" y="230.0" width="12.7" height="64.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="439.1" y="258.0" width="12.7" height="36.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="451.8" y="266.0" width="12.7" height="28.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="464.5" y="282.0" width="12.7" height="12.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="477.3" y="290.0" width="12.7" height="4.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="490.0" y="266.0" width="12.7" height="28.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="502.7" y="290.0" width="12.7" height="4.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="515.5" y="290.0" width="12.7" height="4.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="540.9" y="290.0" width="12.7" height="4.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="553.6" y="290.0" width="12.7" height="4.0" fill="#e0623a" fill-opacity="0.45"/>
  <rect x="439.1" y="282.0" width="12.7" height="12.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="451.8" y="278.0" width="12.7" height="16.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="464.5" y="270.0" width="12.7" height="24.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="477.3" y="270.0" width="12.7" height="24.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="490.0" y="254.0" width="12.7" height="40.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="502.7" y="250.0" width="12.7" height="44.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="515.5" y="238.0" width="12.7" height="56.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="528.2" y="266.0" width="12.7" height="28.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="540.9" y="250.0" width="12.7" height="44.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="553.6" y="262.0" width="12.7" height="32.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="566.4" y="282.0" width="12.7" height="12.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="579.1" y="282.0" width="12.7" height="12.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="604.5" y="286.0" width="12.7" height="8.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <rect x="617.3" y="286.0" width="12.7" height="8.0" fill="#2f8fd8" fill-opacity="0.45"/>
  <line x1="340" y1="294" x2="640" y2="294" stroke="currentColor" stroke-opacity="0.5"/>
</svg>
  <figcaption class="small" style="text-align:center; margin-top:.6rem;">
    The same simulated data, projected two ways. Left: onto the difference of the
    class means, where the two histograms overlap heavily. Right: onto Fisher's
    direction $\mathbf{w}^{\ast} \propto S_W^{-1}(\mathbf{m}_1 - \mathbf{m}_2)$, where they separate.
  </figcaption>
</figure>

## Now, Least Squares

### Encoding the labels

Here is the trick. Instead of the discrete labels $c_n \in \lbrace C_1, C_2\rbrace $, we use
real-valued targets

$$t_n = \begin{cases} \dfrac{N}{N_1} & \text{if } \mathbf{x}_n \in C_1, \\[6pt] -\dfrac{N}{N_2} & \text{if } \mathbf{x}_n \in C_2. \end{cases} \tag{4}$$

This choice looks a bit strange at first, but it is not arbitrary. Its main
property is that the targets have zero mean:

$$\sum_{n=1}^{N} t_n = N_1 \cdot \frac{N}{N_1} + N_2 \cdot \left(-\frac{N}{N_2}\right) = N - N = 0.$$

We will use this fact in a moment.

### The objective

We fit an affine model $\hat{y}_n = \mathbf{w}^{\top}\mathbf{x}_n + w_0$ by
minimising the sum of squared errors:

$$E(\mathbf{w}, w_0) = \frac{1}{2}\sum_{n=1}^{N}\left(\mathbf{w}^{\top}\mathbf{x}_n + w_0 - t_n\right)^2. \tag{5}$$

## Deriving the Normal Equations

Let us take the derivatives one at a time, starting with the easy one.

### The bias $w_0$

Setting $\partial E / \partial w_0 = 0$ gives

$$\sum_{n=1}^{N}\left(\mathbf{w}^{\top}\mathbf{x}_n + w_0 - t_n\right) = 0.$$

This is where the zero-mean targets pay off. Using $\sum_n t_n = 0$ and
$\sum_n \mathbf{x}_n = N\mathbf{m}$, we get

$$N w_0 + \mathbf{w}^{\top}(N\mathbf{m}) = 0 \implies \boxed{w_0 = -\mathbf{w}^{\top}\mathbf{m}.} \tag{6}$$

In words: the bias simply recentres the data at the overall mean.

### The weights $\mathbf{w}$

Now set $\partial E / \partial \mathbf{w} = 0$:

$$\sum_{n=1}^{N}\left(\mathbf{w}^{\top}\mathbf{x}_n + w_0 - t_n\right)\mathbf{x}_n = \mathbf{0}.$$

Plugging in $w_0 = -\mathbf{w}^{\top}\mathbf{m}$,

$$\sum_{n=1}^{N}\left(\mathbf{w}^{\top}(\mathbf{x}_n - \mathbf{m}) - t_n\right)\mathbf{x}_n = \mathbf{0},$$

and expanding,

$$\left(\sum_{n=1}^{N}\mathbf{x}_n\mathbf{x}_n^{\top}\right)\mathbf{w}
  - N\mathbf{m}\mathbf{m}^{\top}\mathbf{w}
  = \sum_{n=1}^{N} t_n \mathbf{x}_n.$$

The matrix on the left is something we know: it is the **total scatter matrix**,

$$S_T = \sum_{n=1}^{N}(\mathbf{x}_n - \mathbf{m})(\mathbf{x}_n - \mathbf{m})^{\top}
     = \sum_{n=1}^{N}\mathbf{x}_n\mathbf{x}_n^{\top} - N\mathbf{m}\mathbf{m}^{\top}.$$

The right-hand side also simplifies nicely, thanks again to our encoding:

$$\sum_{n=1}^{N} t_n \mathbf{x}_n
  = \frac{N}{N_1}\sum_{n \in C_1}\mathbf{x}_n - \frac{N}{N_2}\sum_{n \in C_2}\mathbf{x}_n
  = \frac{N}{N_1}\cdot N_1\mathbf{m}_1 - \frac{N}{N_2}\cdot N_2\mathbf{m}_2
  = N(\mathbf{m}_1 - \mathbf{m}_2).$$

So the normal equation becomes

$$\boxed{S_T\,\mathbf{w} = N(\mathbf{m}_1 - \mathbf{m}_2).} \tag{7}$$

This is the normal equation of least squares, written for our centred problem.
If you want to see where normal equations come from in general, step by step from
data points to their meaning as an orthogonal projection, I wrote about it in
[a separate post]({% post_url 2024-08-14-equation-normale-moindres-carres %}) (in French).

This already looks a lot like the LDA formula (3). The only difference is that we have
$S_T$ where LDA has $S_W$. The next step is to show that this difference does not
matter for the direction.

## From $S_T$ Back to $S_W$

The total scatter splits into a within-class part and a between-class part:

$$S_T = S_W + S_B^{(\text{full})}, \tag{8}$$

where the **full between-class scatter** is

$$S_B^{(\text{full})} = \sum_{k=1}^{2} N_k(\mathbf{m}_k - \mathbf{m})(\mathbf{m}_k - \mathbf{m})^{\top}.$$

I claim that $S_B^{(\text{full})}\,\mathbf{w}$ always points along
$(\mathbf{m}_1 - \mathbf{m}_2)$, just like $S_B\,\mathbf{w}$ did. To see this,
use $\mathbf{m} = \frac{N_1}{N}\mathbf{m}_1 + \frac{N_2}{N}\mathbf{m}_2$ to write

$$\mathbf{m}_1 - \mathbf{m} = \frac{N_2}{N}(\mathbf{m}_1 - \mathbf{m}_2),
  \qquad \mathbf{m}_2 - \mathbf{m} = -\frac{N_1}{N}(\mathbf{m}_1 - \mathbf{m}_2).$$

Substituting both into $S_B^{(\text{full})}$,

$$S_B^{(\text{full})}\,\mathbf{w}
  = N_1\frac{N_2^2}{N^2}\left[(\mathbf{m}_1-\mathbf{m}_2)(\mathbf{m}_1-\mathbf{m}_2)^{\top}\mathbf{w}\right]
  + N_2\frac{N_1^2}{N^2}\left[(\mathbf{m}_1-\mathbf{m}_2)(\mathbf{m}_1-\mathbf{m}_2)^{\top}\mathbf{w}\right],$$

and collecting terms,

$$S_B^{(\text{full})}\,\mathbf{w}
  = \frac{N_1 N_2}{N^2}(N_1 + N_2)\left[(\mathbf{m}_1-\mathbf{m}_2)(\mathbf{m}_1-\mathbf{m}_2)^{\top}\mathbf{w}\right]
  = \frac{N_1 N_2}{N}\,S_B\,\mathbf{w}.$$

So the claim holds. Let $\alpha$ be the scalar
$\frac{N_1 N_2}{N}(\mathbf{m}_1-\mathbf{m}_2)^{\top}\mathbf{w}$. Then

$$S_T\,\mathbf{w} = S_W\,\mathbf{w} + \alpha\,(\mathbf{m}_1 - \mathbf{m}_2).$$

Putting this back into (7),

$$S_W\,\mathbf{w} + \alpha\,(\mathbf{m}_1 - \mathbf{m}_2) = N(\mathbf{m}_1 - \mathbf{m}_2),$$

which rearranges to

$$S_W\,\mathbf{w} = (N - \alpha)(\mathbf{m}_1 - \mathbf{m}_2). \tag{9}$$

The factor $(N - \alpha)$ is just a scalar. As long as it is nonzero (which is
the case whenever the two class means differ), it only rescales $\mathbf{w}$ and
possibly flips its sign. It does not change the line we project onto. Therefore

$$\mathbf{w} \propto S_W^{-1}(\mathbf{m}_1 - \mathbf{m}_2).$$

And there it is: exactly the LDA direction (3), recovered from plain least squares.

## The Equivalence, Stated Cleanly

> **Theorem.** For binary classification with $N_1$ samples in $C_1$ and $N_2$
> samples in $C_2$, set the targets to $t_n = N/N_1$ for $C_1$ and
> $t_n = -N/N_2$ for $C_2$. Then the weight vector $\mathbf{w}^{\ast}$ that minimises
> $E(\mathbf{w}, w_0) = \frac{1}{2}\lVert \mathbf{X}\mathbf{w} + w_0\mathbf{1} - \mathbf{t}\rVert ^2$
> satisfies $\mathbf{w}^{\ast} \propto S_W^{-1}(\mathbf{m}_1 - \mathbf{m}_2)$,
> which is the Fisher LDA direction. (Here $\mathbf{X}$ stacks the vectors
> $$\mathbf{x}_n^\top$$ as rows, and $\mathbf{t}$ collects the targets.)

The proof is the derivation above. A caveat, though: the two methods agree on
the *direction* of $\mathbf{w}$, not on its length or on the intercept. OLS
gives you a specific affine model, while LDA only gives you a direction to use
with a nearest-mean rule.

## Why Should We Care?

Is this more than a nice exercise? I think so, mainly because of what it lets us
do computationally.

To hand the problem to standard solvers, it helps to write it in matrix form. Let
$\mathbf{X} \in \mathbb{R}^{N \times d}$ be the data matrix (one sample per row)
and $\mathbf{t} \in \mathbb{R}^N$ the vector of targets. The OLS problem is

$$\min_{\mathbf{w}, w_0}\; \frac{1}{2}\lVert \tilde{\mathbf{X}}\boldsymbol{\beta} - \mathbf{t}\rVert ^2,
\qquad \tilde{\mathbf{X}} = [\mathbf{X} \;\; \mathbf{1}],
\quad \boldsymbol{\beta} = \begin{pmatrix}\mathbf{w} \\ w_0\end{pmatrix},$$

with normal equation

$$\tilde{\mathbf{X}}^{\top}\tilde{\mathbf{X}}\,\boldsymbol{\beta} = \tilde{\mathbf{X}}^{\top}\mathbf{t}. \tag{10}$$

### A door to iterative solvers

The usual way to compute $\mathbf{w} = S_W^{-1}(\mathbf{m}_1 - \mathbf{m}_2)$ is
to factorise $S_W$, for example with a Cholesky decomposition, which costs
$O(d^3)$. When $d$ is large, this gets expensive, and it can be numerically
delicate when $S_W$ is badly conditioned.

Once we see LDA as a least-squares problem, we can bring in the whole toolbox for
least squares:

| Method | Cost | Good for |
|--------|------|----------|
| Cholesky (direct) | $O(d^3)$, once | small $d$ |
| Conjugate Gradients (CG) | $O(Nd)$ per iteration | large problems, sparse data |
| LSQR | $O(Nd)$ per iteration | rectangular systems, better stability |
| Randomised SVD | $O(Ndk)$ | approximate, low-rank structure |

When the feature dimension $d$ is in the thousands, forming and factorising $S_W$
is exactly what we would like to avoid. Iterative methods like CG and LSQR never
need the matrix itself: they only use products with the data, one or two per
iteration. And they tend to need far fewer than $d$ iterations in practice. The
reason is that they pick up the dominant directions of the scatter matrix first.
When its eigenvalues decay quickly, which happens a lot with real data (think of
images, where neighbouring pixels are strongly correlated), a handful of
iterations already captures most of the solution. Adding a small ridge term
$\lambda I$ helps even more: it lifts all the tiny eigenvalues up to about
$\lambda$, where they cluster together, and CG converges quickly on clustered
spectra.

### CG, written out

To make this concrete, here is CG applied to the normal equation (7):

1. Start with $\mathbf{w}_0 = \mathbf{0}$, residual $\mathbf{r}_0 = N(\mathbf{m}_1 - \mathbf{m}_2)$, and direction $\mathbf{p}_0 = \mathbf{r}_0$.
2. For $k = 0, 1, 2, \ldots$ until convergence:

$$\alpha_k = \frac{\mathbf{r}_k^{\top}\mathbf{r}_k}{\mathbf{p}_k^{\top} S_T\,\mathbf{p}_k},
\qquad \mathbf{w}_{k+1} = \mathbf{w}_k + \alpha_k\,\mathbf{p}_k,$$

$$\mathbf{r}_{k+1} = \mathbf{r}_k - \alpha_k\, S_T\,\mathbf{p}_k,
\qquad \beta_k = \frac{\mathbf{r}_{k+1}^{\top}\mathbf{r}_{k+1}}{\mathbf{r}_k^{\top}\mathbf{r}_k},
\qquad \mathbf{p}_{k+1} = \mathbf{r}_{k+1} + \beta_k\,\mathbf{p}_k.$$

(The $\alpha_k$ here is the CG step size, not the scalar $\alpha$ from earlier.)

The nice part is that we never need to form $S_T$. Each product can be computed
directly from the data as $S_T\,\mathbf{p} = \mathbf{X}_c^{\top}(\mathbf{X}_c\,\mathbf{p})$,
where $\mathbf{X}_c$ is the mean-centred data matrix. That keeps memory at
$O(Nd)$ instead of $O(d^2)$.

### Going randomised

More recently, people have pushed this idea further with *randomised* iterative
methods, which look at only one row of the data at each step. Chi and Needell [5]
start from exactly the least-squares formulation of this post and solve it with
the randomised Kaczmarz method. At each iteration, it picks one equation at random
and projects the current iterate onto the set of points that satisfy it, so it
can be read as a form of stochastic gradient descent. They show that the
resulting classifier can come close to the accuracy of LDA on the full data, and
they relate the remaining gap to properties of the data, such as its scaled
condition number and Frobenius norm, and to the step size and number of
iterations. For datasets too large to fit in memory, that is a very appealing
alternative.

## A Small Example

Let's check the formula on a toy case. Take $d = 2$, $N_1 = N_2 = 50$, and suppose

$$S_W = \begin{pmatrix}2 & 1\\ 1 & 3\end{pmatrix},
\qquad \mathbf{m}_1 - \mathbf{m}_2 = \begin{pmatrix}1 \\ 0\end{pmatrix}.$$

**LDA, directly:**

$$\mathbf{w}^{\ast} = S_W^{-1}\begin{pmatrix}1\\0\end{pmatrix}
  = \frac{1}{5}\begin{pmatrix}3 & -1\\ -1 & 2\end{pmatrix}\begin{pmatrix}1\\0\end{pmatrix}
  = \frac{1}{5}\begin{pmatrix}3\\ -1\end{pmatrix}.$$

**OLS, through the normal equation:** with balanced classes, the encoding
simplifies to $t_n = +1$ for $C_1$ and $t_n = -1$ for $C_2$. Here $N = 100$ and
$N_1 N_2 / N = 25$, so by (8)

$$S_T = S_W + 25\,S_B
  = \begin{pmatrix}2 & 1\\ 1 & 3\end{pmatrix} + 25\begin{pmatrix}1 & 0\\ 0 & 0\end{pmatrix}
  = \begin{pmatrix}27 & 1\\ 1 & 3\end{pmatrix}.$$

Solving the normal equation (7), $S_T\,\mathbf{w} = 100\,(1, 0)^{\top}$, gives

$$\mathbf{w} = \frac{100}{80}\begin{pmatrix}3 & -1\\ -1 & 27\end{pmatrix}\begin{pmatrix}1\\0\end{pmatrix}
  = \begin{pmatrix}3.75\\ -1.25\end{pmatrix}
  = 1.25\begin{pmatrix}3\\ -1\end{pmatrix}.$$

Same direction as LDA, only a different length, exactly as the theorem says.

---

So the whole story fits in one line:

> *With the right labels, LDA and OLS find the same projection direction.*

It all rests on two small facts: the zero-mean encoding
$t_n = \pm N/N_k$, and the observation that between-class scatter always pushes
along $(\mathbf{m}_1 - \mathbf{m}_2)$.

What I like about this result is that it is useful, not just pretty:

- It gives another way to compute LDA: solve a least-squares problem, with a
  direct or an iterative method.
- It makes regularised LDA natural: adding a ridge term $\lambda I$ to $S_T$
  is just $\ell_2$-regularised regression, which also helps when $d > N$ and the
  scatter matrix is singular.
- It points towards kernel LDA: you can kernelise the regression problem
  instead of kernelising Fisher's criterion directly.

Kaczmarz methods are close to what I work on, so I'd like to come back to this
system in a later post and try them on it myself, a bit like Chi and Needell [5]
did. In the meantime, if you spot a mistake, or see a cleaner way to do any of
these steps, please tell me in the comments.

## References

1. Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*, Section 4.1.5. Springer.
2. Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning*, Section 4.3. Springer.
3. Duda, R. O., Hart, P. E., & Stork, D. G. (2001). *Pattern Classification*, Chapter 3. Wiley.
4. Paige, C. C. & Saunders, M. A. (1982). LSQR: An algorithm for sparse linear equations and sparse least squares. *ACM Transactions on Mathematical Software*, 8(1), 43–71.
5. Chi, J. T. & Needell, D. (2025). Linear Discriminant Analysis with the Randomized Kaczmarz Method. *SIAM Journal on Matrix Analysis and Applications*, 46(1), 94–120. [arXiv:2211.05749](https://arxiv.org/abs/2211.05749).
