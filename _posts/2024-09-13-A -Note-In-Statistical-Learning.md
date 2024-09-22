---
layout: post
title: A note in Statistical Learning with python
tags: [Python]
author: unkmown
author_profile: "./assets/static/logo.jpeg"
summary: Statistical learning is a field that involves the use of statistics to understand and predict data patterns. It provides a set of tools for modeling and understanding complex datasets, widely used in machine learning and data science. Here’s a breakdown of the key concepts and a step-by-step tutorial on statistical learning
---
Statistical learning is a field that involves the use of statistics to understand and predict data patterns. It provides a set of tools for modeling and understanding complex datasets, widely used in machine learning and data science.  Below, let's give key points in Statistical learn and explain those points with pratical implementations.

## Part A: Element of the theory
### 1. **Introduction to Statistical Learning**

Statistical learning is about building models to explain and predict relationships between variables. It involves:
- **Supervised learning**: Learning a function from labeled data, e.g., predicting a house price based on its features (regression) or classifying emails as spam or not (classification).
- **Unsupervised learning**: Learning patterns in unlabeled data, e.g., clustering customers into different segments.

### 2. **Types of Models**
- **Parametric models**: Assume a specific form for the function (e.g., linear models).
- **Non-parametric models**: Do not assume any specific form (e.g., k-nearest neighbors).

### 3. **Basic Concepts**
- **Predictors (features)**: The variables used to make predictions.
- **Response (target)**: The variable we aim to predict.
- **Modeling**: Using data to estimate the relationship between predictors and response.
- **Training vs. Testing Data**: Splitting data to ensure models generalize well to unseen data.

## Part B: Step-by-step tutorial with python
#### **Step 1: Setting up the Environment**
Install the necessary libraries:
```bash
pip install numpy pandas scikit-learn matplotlib seaborn
```

#### **Step 2: Loading and Exploring Data**
We'll use the **Iris dataset** for classification and **Boston Housing dataset** for regression as examples.

```python
import pandas as pd
from sklearn.datasets import load_iris, load_boston

# Iris data for classification
iris = load_iris()
iris_df = pd.DataFrame(data=iris.data, columns=iris.feature_names)
iris_df['target'] = iris.target
print(iris_df.head())

# Boston Housing data for regression (Deprecated in some versions)
boston = load_boston()
boston_df = pd.DataFrame(data=boston.data, columns=boston.feature_names)
boston_df['PRICE'] = boston.target
print(boston_df.head())
```

#### **Step 3: Data Preprocessing**
For modeling, it’s essential to preprocess data:
- **Handling missing values**: Use techniques like mean imputation.
- **Feature scaling**: Standardize features to bring them to the same scale.

```python
from sklearn.preprocessing import StandardScaler

# Scale features for Boston dataset
scaler = StandardScaler()
boston_scaled = scaler.fit_transform(boston_df.drop('PRICE', axis=1))
```

#### **Step 4: Building a Model**
We’ll use **Linear Regression** for regression and **Logistic Regression** for classification. Other models include Decision Trees, Support Vector Machines, and k-Nearest Neighbors.

##### **Linear Regression** (Boston Housing)
```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Split data
X_train, X_test, y_train, y_test = train_test_split(boston_scaled, boston_df['PRICE'], test_size=0.2, random_state=42)

# Model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")
```

##### **Logistic Regression** (Iris Classification)
```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Split data
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2, random_state=42)

# Model
log_reg = LogisticRegression(max_iter=200)
log_reg.fit(X_train, y_train)

# Predictions
y_pred = log_reg.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")
```

#### **Step 5: Model Evaluation**
Evaluate models using metrics like:
- **For regression**: Mean Squared Error (MSE), R-squared.
- **For classification**: Accuracy, Precision, Recall, F1-score.

```python
# For classification (Logistic Regression)
from sklearn.metrics import classification_report
print(classification_report(y_test, y_pred))
```

#### **Step 6: Cross-Validation**
Use **k-fold cross-validation** to get a more reliable measure of model performance.
```python
from sklearn.model_selection import cross_val_score

# Cross-validation for Linear Regression
cv_scores = cross_val_score(LinearRegression(), boston_scaled, boston_df['PRICE'], cv=5)
print(f"Cross-Validation MSE: {cv_scores.mean()}")
```

#### **Step 7: Hyperparameter Tuning**
Optimize models by tuning hyperparameters using techniques like GridSearchCV.

```python
from sklearn.model_selection import GridSearchCV

# Hyperparameter tuning for Logistic Regression
param_grid = {'C': [0.1, 1, 10, 100]}
grid = GridSearchCV(LogisticRegression(max_iter=200), param_grid, cv=5)
grid.fit(X_train, y_train)
print(grid.best_params_)
```

#### **Step 8: Visualizing Results**
Use `matplotlib` and `seaborn` for data and model visualization.

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Plot regression results
plt.scatter(y_test, y_pred)
plt.xlabel("True Values")
plt.ylabel("Predicted Values")
plt.title("Regression Predictions vs. True Values")
plt.show()

