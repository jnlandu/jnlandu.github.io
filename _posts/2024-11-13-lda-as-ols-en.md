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
two classes and a carefully chosen encoding of the labels, OLS gives **exactly
the same projection direction** as Fisher's LDA. Along the way, we will see the
scatter matrices of LDA appear on their own from the regression equations, which
I find quite satisfying.

## Fisher's Linear Discriminant Analysis

### Setup

Let $\lbrace \mathbf{x}_n, c_n\rbrace _{n=1}^{N}$ be a labelled dataset in $\mathbb{R}^d$ with
two classes $C_1$ and $C_2$, containing $N_1$ and $N_2$ samples
($N_1 + N_2 = N$). The class means are

$$\mathbf{m}_k = \frac{1}{N_k}\sum_{n \in C_k} \mathbf{x}_n, \qquad k = 1, 2,$$

and the overall mean is $\mathbf{m} = \frac{1}{N}\sum_{n=1}^{N}\mathbf{x}_n = \frac{N_1}{N}\mathbf{m}_1 + \frac{N_2}{N}\mathbf{m}_2$.

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

Setting the gradient of $J$ to zero (or using Lagrange multipliers) leads to the
generalised eigenvalue problem

$$S_B\,\mathbf{w} = \lambda\, S_W\,\mathbf{w}. \tag{2}$$

There is a nice shortcut here. Whatever $\mathbf{w}$ is, $S_B\,\mathbf{w}$ always
points along $(\mathbf{m}_1 - \mathbf{m}_2)$, because $S_B$ has rank one. So we
do not need to solve an eigenvalue problem at all:

$$\boxed{\mathbf{w}^{\ast} \propto S_W^{-1}(\mathbf{m}_1 - \mathbf{m}_2).} \tag{3}$$

To classify a point, we project it onto $\mathbf{w}^{\ast}$ and assign it to the class
whose projected mean is closest. Keep formula (3) in mind; we are going to meet
it again from a very different direction.

## Now, Least Squares

### Encoding the labels

Here is the trick. Instead of the discrete labels $c_n \in \lbrace C_1, C_2\rbrace $, we use
real-valued targets

$$t_n = \begin{cases} \dfrac{N}{N_1} & \text{if } \mathbf{x}_n \in C_1, \\[6pt] -\dfrac{N}{N_2} & \text{if } \mathbf{x}_n \in C_2. \end{cases} \tag{4}$$

This choice looks a bit strange at first, but it is not arbitrary. Its main
property is that the targets have **zero mean**:

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
> which is the Fisher LDA direction.

The proof is the derivation above. One honest caveat: the two methods agree on
the **direction** of $\mathbf{w}$, not on its length or on the intercept. OLS
gives you a specific affine model, while LDA only gives you a direction to use
with a nearest-mean rule.

## Why Should We Care?

At this point you might reasonably ask: is this more than a nice exercise? I
think it is, mainly because of what it lets us do computationally.

### The matrix form

Write $\mathbf{X} \in \mathbb{R}^{N \times d}$ for the data matrix (one sample
per row) and $\mathbf{t} \in \mathbb{R}^N$ for the targets. The OLS problem is

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
| **Conjugate Gradients (CG)** | $O(Nd)$ per iteration | large problems, sparse data |
| **LSQR** | $O(Nd)$ per iteration | rectangular systems, better stability |
| **Randomised SVD** | $O(Ndk)$ | approximate, low-rank structure |

When the feature dimension $d$ is in the thousands and the eigenvalues of the
scatter matrix decay quickly (which happens a lot in practice), iterative methods
like CG or LSQR can reach a good solution in far fewer than $d$ iterations.

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

## A Small Example

Let's check the formula on a toy case. Take $d = 2$, $N_1 = N_2 = 50$, and suppose

$$S_W = \begin{pmatrix}2 & 1\\ 1 & 3\end{pmatrix},
\qquad \mathbf{m}_1 - \mathbf{m}_2 = \begin{pmatrix}1 \\ 0\end{pmatrix}.$$

**LDA, directly:**

$$\mathbf{w}^{\ast} = S_W^{-1}\begin{pmatrix}1\\0\end{pmatrix}
  = \frac{1}{5}\begin{pmatrix}3 & -1\\ -1 & 2\end{pmatrix}\begin{pmatrix}1\\0\end{pmatrix}
  = \frac{1}{5}\begin{pmatrix}3\\ -1\end{pmatrix}.$$

**OLS, through the normal equation:** with balanced classes, the encoding
simplifies to $t_n = +1$ for $C_1$ and $t_n = -1$ for $C_2$. Solving
$S_T\,\mathbf{w} = N(\mathbf{m}_1 - \mathbf{m}_2)$ with
$S_T = S_W + \frac{N_1 N_2}{N} S_B$ gives a vector along the same direction
$(3, -1)^{\top}$, as the theorem promises.

---

So the whole story fits in one line:

> **With the right labels, LDA and OLS find the same projection direction.**

The whole argument rests on two small facts: the zero-mean encoding
$t_n = \pm N/N_k$, and the observation that between-class scatter always pushes
along $(\mathbf{m}_1 - \mathbf{m}_2)$.

What I like about this result is that it is useful, not just pretty:

- It gives **another way to compute LDA**: solve a least-squares problem, with a
  direct or an iterative method.
- It makes **regularised LDA** natural: adding a ridge term $\lambda I$ to $S_T$
  is just $\ell_2$-regularised regression, which also helps when $d > N$ and the
  scatter matrix is singular.
- It points towards **kernel LDA**: you can kernelise the regression problem
  instead of kernelising Fisher's criterion directly.

In a follow-up, I want to look at solving this system with randomised Kaczmarz
methods, which is close to what I work on. If you spot a mistake or have a
cleaner way to see any of these steps, I would be glad to hear it in the
comments below.

## References

1. Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*, Section 4.1.5. Springer.
2. Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning*, Section 4.3. Springer.
3. Duda, R. O., Hart, P. E., & Stork, D. G. (2001). *Pattern Classification*, Chapter 3. Wiley.
4. Paige, C. C. & Saunders, M. A. (1982). LSQR: An algorithm for sparse linear equations and sparse least squares. *ACM Transactions on Mathematical Software*, 8(1), 43–71.
