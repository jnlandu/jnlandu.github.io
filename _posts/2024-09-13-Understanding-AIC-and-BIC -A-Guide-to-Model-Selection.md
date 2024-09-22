---
layout: post
title: Understanding AIC and BIC. A Guide to Model Selection in Statistical Learning
tags: [Python, Scikit-learn, numpy]
author: Jérémie N. Mabiala
author_profile: "./assets/static/logo.jpeg"
summary: AIC (Akaike Information Criterion) and BIC (Bayesian Information Criterion) are essential tools for model selection in statistical learning. Both balance model complexity and goodness of fit, helping to avoid overfitting. AIC favors models that best explain the data, while BIC prefers simpler models with a stronger penalty for complexity. This guide explains their differences, when to use each, and how to calculate them in Python, making it easier to choose the best model for your data analysis.
---
**AIC (Akaike Information Criterion) and BIC (Bayesian Information Criterion)**

AIC and BIC are criteria used for **model selection** in the context of statistical models. They help in determining which model among a set of candidate models best balances model complexity (number of parameters) and goodness of fit (how well the model explains the data).

---

### **1. Akaike Information Criterion (AIC)**

The **AIC** is a measure of the relative quality of a statistical model for a given dataset. It provides a way to compare different models, with lower AIC values indicating a better model.

#### **Formula for AIC**:
\[
AIC = 2k - 2\ln(\hat{L})
\]
- \( k \) is the number of parameters in the model.
- \( \ln(\hat{L}) \) is the log-likelihood of the model, which measures how well the model fits the data.

#### **Key Points**:
- **Tradeoff between fit and complexity**: The AIC penalizes models that have more parameters (to prevent overfitting) while rewarding those that fit the data well.
- **Relative comparison**: AIC on its own has no absolute meaning but can be used to compare multiple models for the same dataset. The model with the lowest AIC is preferred.
- **Use in practice**: AIC is commonly used for selecting among different models (e.g., regression models with different sets of predictors).

##### **When to Use AIC**:
- Useful when the goal is to find a model that best explains the data, regardless of whether or not the true model is included in the set of candidates.
- Suitable for large datasets or when the likelihood function can be computed efficiently.

---

### **2. Bayesian Information Criterion (BIC)**

The **BIC** (also known as Schwarz Criterion) is another criterion for model selection, similar to AIC, but with a stronger penalty for model complexity. It incorporates the sample size into the penalty for additional parameters.

#### **Formula for BIC**:
\[
BIC = \ln(n)k - 2\ln(\hat{L})
\]
- \( n \) is the number of data points.
- \( k \) is the number of parameters in the model.
- \( \ln(\hat{L}) \) is the log-likelihood of the model.

#### **Key Points**:
- **Stronger penalty for complexity**: Since BIC penalizes the number of parameters more heavily (based on sample size), it tends to select simpler models compared to AIC, especially for large datasets.
- **Assumes the "true" model**: BIC aims to select the model that is most likely to be the true model from a set of candidate models.
- **Lower BIC is better**: Similar to AIC, the model with the lowest BIC is preferred.

##### **When to Use BIC**:
- BIC is often preferred when you believe that the true model is among the candidate models and you are focused on identifying it.
- BIC may be better suited for smaller datasets or situations where model simplicity is prioritized.

---

### **Comparison between AIC and BIC**

| **Criteria**  | **AIC**  | **BIC**  |
| ------------- | -------- | -------- |
| **Penalty for Complexity** | \(2k\) | \( \ln(n)k \) |
| **Fits the Model** | Focuses on finding a model that fits the data well. | Focuses on finding the true model (more conservative). |
| **Tendency** | Tends to select more complex models. | Tends to favor simpler models (larger penalty for parameters). |
| **Sensitivity to Sample Size** | Less sensitive to sample size. | More sensitive to sample size (because of \( \ln(n) \)). |
| **Best For** | General use, especially with large datasets where overfitting is a concern. | Use when you are trying to identify the true model or when the dataset is small. |

### **Example of Using AIC and BIC in Python**

Let’s demonstrate how to calculate AIC and BIC for a simple regression model using Python:

```python
import statsmodels.api as sm
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

# Load a dataset (e.g., Boston housing)
from sklearn.datasets import load_boston
boston = load_boston()
boston_df = pd.DataFrame(boston.data, columns=boston.feature_names)
boston_df['PRICE'] = boston.target

# Prepare data
X = boston_df.drop('PRICE', axis=1)
y = boston_df['PRICE']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Add a constant term to the model (for intercept)
X_train_const = sm.add_constant(X_train)

# Fit the model using statsmodels
model = sm.OLS(y_train, X_train_const).fit()

# Get AIC and BIC
print(f"AIC: {model.aic}")
print(f"BIC: {model.bic}")
```

This code uses **Ordinary Least Squares (OLS)** regression to model the relationship between the predictors and the target variable. After fitting the model, `statsmodels` automatically computes AIC and BIC, which can be accessed using `model.aic` and `model.bic`.

---

### **Key takeaways**
- **AIC** and **BIC** are criteria for model selection based on how well a model fits the data and how complex the model is.
- Both penalize complex models to avoid overfitting, but BIC applies a stricter penalty, particularly as the sample size increases.
- The model with the **lowest AIC** or **lowest BIC** is generally considered the best for a given dataset, but which criterion to use depends on the goals of your analysis (whether you prioritize model simplicity or goodness of fit).