# Plot classification results
sns.heatmap(pd.crosstab(y_test, y_pred), annot=True, fmt='d')
plt.xlabel('Predicted')
plt.ylabel('True')
plt.title('Confusion Matrix')
plt.show()
```

### **Key Takeaways**
- **Bias-Variance Tradeoff**: Strive for the balance between underfitting (high bias) and overfitting (high variance).
- **Model Regularization**: Use Lasso or Ridge regularization to prevent overfitting.
- **Feature Selection**: Choose the most important features for better model performance.

#### **Step 9: Advanced Topics**

##### **1. Regularization**
Regularization techniques add penalties to the model complexity to prevent overfitting. Common methods include:
- **Ridge Regression** (L2 Regularization): Adds a penalty proportional to the square of the magnitude of coefficients.
- **Lasso Regression** (L1 Regularization): Adds a penalty proportional to the absolute value of the coefficients, which can also lead to feature selection.

```python
from sklearn.linear_model import Ridge, Lasso

# Ridge Regression
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)
print(f"Ridge Coefficients: {ridge.coef_}")

# Lasso Regression
lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)
print(f"Lasso Coefficients: {lasso.coef_}")
```

##### **2. Model Selection and Evaluation**
- **Cross-Validation**: Helps in evaluating model performance more reliably.
- **Model Selection Criteria**: Use metrics like AIC (Akaike Information Criterion) and BIC (Bayesian Information Criterion) for model selection.

```python
from sklearn.model_selection import KFold, cross_val_score

kf = KFold(n_splits=5, shuffle=True, random_state=42)
cv_scores = cross_val_score(LinearRegression(), boston_scaled, boston_df['PRICE'], cv=kf)
print(f"Cross-Validation MSE: {cv_scores.mean()}")
```

##### **3. Ensemble Methods**
Ensemble methods combine multiple models to improve performance:
- **Bagging**: Reduces variance by training multiple models on different subsets of data and averaging their predictions (e.g., Random Forest).
- **Boosting**: Reduces bias by sequentially training models that correct errors of the previous models (e.g., Gradient Boosting).

```python
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier

# Random Forest
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
print(f"Random Forest Score: {rf.score(X_test, y_test)}")

# Gradient Boosting
gb = GradientBoostingClassifier(n_estimators=100, random_state=42)
gb.fit(X_train, y_train)
print(f"Gradient Boosting Accuracy: {gb.score(X_test, y_test)}")
```

##### **4. Dimensionality Reduction**
Reducing the number of features while retaining essential information:
- **Principal Component Analysis (PCA)**: Transforms features into a lower-dimensional space.
- **t-SNE**: Useful for visualizing high-dimensional data.

```python
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE

# PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(boston_scaled)
print(f"PCA Explained Variance Ratio: {pca.explained_variance_ratio_}")

# t-SNE
tsne = TSNE(n_components=2, random_state=42)
X_tsne = tsne.fit_transform(boston_scaled)
```

##### **5. Handling Imbalanced Data**
For classification tasks with imbalanced classes:
- **Resampling Techniques**: Use oversampling (e.g., SMOTE) or undersampling to balance classes.
- **Evaluation Metrics**: Use metrics like Precision-Recall curves and ROC-AUC.

```python
from imblearn.over_sampling import SMOTE
from sklearn.metrics import roc_auc_score

# Resampling
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)

# Model evaluation
y_pred_prob = log_reg.predict_proba(X_test)[:, 1]
roc_auc = roc_auc_score(y_test, y_pred_prob)
print(f"ROC-AUC Score: {roc_auc}")
```

#### **Further Readings**

1. **Books**:
   - **"The Elements of Statistical Learning"** by Trevor Hastie, Robert Tibshirani, and Jerome Friedman: A comprehensive resource on statistical learning theory and applications.
   - **"Pattern Recognition and Machine Learning"** by Christopher Bishop: A detailed book covering both statistical learning and machine learning techniques.
   - **"Introduction to Statistical Learning"** by Gareth James, Daniela Witten, Trevor Hastie, and Robert Tibshirani: A more accessible introduction compared to the Elements of Statistical Learning.

2. **Online Courses**:
   - **"Statistical Learning"** by Stanford University (available on [Stanford Online](https://online.stanford.edu/courses/cs109-statistical-learning)): A free course by Trevor Hastie and Rob Tibshirani.
   - **"Machine Learning"** by Andrew Ng (available on [Coursera](https://www.coursera.org/learn/machine-learning)): Covers both fundamental concepts and practical applications.

3. **Research Papers**:
   - **"A Few Useful Things to Know About Machine Learning"** by Pedro Domingos: Provides insights into common pitfalls and best practices in machine learning.
   - **"Gradient-Based Learning Applied to Document Recognition"** by Yann LeCun, Léon Bottou, Yoshua Bengio, and Patrick Haffner: Discusses deep learning methods that can be linked to statistical learning.

4. **Tutorials and Documentation**:
   - **Scikit-Learn Documentation**: [Scikit-Learn User Guide](https://scikit-learn.org/stable/user_guide.html) for practical examples and explanations.
   - **Towards Data Science**: Articles and tutorials on statistical learning and machine learning concepts ([Towards Data Science](https://towardsdatascience.com/)).

