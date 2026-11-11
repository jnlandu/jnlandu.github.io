<!-- ---
layout: post
title: "The Sherman–Morrison Formula and Its Relatives"
toc: false
author: Jeremie Mabiala
summary: >-
  When a matrix changes by a rank-one term, you don't have to invert it again.
  A tour of the Sherman–Morrison formula, the Woodbury identity, the matrix
  determinant lemma, and a few places where they quietly save the day.
tags: [linear-algebra, least-squares, machine-learning, mathematics]
---

Say you've fitted a least-squares model on $N$ data points. Along the way you
computed $(\mathbf{X}^\top \mathbf{X})^{-1}$, a $d \times d$ matrix, at a
[cost of order $d^3$](https://en.wikipedia.org/wiki/Computational_complexity_of_mathematical_operations#Matrix_algebra).
Then one more data point $\mathbf{x} \in \mathbb{R}^d$ shows up.

The data matrix $\mathbf{X}$ gets one more row, so it grows from $N \times d$ to
$(N+1) \times d$. But $\mathbf{X}^\top \mathbf{X}$ doesn't grow. Multiplying the
blocks out, the new row only adds one term,

$$\mathbf{X}_{\text{new}} = \begin{pmatrix} \mathbf{X} \\ \mathbf{x}^\top \end{pmatrix}
\quad \Longrightarrow \quad
\mathbf{X}_{\text{new}}^\top \mathbf{X}_{\text{new}}
= \begin{pmatrix} \mathbf{X}^\top & \mathbf{x} \end{pmatrix}
  \begin{pmatrix} \mathbf{X} \\ \mathbf{x}^\top \end{pmatrix}
= \mathbf{X}^\top \mathbf{X} + \mathbf{x}\mathbf{x}^\top,$$

and the result is still a $d \times d$ matrix. Another way to see it is that
$\mathbf{X}^\top \mathbf{X} = \sum_i \mathbf{x}_i \mathbf{x}_i^\top$ is a sum of
one term per data point, and a new point just adds one more term.

Paying $d^3$ again for that feels like a waste. The new matrix only differs from
the old one by a single outer product, a matrix of rank one. And it turns out you
really don't have to start over. If you know the old inverse, the Sherman–Morrison
formula hands you the new one for about $d^2$ operations.

I keep bumping into this trick and its cousins, in online learning,
cross-validation, quasi-Newton methods, Kalman filters and Gaussian processes. So
I wanted to put them all in one place, with proofs I actually find convincing.

## The formula

Let $\mathbf{A} \in \mathbb{R}^{n \times n}$ be invertible and let
$\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$. Then $\mathbf{A} + \mathbf{u}\mathbf{v}^\top$
is invertible exactly when $1 + \mathbf{v}^\top \mathbf{A}^{-1}\mathbf{u} \neq 0$,
and in that case

$$\boxed{\left(\mathbf{A} + \mathbf{u}\mathbf{v}^\top\right)^{-1}
  = \mathbf{A}^{-1} - \frac{\mathbf{A}^{-1}\mathbf{u}\,\mathbf{v}^\top \mathbf{A}^{-1}}{1 + \mathbf{v}^\top \mathbf{A}^{-1}\mathbf{u}}.} \tag{1}$$

Look at the correction term. It's again a rank-one matrix, divided by a single
number. So a rank-one change in a matrix gives a rank-one change in its inverse,
and that's really the whole story.

Subtracting works the same way, because $\mathbf{A} - \mathbf{u}\mathbf{v}^\top$
is just (1) with $-\mathbf{u}$ in place of $\mathbf{u}$. Two signs flip,

$$\left(\mathbf{A} - \mathbf{u}\mathbf{v}^\top\right)^{-1}
  = \mathbf{A}^{-1} + \frac{\mathbf{A}^{-1}\mathbf{u}\,\mathbf{v}^\top \mathbf{A}^{-1}}{1 - \mathbf{v}^\top \mathbf{A}^{-1}\mathbf{u}},$$

and now we need $1 - \mathbf{v}^\top \mathbf{A}^{-1}\mathbf{u} \neq 0$. People call
this a downdate, and it's what you use to take a data point back out. It deserves a
bit more care than adding, though. Adding $\mathbf{x}\mathbf{x}^\top$ to a positive
definite matrix keeps it positive definite, but subtracting can push it towards
singular, and rounding errors pile up faster if you downdate again and again.

### Let's prove it

The fastest proof is to just multiply and watch things cancel. Write
$c = \mathbf{v}^\top \mathbf{A}^{-1}\mathbf{u}$, which is only a number, and call
$\mathbf{B}$ the right-hand side of (1). Then

$$\begin{aligned}
\left(\mathbf{A} + \mathbf{u}\mathbf{v}^\top\right)\mathbf{B}
  &= \mathbf{I} + \mathbf{u}\mathbf{v}^\top \mathbf{A}^{-1}
     - \frac{\mathbf{u}\mathbf{v}^\top \mathbf{A}^{-1} + \mathbf{u}\,(\mathbf{v}^\top \mathbf{A}^{-1}\mathbf{u})\,\mathbf{v}^\top \mathbf{A}^{-1}}{1 + c}
  && \text{(a)} \\
  &= \mathbf{I} + \mathbf{u}\mathbf{v}^\top \mathbf{A}^{-1}
     - \frac{(1 + c)\,\mathbf{u}\mathbf{v}^\top \mathbf{A}^{-1}}{1 + c}
  && \text{(b)} \\
  &= \mathbf{I}.
  && \text{(c)}
\end{aligned}$$

Step (a) is just expanding the product. In (b), the factor
$\mathbf{v}^\top \mathbf{A}^{-1}\mathbf{u}$ in the middle is the number $c$, so we
can pull it out, and the numerator becomes $(1 + c)$ times
$\mathbf{u}\mathbf{v}^\top \mathbf{A}^{-1}$. After that, (c) is pure cancellation.

### Where it comes from

I like to say it's better to know where a formula comes than just know it by heart.  Let's see where it comes. Pull $\mathbf{A}$ out front and write
$\mathbf{A} + \mathbf{u}\mathbf{v}^\top = \mathbf{A}\,(\mathbf{I} + \mathbf{a}\mathbf{v}^\top)$,
with $\mathbf{a} = \mathbf{A}^{-1}\mathbf{u}$. Then invert
$\mathbf{I} + \mathbf{a}\mathbf{v}^\top$ the same way you'd invert $1 + x$, with a
geometric series.

$$\begin{aligned}
\left(\mathbf{I} + \mathbf{a}\mathbf{v}^\top\right)^{-1}
  &= \mathbf{I} - \mathbf{a}\mathbf{v}^\top + \mathbf{a}\mathbf{v}^\top\mathbf{a}\mathbf{v}^\top - \cdots \\
  &= \mathbf{I} - \mathbf{a}\left(1 - c + c^2 - \cdots\right)\mathbf{v}^\top
   = \mathbf{I} - \frac{\mathbf{a}\mathbf{v}^\top}{1 + c}.
\end{aligned}$$

What makes this work is that every power collapses, since
$(\mathbf{a}\mathbf{v}^\top)^k = \mathbf{a}\,(\mathbf{v}^\top\mathbf{a})^{k-1}\mathbf{v}^\top = c^{k-1}\,\mathbf{a}\mathbf{v}^\top$.
Multiply on the right by $\mathbf{A}^{-1}$ and you get (1) back. Strictly
speaking, the series only converges when $\lvert c \rvert < 1$. But the formula it
gives holds whenever $1 + c \neq 0$, as we just checked.

### Trying it on actual numbers

A formula like this only really sinks in for me once I've pushed some numbers
through it, so let's do that with the smallest case that isn't trivial. Take

$$\mathbf{A} = \begin{pmatrix} 2 & 0 \\ 0 & 4 \end{pmatrix},
\qquad \mathbf{u} = \mathbf{v} = \begin{pmatrix} 1 \\ 1 \end{pmatrix},
\qquad \mathbf{A} + \mathbf{u}\mathbf{v}^\top = \begin{pmatrix} 3 & 1 \\ 1 & 5 \end{pmatrix}.$$

If you invert directly, you get
$\frac{1}{14}\begin{pmatrix} 5 & -1 \\ -1 & 3 \end{pmatrix}$. Now let's use (1)
instead. We have $\mathbf{A}^{-1}\mathbf{u} = (1/2,\ 1/4)^\top$, so $c = 3/4$ and
$1 + c = 7/4$. Then

$$\begin{aligned}
\mathbf{A}^{-1} - \frac{4}{7}\begin{pmatrix} 1/2 \\ 1/4 \end{pmatrix}\begin{pmatrix} 1/2 & 1/4 \end{pmatrix}
  &= \begin{pmatrix} 1/2 & 0 \\ 0 & 1/4 \end{pmatrix} - \begin{pmatrix} 1/7 & 1/14 \\ 1/14 & 1/28 \end{pmatrix} \\
  &= \frac{1}{14}\begin{pmatrix} 5 & -1 \\ -1 & 3 \end{pmatrix}.
\end{aligned}$$

Same answer, and we never had to invert the new matrix.

### What it costs

If you already have $\mathbf{A}^{-1}$, formula (1) needs two matrix-vector
products ($\mathbf{A}^{-1}\mathbf{u}$ and $\mathbf{v}^\top \mathbf{A}^{-1}$), one
inner product and one outer product. That's about $n^2$ operations instead of
$n^3$.

In practice, though, you rarely want the inverse itself. What you usually want is
to solve $(\mathbf{A} + \mathbf{u}\mathbf{v}^\top)\,\mathbf{x} = \mathbf{b}$, and
applying (1) to $\mathbf{b}$ gives

$$\mathbf{x} = \mathbf{y} - \frac{\mathbf{v}^\top \mathbf{y}}{1 + \mathbf{v}^\top \mathbf{z}}\,\mathbf{z},
\qquad \text{where } \mathbf{A}\mathbf{y} = \mathbf{b}, \quad \mathbf{A}\mathbf{z} = \mathbf{u}. \tag{2}$$

So all you need is a way to solve systems with $\mathbf{A}$, say a factorisation
you computed once. That's usually cheaper, and more accurate, than dragging an
explicit inverse around.

## The determinant lemma

Determinants have their own version of this, the
[matrix determinant lemma](https://en.wikipedia.org/wiki/Matrix_determinant_lemma).

$$\det\left(\mathbf{A} + \mathbf{u}\mathbf{v}^\top\right) = \left(1 + \mathbf{v}^\top \mathbf{A}^{-1}\mathbf{u}\right)\det \mathbf{A}. \tag{3}$$

This also explains the condition in (1), since the updated matrix is singular
exactly when $1 + c = 0$. The proof is short. Write
$\mathbf{A} + \mathbf{u}\mathbf{v}^\top = \mathbf{A}\,(\mathbf{I} + \mathbf{a}\mathbf{v}^\top)$
again. The matrix $\mathbf{a}\mathbf{v}^\top$ has rank one, so its only nonzero
eigenvalue is $\mathbf{v}^\top\mathbf{a} = c$, with eigenvector $\mathbf{a}$. That
means $\mathbf{I} + \mathbf{a}\mathbf{v}^\top$ has the eigenvalue $1 + c$ once and
the eigenvalue $1$ for the remaining $n - 1$ directions, so its determinant is
$1 + c$. In our example,
$\det \begin{pmatrix} 3 & 1 \\ 1 & 5 \end{pmatrix} = 14 = \frac{7}{4} \cdot 8$.

It comes in handy whenever you need log-determinants under updates, which happens
all the time with Gaussian likelihoods.

## More than one rank at a time

What if the change has rank $k$ instead of one? Let
$\mathbf{U}, \mathbf{V} \in \mathbb{R}^{n \times k}$ and let
$\mathbf{C} \in \mathbb{R}^{k \times k}$ be invertible. Then the
[Woodbury identity](https://en.wikipedia.org/wiki/Woodbury_matrix_identity) says

$$\left(\mathbf{A} + \mathbf{U}\mathbf{C}\mathbf{V}^\top\right)^{-1}
  = \mathbf{A}^{-1} - \mathbf{A}^{-1}\mathbf{U}\left(\mathbf{C}^{-1} + \mathbf{V}^\top \mathbf{A}^{-1}\mathbf{U}\right)^{-1}\mathbf{V}^\top \mathbf{A}^{-1}. \tag{4}$$

With $k = 1$ and $\mathbf{C} = 1$, the $k \times k$ matrix in the middle is just
the number $1 + \mathbf{v}^\top \mathbf{A}^{-1}\mathbf{u}$, and we're back to (1).
You can prove it the same way, by multiplying out, only with matrices where we had
scalars before.

I find it helpful to think of (4) as a trade. You give up one $n \times n$ inverse
and get one $k \times k$ inverse in exchange. When $k$ is much smaller than $n$
and $\mathbf{A}$ is easy to invert, that's a great deal. The classic example is a
covariance matrix that is "diagonal plus low rank", $\mathbf{D} + \mathbf{L}\mathbf{L}^\top$.
You see these in factor models and in low-rank approximations of Gaussian process
kernels. Inverting $\mathbf{D}$ costs nothing, and Woodbury takes care of the rest
for the price of a small $k \times k$ inverse.

### The push-through identity

A close relative lets you move a matrix from one side of an inverse to the other.

$$\left(\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}_d\right)^{-1}\mathbf{X}^\top
  = \mathbf{X}^\top\left(\mathbf{X}\mathbf{X}^\top + \lambda \mathbf{I}_N\right)^{-1}. \tag{5}$$

To see why, start from the obvious equality
$\mathbf{X}^\top(\mathbf{X}\mathbf{X}^\top + \lambda \mathbf{I}_N) = (\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}_d)\,\mathbf{X}^\top$
and multiply by the two inverses, one on each side. In ridge regression, the left
side needs a $d \times d$ inverse and the right side an $N \times N$ one, so you
can always go with whichever is smaller. The right-hand side also only depends on
the inner products $\mathbf{X}\mathbf{X}^\top$, which is exactly how kernel
methods get started.

## The block-matrix picture

There's one picture behind all of these formulas. Take a block matrix and work out
the top-left block of its inverse twice, once by eliminating the bottom block and
once by eliminating the top one. For

$$\mathbf{M} = \begin{pmatrix} \mathbf{A} & \mathbf{U} \\ \mathbf{V}^\top & -\mathbf{C}^{-1} \end{pmatrix},$$

eliminating the bottom-right block leaves the
[Schur complement](https://en.wikipedia.org/wiki/Schur_complement)
$\mathbf{A} + \mathbf{U}\mathbf{C}\mathbf{V}^\top$, so the top-left block of
$\mathbf{M}^{-1}$ is $(\mathbf{A} + \mathbf{U}\mathbf{C}\mathbf{V}^\top)^{-1}$.
Eliminating the top-left block instead gives

$$\mathbf{A}^{-1} - \mathbf{A}^{-1}\mathbf{U}\left(\mathbf{C}^{-1} + \mathbf{V}^\top \mathbf{A}^{-1}\mathbf{U}\right)^{-1}\mathbf{V}^\top \mathbf{A}^{-1}.$$

It's the same block both times, so the two expressions must be equal, and that's
(4). Of all the proofs, this is the one I like best. It tells you *why* such an
identity has to exist. It's just Gaussian elimination, done in two different
orders.

## Where it saves the day

### Learning one point at a time

Let's go back to where we started. Let $\mathbf{P} = (\mathbf{X}^\top \mathbf{X})^{-1}$
and let $\mathbf{w}$ be the least-squares solution, i.e. the solution of the
[normal equation]({% post_url 2024-08-14-equation-normale-moindres-carres %}).
When a new point $(\mathbf{x}, y)$ comes in, we apply (1) with
$\mathbf{u} = \mathbf{v} = \mathbf{x}$ and get

$$\mathbf{P}_{\text{new}} = \mathbf{P} - \mathbf{k}\,\mathbf{x}^\top \mathbf{P},
\qquad \text{with } \mathbf{k} = \frac{\mathbf{P}\mathbf{x}}{1 + \mathbf{x}^\top \mathbf{P}\mathbf{x}}. \tag{6}$$

People often call $\mathbf{k}$ the gain. A couple of lines of algebra show that
$\mathbf{P}_{\text{new}}\,\mathbf{x} = \mathbf{k}$, and with that, the solution
updates as

$$\mathbf{w}_{\text{new}} = \mathbf{w} + \mathbf{k}\left(y - \mathbf{x}^\top \mathbf{w}\right). \tag{7}$$

I like how this reads. The old model predicts $\mathbf{x}^\top \mathbf{w}$, and we
nudge it in proportion to how wrong it was. This is
[recursive least squares](https://en.wikipedia.org/wiki/Recursive_least_squares_filter),
and each new point costs about $d^2$ operations, however many points came before.
The update step of the Kalman filter has the very same shape.

### Leave-one-out cross-validation for free

Taking a point out is a rank-one change too, just with a minus sign. Let
$\hat{y}_i$ be the full model's prediction at point $i$, let
$e_i = y_i - \hat{y}_i$ be its residual, and let
$$h_{ii} = \mathbf{x}_i^\top (\mathbf{X}^\top \mathbf{X})^{-1}\mathbf{x}_i$$
be its leverage. If you apply (1) to $\mathbf{X}^\top \mathbf{X} - \mathbf{x}_i \mathbf{x}_i^\top$
and simplify, the error at point $i$ of the model trained *without* point $i$
comes out as

$$y_i - \hat{y}_{(-i)} = \frac{e_i}{1 - h_{ii}}. \tag{8}$$

So one fit gives you all $N$ leave-one-out errors, where you'd otherwise need $N$
fits. It makes sense, too. A point with high leverage pulls the fit towards
itself, so its ordinary residual looks better than it should. Dividing by
$1 - h_{ii}$ corrects for exactly that.

### A one-line proof of the LDA equivalence

In an [earlier post]({% post_url 2024-11-13-linear-discriminant-analysis-as-least-squares %}),
I showed that least squares recovers Fisher's LDA direction. The key fact there
was that $S_T = S_W + \gamma\,\mathbf{d}\mathbf{d}^\top$, with
$\mathbf{d} = \mathbf{m}_1 - \mathbf{m}_2$ and $\gamma = N_1 N_2 / N$. In other
words, the total scatter is the within-class scatter plus a rank-one term. With
Sherman–Morrison, the whole argument fits in one line.

$$S_T^{-1}\mathbf{d}
  = S_W^{-1}\mathbf{d} - \frac{\gamma\,S_W^{-1}\mathbf{d}\,(\mathbf{d}^\top S_W^{-1}\mathbf{d})}{1 + \gamma\,\mathbf{d}^\top S_W^{-1}\mathbf{d}}
  = \frac{S_W^{-1}\mathbf{d}}{1 + \gamma\,\mathbf{d}^\top S_W^{-1}\mathbf{d}}.$$

So the least-squares solution $S_T^{-1}\mathbf{d}$ is a positive multiple of the
LDA direction $S_W^{-1}\mathbf{d}$. I wish I'd seen it this way the first time.

### And a few more

Quasi-Newton methods like BFGS update an approximation of the Hessian by a
rank-two term at every step. Woodbury turns that into an update of the *inverse*
Hessian, so each step costs about $n^2$ and never has to solve a linear system.
And in Gaussian processes, when you approximate the kernel matrix $\mathbf{K}$ by
something low-rank, the noisy matrix $\mathbf{K} + \sigma^2 \mathbf{I}$ is handled
by (4) for the inverse and (3) for the log-determinant.



All of this is exact in exact arithmetic, but floating point is less forgiving.
When $1 + \mathbf{v}^\top \mathbf{A}^{-1}\mathbf{u}$ gets close to zero, the
updated matrix is nearly singular and (1) ends up dividing by a tiny number. In
recursive least squares, small rounding errors also pile up over thousands of
updates, to the point where $\mathbf{P}$ can stop being symmetric positive
definite. That's why people either recompute from scratch every so often, or
update a factorisation (a Cholesky or QR update) instead of the inverse, which is
much more stable. Hager's survey [2] is a nice place to read more about this.

---

What I like about Sherman–Morrison is how far one small idea takes you. A rank-one
change in a matrix is a rank-one change in its inverse, and once you start looking
for low-rank updates, you find them everywhere. If you know another nice
application, or spot a mistake, please tell me in the comments.

## References

1. Sherman, J. & Morrison, W. J. (1950). Adjustment of an Inverse Matrix Corresponding to a Change in One Element of a Given Matrix. *The Annals of Mathematical Statistics*, 21(1), 124–127.
2. Hager, W. W. (1989). Updating the Inverse of a Matrix. *SIAM Review*, 31(2), 221–239.
3. Woodbury, M. A. (1950). *Inverting Modified Matrices*. Memorandum Report 42, Statistical Research Group, Princeton University.
4. Golub, G. H. & Van Loan, C. F. (2013). *Matrix Computations* (4th ed.). Johns Hopkins University Press.
5. Petersen, K. B. & Pedersen, M. S. (2012). *The Matrix Cookbook*. Technical University of Denmark. [PDF](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf). -->
