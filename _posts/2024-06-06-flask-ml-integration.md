---
layout: post
toc: true
title: "Flask and Machine Learning Integration"
categories: 
tags: [Pyhton, Flask, Html]
author:
  - Jérémie N. Mabiala
#   - Nelson Mandela Muntz
author_profile: "./assets/static/logo.jpeg"
summary: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus 
  sint impedit doloremque reprehenderit, facilis quo optio veritatis molestias 
  autem sit amet magni laborum veniam corporis quam nostrum nam iure incidunt.
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed autem atque fuga quam 
  ab architecto repudiandae amet perferendis, ea excepturi cupiditate nisi
  dolorem? Earum error adipisci nobis, dignissimos culpa quidem?.
---
# Flask and Machine Learning Integration

In this tutorial, we will learn how to integrate a Machine Learning model with a Flask web application. We will build a simple machine learning model using `scikit-learn`, create a Flask app, and set up endpoints to serve predictions from our model.

## Table of Contents
1. [Introduction](#introduction)
2. [Setting Up the Environment](#setting-up-the-environment)
3. [Building the Machine Learning Model](#building-the-machine-learning-model)
4. [Creating the Flask Application](#creating-the-flask-application)
5. [Integrating the Model with Flask](#integrating-the-model-with-flask)
6. [Testing the Application](#testing-the-application)
7. [Conclusion](#conclusion)

## Introduction

Flask is a lightweight WSGI web application framework in Python. It is designed with simplicity and flexibility in mind. We will use Flask to create a web service that can serve predictions from a machine learning model.

## Setting Up the Environment

First, let's set up our environment. We will need `Flask` and `scikit-learn`.

```bash
pip install Flask scikit-learn
```

## Building the Machine Learning Model

For this tutorial, we will use a simple linear regression model to predict house prices based on some features.

```python
# model.py

import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

# Generate sample data
np.random.seed(0)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model to a file
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)
```

## Creating the Flask Application

Now, let's create a basic Flask application structure.

```bash
mkdir flask_ml
cd flask_ml
touch app.py
```

In `app.py`, set up the basic Flask app.

```python
# app.py

from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home():
    return "Welcome to the Machine Learning Model API!"

if __name__ == '__main__':
    app.run(debug=True)
```

## Integrating the Model with Flask

We will create an endpoint `/predict` that will take input features, pass them to the model, and return the prediction.

```python
# app.py

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features)
    return jsonify({'prediction': prediction[0][0]})
```

## Testing the Application

Run the Flask app and test the prediction endpoint using `curl` or Postman.

```bash
python app.py
```

Use `curl` to test the `/predict` endpoint.

```bash
curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d '{"features": [1.5]}'
```

You should get a response with the prediction.

## Conclusion

In this tutorial, we created a simple linear regression model, saved it, and built a Flask application to serve predictions from the model. This approach can be extended to more complex models and use cases. For a production environment, consider using more advanced techniques like model versioning, authentication, and containerization with Docker.

For further reading, you may refer to:
- [Flask Documentation](https://flask.palletsprojects.com/)
- [scikit-learn Documentation](https://scikit-learn.org/stable/documentation.html)

```

You can save this content into a `.md` file and view it using any Markdown editor. Let me know if you need any additional details or modifications!