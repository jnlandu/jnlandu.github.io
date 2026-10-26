---
layout: post
title: "L'Équation Normale des Moindres Carrés"
toc: false
author: Jeremie Mabiala
author_profile: "./assets/static/logo.jpeg"
summary: >-
  On part de trois points qui refusent de s'aligner, on passe aux vecteurs, et
  on voit apparaître l'équation normale X⊤Xw = X⊤b, d'abord par le calcul, puis
  comme une projection orthogonale.
tags: [linear-algebra, optimization, least-squares, mathematics]
lang: fr
redirect_from:
  - /posts/equation-normale-moindres-carres
  - /posts/equation-normale-mco
giscus_term: posts/equation-normale-mco
---

Imaginons qu'on ait fait trois mesures. À l'instant $t = 0$ on lit $6$, à
$t = 1$ on lit $0$, et à $t = 2$ on lit encore $0$. On aimerait faire passer une
droite $b = C + D\,t$ par ces trois points. Le problème, c'est qu'ils ne sont pas
alignés : aucune droite ne passe exactement par les trois. Il faut donc se
contenter de la droite qui passe *le plus près possible*.

C'est exactement la question des **moindres carrés ordinaires** (MCO), et la
réponse tient dans un petit système linéaire qu'on appelle l'**équation
normale**. On va construire cette équation pas à pas, à partir de ces trois
points, puis la regarder sous un angle géométrique, qui est
à mon avis la meilleure façon de la comprendre. On gardera l'exemple sous la main
tout du long pour vérifier chaque étape avec de vrais nombres.

## Des points aux vecteurs

Écrivons ce qu'on *voudrait* avoir : que la droite passe par chacun des points.
Cela donne un système de 3 équations à deux inconnues $C$ et $D$ :

$$\left\lbrace
\begin{aligned}
C + D \cdot 0 &= 6 \\
C + D \cdot 1 &= 0 \\
C + D \cdot 2 &= 0
\end{aligned}
\right.
\qquad\Longleftrightarrow\qquad
\underbrace{\begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix}}_{\mathbf{X}}
\underbrace{\begin{pmatrix} C \\ D \end{pmatrix}}_{\mathbf{w}}
= \underbrace{\begin{pmatrix} 6 \\ 0 \\ 0 \end{pmatrix}}_{\mathbf{b}}.$$

Les deux écritures disent exactement la même chose. Chaque ligne de la matrice
$\mathbf{X}$ correspond à une mesure, donc à une équation du système. Le vecteur
$\mathbf{w} = (C, D)^\top$ contient les deux inconnues, et le vecteur
$\mathbf{b} = (6, 0, 0)^\top$ les trois valeurs mesurées. La première colonne de
$\mathbf{X}$, remplie de $1$, multiplie l'ordonnée à l'origine $C$ ; la seconde
contient les instants $t_i = 0, 1, 2$, qui multiplient la pente $D$.

Ce système est sur-déterminé, c'est-à-dire qu'il a plus d'équations (trois) que
d'inconnues (deux), et ici il n'a pas de solution. Les deux dernières
équations imposent $C = 0$ et $D = 0$, ce qui contredit la première.

Rien de tout cela n'est propre aux droites. En général, on a $m$ mesures et $n$
paramètres. La mesure numéro $i$ est décrite par un vecteur de variables
$\mathbf{x}_i \in \mathbb{R}^n$ et une valeur observée $b_i$, et on cherche
$\mathbf{w} \in \mathbb{R}^n$ tel que $\mathbf{x}_i^\top \mathbf{w} \approx b_i$
pour tout $i$. En empilant les $\mathbf{x}_i^\top$ comme lignes d'une matrice
$\mathbf{X} \in \mathbb{R}^{m \times n}$, on retrouve l'écriture $\mathbf{X}\mathbf{w} \approx \mathbf{b}$.

### Mesurer l'erreur

Puisqu'on ne peut pas tout satisfaire, on mesure ce qui manque. Pour chaque
point, le **résidu** est l'écart entre la valeur observée et la valeur prédite :

$$r_i = b_i - \mathbf{x}_i^\top \mathbf{w}.$$

On veut que ces résidus soient petits *tous ensemble*. Le choix des moindres
carrés consiste à minimiser la somme de leurs carrés :

$$f(\mathbf{w}) = \sum_{i=1}^{m} \left(\mathbf{x}_i^\top \mathbf{w} - b_i\right)^2. \tag{1}$$

