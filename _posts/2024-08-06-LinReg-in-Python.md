---
layout: post
toc: true
title: "Linear Regression in Python"
categories: junk
tags: [Python]
author:
  - Jérémie N. Mabiala
#   - Nelson Mandela Muntz
summary: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus 
  sint impedit doloremque reprehenderit, facilis quo optio veritatis molestias 
  autem sit amet magni laborum veniam corporis quam nostrum nam iure incidunt.
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed autem atque fuga quam 
  ab architecto repudiandae amet perferendis, ea excepturi cupiditate nisi
  dolorem? Earum error adipisci nobis, dignissimos culpa quidem?.
---
# Linear Regression in Python

Linear Regression is a simple yet powerful technique used for predicting a quantitative response. In this tutorial, we will implement Linear Regression from scratch and also using the `scikit-learn` library in Python.

<!-- ## Table of Contents
1. [Introduction to Linear Regression](#introduction-to-linear-regression)
2. [Mathematical Background](#mathematical-background)
3. [Implementing Linear Regression from Scratch](#implementing-linear-regression-from-scratch)
4. [Linear Regression Using scikit-learn](#linear-regression-using-scikit-learn)
5. [Evaluation Metrics](#evaluation-metrics)
6. [Conclusion](#conclusion) -->

## Introduction to Linear Regression

Linear Regression is a linear approach to modeling the relationship between a dependent variable and one or more independent variables. If we have a single independent variable, it's called Simple Linear Regression. If there are multiple independent variables, it's called Multiple Linear Regression.

## Mathematical Background

The equation for a linear model is:

\[y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \ldots + \beta_n x_n + \epsilon \]

- $ y $: Dependent variable
- $ x_i $: Independent variables
- $ \beta_i $: Coefficients
- $ \epsilon $: Error term

## Implementing Linear Regression from Scratch

Let's start by generating some sample data and implementing Linear Regression using NumPy.

```python
import numpy as np
import matplotlib.pyplot as plt

# Generate sample data
np.random.seed(0)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Plot the sample data
plt.scatter(X, y)
plt.xlabel("X")
plt.ylabel("y")
plt.title("Sample Data")
plt.show()
```

### Step 1: Compute the Cost Function
The cost function for Linear Regression is the Mean Squared Error (MSE):

\[ J(\beta) = \frac{1}{2m} \sum_{i=1}^{m} (h_\beta(x^{(i)}) - y^{(i)})^2 \]

```python
def compute_cost(X, y, beta):
    m = len(y)
    predictions = X.dot(beta)
    cost = (1 / (2 * m)) * np.sum(np.square(predictions - y))
    return cost
```

### Step 2: Gradient Descent
Gradient Descent is used to minimize the cost function:

\[ \beta_j := \beta_j - \alpha \frac{\partial}{\partial \beta_j} J(\beta) \]

```python
def gradient_descent(X, y, beta, learning_rate, iterations):
    m = len(y)
    cost_history = np.zeros(iterations)
    
    for i in range(iterations):
        predictions = X.dot(beta)
        errors = np.dot(X.transpose(), (predictions - y))
        beta -= (1 / m) * learning_rate * errors
        cost_history[i] = compute_cost(X, y, beta)
    
    return beta, cost_history
```

### Step 3: Training the Model
Let's normalize the feature and add a bias term to the data.

```python
X_b = np.c_[np.ones((len(X), 1)), X]  # Add bias term
beta_initial = np.random.randn(2, 1)
learning_rate = 0.01
iterations = 1000

beta_optimal, cost_history = gradient_descent(X_b, y, beta_initial, learning_rate, iterations)
print("Optimal coefficients:", beta_optimal)
```

### Step 4: Plot the Cost Function
```python
plt.plot(range(iterations), cost_history)
plt.xlabel("Iterations")
plt.ylabel("Cost")
plt.title("Cost Function")
plt.show()
```

### Step 5: Predictions
```python
predictions = X_b.dot(beta_optimal)
plt.scatter(X, y)
plt.plot(X, predictions, color='red')
plt.xlabel("X")
plt.ylabel("y")
plt.title("Linear Regression Fit")
plt.show()
```

## Linear Regression Using scikit-learn

Now, let's use the `scikit-learn` library to perform Linear Regression.

```python
from sklearn.linear_model import LinearRegression

# Create and fit the model
lin_reg = LinearRegression()
lin_reg.fit(X, y)

# Print the coefficients
print("Intercept:", lin_reg.intercept_)
print("Coefficient:", lin_reg.coef_)

# Predictions
y_pred = lin_reg.predict(X)

# Plot the results
plt.scatter(X, y)
plt.plot(X, y_pred, color='red')
plt.xlabel("X")
plt.ylabel("y")
plt.title("Linear Regression Fit with scikit-learn")
plt.show()
```

## Evaluation Metrics

To evaluate the performance of a Linear Regression model, we use metrics like:

- **Mean Absolute Error (MAE)**: 
$ \frac{1}{m} \sum_{i=1}^{m} | y^{(i)} - \hat{y}^{(i)} |$
- **Mean Squared Error (MSE)**: $ \frac{1}{m} \sum_{i=1}^{m} (y^{(i)} - \hat{y}^{(i)})^2 $
- **R-squared (R²)**: Proportion of variance explained by the model.

```python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

mae = mean_absolute_error(y, y_pred)
mse = mean_squared_error(y, y_pred)
r2 = r2_score(y, y_pred)

print(f"Mean Absolute Error: {mae}")
print(f"Mean Squared Error: {mse}")
print(f"R-squared: {r2}")
```

## Conclusion

In this tutorial, we covered the basics of Linear Regression, implemented it from scratch, and also used the `scikit-learn` library. We also discussed how to evaluate the model using different metrics.

For further reading, you may refer to:
- [Introduction to Statistical Learning](https://www.statlearning.com/)
- [scikit-learn Documentation](https://scikit-learn.org/stable/documentation.html)

