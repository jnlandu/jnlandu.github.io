---
layout: post
toc: true
title: "Forecasting with Time Series"
categories: junk
tags: [Python]
author:
  - Jérémie  Mabiala
summary: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus 
  sint impedit doloremque reprehenderit, facilis quo optio veritatis molestias 
  autem sit amet magni laborum veniam corporis quam nostrum nam iure incidunt.
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed autem atque fuga quam 
  ab architecto repudiandae amet perferendis, ea excepturi cupiditate nisi
  dolorem? Earum error adipisci nobis, dignissimos culpa quidem?.
---

### Step 1: Setting Up Your Environment
To work with time series data in Python, you'll need to install several libraries that facilitate data manipulation and visualization, as well as statistical modeling:

```bash
pip install numpy pandas matplotlib statsmodels scikit-learn
```

### Step 2: Importing Libraries
You'll use these libraries frequently, so it's good to import them at the beginning of your script:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
```

### Step 3: Loading and Preparing Data
Time series analysis requires data to be in a sequence of measurements over intervals of time. Here's how you can load and prepare your data:

```python
# Load a dataset
df = pd.read_csv('your_data.csv', parse_dates=True, index_col='Date')

# Check the first few rows
print(df.head())

# Plot the data
df.plot()
plt.show()
```

### Step 4: Checking Stationarity
Most time series models assume that the underlying data is stationary. This assumption can be checked using statistical tests, such as the Augmented Dickey-Fuller (ADF) test:

```python
from statsmodels.tsa.stattools import adfuller

result = adfuller(df['Value'])
print('ADF Statistic: %f' % result[0])
print('p-value: %f' % result[1])
```

### Step 5: Making the Series Stationary
If the series is not stationary, you may need to transform it, typically by differencing:

```python
# Differencing the series
df['Differenced'] = df['Value'].diff()

# Drop NA
df.dropna(inplace=True)

# Check if the differenced series is stationary
result = adfuller(df['Differenced'])
print('ADF Statistic after differencing: %f' % result[0])
print('p-value: %f' % result[1])

df['Differenced'].plot()
plt.show()
```

### Step 6: Building a Forecasting Model
ARIMA (AutoRegressive Integrated Moving Average) is one of the most common time series forecasting techniques:

```python
# Split data into train and test
train, test = train_test_split(df['Differenced'], test_size=0.2, shuffle=False)

# Build Model
model = ARIMA(train, order=(1,1,1))  # (p,d,q) order can be determined using ACF and PACF plots
model_fit = model.fit()

# Summary of the model
print(model_fit.summary())
```

### Step 7: Making Predictions
After fitting the model, you can make predictions and compare them against your test set:

```python
# Forecast
forecasts = model_fit.forecast(steps=len(test))

# Plot forecasts against actual outcomes
plt.figure(figsize=(12,6))
plt.plot(test.index, test, label='Actual')
plt.plot(test.index, forecasts, label='Forecast', color='red')
plt.legend()
plt.show()
```

### Step 8: Model Evaluation
Evaluate the accuracy of your forecasts using metrics such as Mean Squared Error (MSE):

```python
mse = mean_squared_error(test, forecasts)
print('MSE: ', mse)
```

### Additional Tips
- **Model Selection**: Depending on the characteristics of your time series, other models like SARIMA, Prophet by Facebook, or even LSTM networks might be more suitable.
- **Parameter Tuning**: Use grid search or similar techniques to find optimal parameters for your models.
- **Seasonality**: If your data exhibits seasonality, consider using seasonal decompositions or models that explicitly account for seasonal effects, like SARIMA.

This tutorial covers the fundamentals of time series forecasting with Python. For deeper insights, consider exploring more advanced statistical tests, additional models, and Python libraries dedicated to time series analysis.