Pourquoi les carrés plutôt que les valeurs absolues ? Surtout parce que c'est
lisse, c'est-à-dire que la fonction $x \mapsto x^2$ est de classe
$\mathcal{C}^\infty$, alors que $x \mapsto \lvert x \rvert$ n'est même pas
dérivable en $0$. On peut donc dériver sans se poser de questions, et les calculs
restent simples, comme on va le voir. En empilant les
résidus dans un vecteur $\mathbf{r} = \mathbf{b} - \mathbf{X}\mathbf{w}$, cette
somme n'est rien d'autre que le carré de sa norme :

$$f(\mathbf{w}) = \lVert \mathbf{X}\mathbf{w} - \mathbf{b} \rVert^2.$$

Le problème des MCO s'écrit donc

$$\min_{\mathbf{w} \in \mathbb{R}^n} \; \lVert \mathbf{X}\mathbf{w} - \mathbf{b} \rVert^2. \tag{2}$$

## Le calcul : annuler le gradient

### Une coordonnée à la fois

Dérivons $f$ par rapport à une seule composante $w_j$. Chaque terme de la somme
est un carré, donc

$$\frac{\partial f}{\partial w_j}
  = \sum_{i=1}^{m} 2\left(\mathbf{x}_i^\top \mathbf{w} - b_i\right) x_{ij}.$$

Au minimum, toutes ces dérivées sont nulles. Ce qui est agréable, c'est que les
$n$ équations obtenues se rangent d'elles-mêmes en une seule écriture
vectorielle. La somme sur $i$ de $x_{ij}$ fois quelque chose, c'est exactement la
$j$-ième ligne de $\mathbf{X}^\top$ appliquée à ce quelque chose. En empilant les
$n$ dérivées :

$$\nabla f(\mathbf{w}) = 2\,\mathbf{X}^\top\left(\mathbf{X}\mathbf{w} - \mathbf{b}\right). \tag{3}$$

(On peut aussi le retrouver en développant
$f(\mathbf{w}) = \mathbf{w}^\top \mathbf{X}^\top \mathbf{X}\,\mathbf{w} - 2\,\mathbf{b}^\top \mathbf{X}\,\mathbf{w} + \mathbf{b}^\top \mathbf{b}$
et en dérivant terme à terme.)

### L'équation normale

En annulant le gradient (3), on obtient

$$\boxed{\mathbf{X}^\top \mathbf{X}\,\mathbf{w}^{\ast} = \mathbf{X}^\top \mathbf{b}.} \tag{4}$$

Voilà l'**équation normale**. Un détail que je trouve agréable : c'est toujours un
système $n \times n$, quel que soit le nombre $m$ de mesures. On peut avoir un
million de points, le système à résoudre reste de la taille du nombre de
paramètres.

Et c'est bien un minimum global. La fonction $f$ est convexe (c'est le carré
d'une norme composé avec une fonction affine), donc tout point où le gradient
s'annule est un minimum global de (2). Pas de mauvaise surprise possible.

### Retour à nos trois points

Calculons les deux côtés de (4) avec notre exemple :

$$\mathbf{X}^\top \mathbf{X}
  = \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 2 \end{pmatrix}
    \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix}
  = \begin{pmatrix} 3 & 3 \\ 3 & 5 \end{pmatrix},
\qquad
\mathbf{X}^\top \mathbf{b}
  = \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 2 \end{pmatrix}
    \begin{pmatrix} 6 \\ 0 \\ 0 \end{pmatrix}
  = \begin{pmatrix} 6 \\ 0 \end{pmatrix}.$$

L'équation normale devient

$$\begin{aligned}
3C + 3D &= 6, \\
3C + 5D &= 0.
\end{aligned}$$

En soustrayant la première ligne de la seconde, $2D = -6$, donc $D = -3$, puis
$C = 5$. La meilleure droite est

$$b = 5 - 3t.$$

Elle prédit $5$, $2$ et $-1$ aux instants $0$, $1$ et $2$, alors qu'on avait
mesuré $6$, $0$ et $0$. Les résidus sont donc
$\mathbf{r}^{\ast} = (1, -2, 1)^\top$, et l'erreur totale vaut
$\lVert \mathbf{r}^{\ast} \rVert^2 = 1 + 4 + 1 = 6$. Aucune autre droite ne fait mieux.

## La géométrie : une projection orthogonale

Le calcul fonctionne, mais il ne dit pas vraiment *pourquoi* l'équation a cette
forme. Pour ça, je trouve qu'il faut changer de point de vue : au lieu de penser
à trois points dans le plan $(t, b)$, pensons à un seul vecteur $\mathbf{b}$ dans
$\mathbb{R}^3$.

### Ce que X peut atteindre

Quand $\mathbf{w}$ parcourt $\mathbb{R}^n$, le vecteur $\mathbf{X}\mathbf{w}$
parcourt l'**image** (ou espace colonne) de $\mathbf{X}$ :

$$\mathcal{C}(\mathbf{X}) = \lbrace \mathbf{X}\mathbf{w} : \mathbf{w} \in \mathbb{R}^n \rbrace.$$

Ce sont toutes les combinaisons des colonnes de $\mathbf{X}$. Dans notre exemple,
c'est un plan de $\mathbb{R}^3$, engendré par $(1, 1, 1)^\top$ et
$(0, 1, 2)^\top$. Le système $\mathbf{X}\mathbf{w} = \mathbf{b}$ n'a pas de
solution précisément parce que $\mathbf{b} = (6, 0, 0)^\top$ n'est pas dans ce
plan.

Minimiser $\lVert \mathbf{X}\mathbf{w} - \mathbf{b} \rVert$, c'est donc chercher
le point du plan le plus proche de $\mathbf{b}$. Et le point d'un plan le plus
proche d'un vecteur donné, c'est sa **projection orthogonale** :
$\hat{\mathbf{b}} = \mathbf{X}\mathbf{w}^{\ast}$.

<figure style="margin: 2rem 0;">
  <svg viewBox="0 0 520 320" role="img" aria-labelledby="proj-title proj-desc"
       style="width:100%; max-width:560px; display:block; margin:0 auto; color:var(--fg);">
    <title id="proj-title">Projection orthogonale de b sur l'image de X</title>
    <desc id="proj-desc">Un plan représente l'image de X. Le vecteur b sort du plan ;
      sa projection b chapeau est dans le plan, et le résidu r relie b chapeau à b,
      perpendiculairement au plan.</desc>
    <defs>
      <marker id="arr-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#e0623a"/></marker>
      <marker id="arr-bh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#2f8fd8"/></marker>
      <marker id="arr-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#2ea86b"/></marker>
    </defs>
    <!-- the plane C(X) -->
    <polygon points="30,250 320,295 490,195 200,150" fill="#2f8fd8" fill-opacity="0.12"
             stroke="currentColor" stroke-opacity="0.45"/>
    <text x="440" y="232" font-size="16" fill="currentColor" font-style="italic">C(X)</text>
    <!-- origin -->
    <circle cx="150" cy="240" r="3" fill="currentColor"/>
    <text x="128" y="262" font-size="15" fill="currentColor">0</text>
    <!-- b -->
    <line x1="150" y1="240" x2="376" y2="62" stroke="#e0623a" stroke-width="2.5" marker-end="url(#arr-b)"/>
    <text x="388" y="58" font-size="17" font-weight="bold" fill="#e0623a">b</text>
    <!-- b hat, inside the plane -->
    <line x1="150" y1="240" x2="374" y2="216" stroke="#2f8fd8" stroke-width="2.5" marker-end="url(#arr-bh)"/>
    <text x="236" y="250" font-size="16" fill="#2f8fd8"><tspan font-weight="bold">b̂</tspan> = X<tspan font-weight="bold">w</tspan>*</text>
    <!-- residual, perpendicular to the plane -->
    <line x1="380" y1="214" x2="380" y2="70" stroke="#2ea86b" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#arr-r)"/>
    <text x="392" y="146" font-size="16" fill="#2ea86b"><tspan font-weight="bold">r</tspan>* = <tspan font-weight="bold">b</tspan> − X<tspan font-weight="bold">w</tspan>*</text>
    <!-- right-angle mark -->
    <polyline points="366,216 366,201 380,199.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
  </svg>
  <figcaption class="small" style="text-align:center; margin-top:.6rem;">
    Le plan est $\mathcal{C}(\mathbf{X})$. La projection $\hat{\mathbf{b}}$ est le point
    du plan le plus proche de $\mathbf{b}$, et le résidu $\mathbf{r}^{\ast}$ tombe à angle droit sur le plan.
  </figcaption>
</figure>

### Le résidu est perpendiculaire

Qui dit projection orthogonale dit résidu perpendiculaire. Le résidu
$\mathbf{r}^{\ast} = \mathbf{b} - \mathbf{X}\mathbf{w}^{\ast}$ doit être orthogonal à tout
le plan, donc à chacune des colonnes de $\mathbf{X}$. Écrire « orthogonal à
chaque colonne », c'est écrire que tous les produits scalaires avec les colonnes
sont nuls, autrement dit :

$$\mathbf{X}^\top \mathbf{r}^{\ast} = \mathbf{0}
\;\;\Longleftrightarrow\;\;
\mathbf{X}^\top(\mathbf{b} - \mathbf{X}\mathbf{w}^{\ast}) = \mathbf{0}
\;\;\Longleftrightarrow\;\;
\mathbf{X}^\top \mathbf{X}\,\mathbf{w}^{\ast} = \mathbf{X}^\top \mathbf{b}. \tag{5}$$

On retombe sur l'équation normale (4), sans avoir dérivé quoi que ce soit. C'est
d'ailleurs de là que vient le nom : le résidu est *normal*, c'est-à-dire
perpendiculaire, à l'espace colonne.

Vérifions-le sur notre exemple. Avec $\mathbf{r}^{\ast} = (1, -2, 1)^\top$ :

$$\mathbf{X}^\top \mathbf{r}^{\ast}
  = \begin{pmatrix} 1 - 2 + 1 \\ 0 - 2 + 2 \end{pmatrix}
  = \begin{pmatrix} 0 \\ 0 \end{pmatrix}.$$

Le résidu est bien perpendiculaire aux deux colonnes. La première égalité dit
aussi quelque chose de concret : quand le modèle a une ordonnée à l'origine, les
résidus se compensent toujours, leur somme est nulle.

### Pythagore au passage

Comme $\hat{\mathbf{b}}$ et $\mathbf{r}^{\ast}$ sont orthogonaux, on a la
décomposition

$$\mathbf{b} = \underbrace{\mathbf{X}\mathbf{w}^{\ast}}_{\hat{\mathbf{b}}\;\in\;\mathcal{C}(\mathbf{X})}
  + \underbrace{(\mathbf{b} - \mathbf{X}\mathbf{w}^{\ast})}_{\mathbf{r}^{\ast}\;\perp\;\mathcal{C}(\mathbf{X})},
\qquad
\lVert \mathbf{b} \rVert^2 = \lVert \hat{\mathbf{b}} \rVert^2 + \lVert \mathbf{r}^{\ast} \rVert^2. \tag{6}$$

Avec nos nombres : $\lVert \mathbf{b} \rVert^2 = 36$,
$\lVert \hat{\mathbf{b}} \rVert^2 = 25 + 4 + 1 = 30$ et
$\lVert \mathbf{r}^{\ast} \rVert^2 = 6$. On a bien $36 = 30 + 6$.

## Une seule solution ?

Une solution existe toujours, puisque la projection existe toujours. La vraie
question est de savoir s'il y en a une seule, et la réponse dépend du rang de
$\mathbf{X}$.

### Quand les colonnes sont indépendantes

Si les colonnes de $\mathbf{X}$ sont linéairement indépendantes (rang plein en
colonnes, $\text{rang}(\mathbf{X}) = n$), alors $\mathbf{X}^\top \mathbf{X}$ est
**symétrique définie positive**. La preuve tient en une ligne :

$$\mathbf{u}^\top (\mathbf{X}^\top \mathbf{X})\,\mathbf{u}
  = \lVert \mathbf{X}\mathbf{u} \rVert^2 > 0 \quad \forall\,\mathbf{u} \neq \mathbf{0}.$$

L'équation normale a alors une **solution unique** :

$$\mathbf{w}^{\ast} = (\mathbf{X}^\top \mathbf{X})^{-1}\,\mathbf{X}^\top \mathbf{b}. \tag{7}$$

C'est notre cas : les colonnes $(1, 1, 1)^\top$ et $(0, 1, 2)^\top$ ne sont pas
proportionnelles, et la matrice $\begin{pmatrix} 3 & 3 \\ 3 & 5 \end{pmatrix}$ a
pour déterminant $6 \neq 0$. La matrice $(\mathbf{X}^\top \mathbf{X})^{-1}\mathbf{X}^\top$
s'appelle la **pseudo-inverse à gauche** de $\mathbf{X}$.

### Quand le rang est déficient

Si $\text{rang}(\mathbf{X}) = r < n$, certaines colonnes sont des combinaisons
des autres, et $\mathbf{X}^\top \mathbf{X}$ est **singulière**. Imaginez qu'on
ait ajouté à notre exemple une troisième colonne égale à deux fois la deuxième :
on pourrait transférer du poids d'un coefficient à l'autre sans changer la
prédiction. L'équation normale a alors une infinité de solutions. Elles donnent
toutes la même projection $\hat{\mathbf{b}}$ et le même résidu, mais elles
diffèrent d'un vecteur du noyau de $\mathbf{X}$.

Il faut donc en choisir une, et le choix le plus naturel est la **solution de
norme minimale** :

$$\mathbf{w}^{\ast} = \mathbf{X}^{\dagger}\,\mathbf{b}, \tag{8}$$

où $\mathbf{X}^{\dagger} = \mathbf{V}\,\boldsymbol{\Sigma}^{\dagger}\,\mathbf{U}^\top$
est la **pseudo-inverse de Moore-Penrose**. On l'obtient à partir de la
décomposition en valeurs singulières $\mathbf{X} = \mathbf{U}\boldsymbol{\Sigma}\mathbf{V}^\top$,
en n'inversant que les valeurs singulières non nulles pour former
$\boldsymbol{\Sigma}^{\dagger}$.

Voici les différents cas côte à côte :

| Système | Condition | $\mathbf{X}^\top \mathbf{X}$ | Solution |
|---------|-----------|------------------------------|----------|
| Sur-déterminé ($m > n$) | $\text{rang}(\mathbf{X}) = n$ | définie positive | unique : $(\mathbf{X}^\top \mathbf{X})^{-1}\mathbf{X}^\top \mathbf{b}$ |
| Carré ($m = n$) | $\mathbf{X}$ inversible | définie positive | unique : $\mathbf{X}^{-1}\mathbf{b}$ |
| Sous-déterminé ($m < n$) | $\text{rang}(\mathbf{X}) = m$ | singulière | infinité ; norme minimale : $\mathbf{X}^{\dagger}\mathbf{b}$ |
| Rang déficient | $\text{rang}(\mathbf{X}) = r < \min(m,n)$ | singulière | infinité ; norme minimale : $\mathbf{X}^{\dagger}\mathbf{b}$ |

### Un cas bien réel : l'ADL sur les visages Olivetti

Le cas sous-déterminé n'est pas une curiosité de manuel. Quand on écrit l'ADL
comme un problème de moindres carrés sur la base de visages Olivetti, on a
$\mathbf{X}_c \in \mathbb{R}^{300 \times 4096}$ : 300 images, chacune décrite par
4096 pixels. Il y a bien plus de paramètres que de mesures
($N = 300 \ll d = 4096$), et $\mathbf{X}_c^\top \mathbf{X}_c$ est singulière.

Le système $\mathbf{X}_c \mathbf{w} = \mathbf{t}$ reste pourtant consistant dès que
$\mathbf{X}_c$ est de rang $N - 1$, ce qui est le cas en pratique. Le centrage
fait perdre un rang, mais les cibles $\mathbf{t}$ sont elles aussi de moyenne
nulle, donc elles restent dans l'image de $\mathbf{X}_c$. Parmi toutes les
solutions exactes, LSQR et la méthode de Kaczmarz étendue (REK), lancés depuis
$\mathbf{w} = \mathbf{0}$, convergent vers celle de norme minimale,
$\mathbf{w}^{\ast} = \mathbf{X}_c^{\dagger}\mathbf{t}$. Et ils le font sans jamais
former la matrice $\mathbf{X}_c^\top \mathbf{X}_c \in \mathbb{R}^{4096 \times 4096}$,
ce qui est une très bonne nouvelle pour la mémoire.

---

Si je devais ne garder qu'une idée, ce serait celle-ci : l'équation normale
$\mathbf{X}^\top \mathbf{X}\,\mathbf{w} = \mathbf{X}^\top \mathbf{b}$ dit
simplement que l'erreur qui reste doit être perpendiculaire à tout ce que le
modèle sait représenter. Le calcul du gradient y mène, la géométrie l'explique, et
nos trois points le confirment. Le reste, l'unicité, la pseudo-inverse, les
méthodes itératives, découle de cette image.

Si vous voyez une erreur ou une façon plus claire de présenter l'un de ces points,
n'hésitez pas à me le dire dans les commentaires.

## Références

1. Strang, G. (2016). *Introduction to Linear Algebra* (5th ed.). Wellesley-Cambridge Press.
2. Trefethen, L. N. & Bau, D. (1997). *Numerical Linear Algebra*. SIAM.
3. Björck, Å. (1996). *Numerical Methods for Least Squares Problems*. SIAM.
