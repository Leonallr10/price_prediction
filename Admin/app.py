from flask import Flask, request, render_template_string
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from datetime import datetime

app = Flask(__name__)

# Load data
data = pd.read_excel('main.xlsx')  # Adjust file path as needed

# Convert current_date to datetime format
data['current_date'] = pd.to_datetime(data['current_date'], format='%d-%m-%Y')

# Extract date features
data['year'] = data['current_date'].dt.year
data['month'] = data['current_date'].dt.month
data['day'] = data['current_date'].dt.day

# One-hot encode categorical features
categorical_cols = ['pdt_name', 'storage', 'RAM']
encoder = OneHotEncoder(sparse_output=False)
encoded_features = encoder.fit_transform(data[categorical_cols])
encoded_feature_names = encoder.get_feature_names_out(categorical_cols)

# Create a DataFrame with the encoded features
encoded_df = pd.DataFrame(encoded_features, columns=encoded_feature_names)

# Concatenate encoded features with the original DataFrame
data = pd.concat([data, encoded_df], axis=1)

# Drop original categorical columns and current_date column
data = data.drop(columns=categorical_cols + ['current_date'])

# Define features and target
X = data.drop(columns='current_price')
y = data['current_price']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the regression model (e.g., Linear Regression)
model = LinearRegression()
model.fit(X_train, y_train)

# Function to predict price
def predict_price(product_name, storage, ram, date):
    # Convert date to datetime format
    date = pd.to_datetime(date, format='%d-%m-%Y')
    
    # Extract date features
    year = date.year
    month = date.month
    day = date.day
    
    # Create a DataFrame with the input features
    input_data = pd.DataFrame({
        'year': [year],
        'month': [month],
        'day': [day],
        'pdt_name_' + product_name: [1],
        'storage_' + storage: [1],
        'RAM_' + ram: [1]
    })
    
    # Fill missing columns with 0
    input_data = input_data.reindex(columns=X.columns, fill_value=0)
    
    # Predict the price
    predicted_price = model.predict(input_data)
    
    return predicted_price[0]

# HTML templates as multi-line strings
form_html = """
<!DOCTYPE html>
<html>
<head>
    <title>Price Prediction</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 500px;
            margin: 50px auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        form {
            display: grid;
            gap: 20px;
        }
        label {
            font-size: 16px;
            color: #555;
        }
        input[type="text"], input[type="date"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 16px;
        }
        input[type="submit"] {
            width: 100%;
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 12px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 16px;
        }
        input[type="submit"]:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Predict Price</h1>
        <form method="POST">
            <label for="product_name">Product Name</label>
            <input type="text" id="product_name" name="product_name" required>
            
            <label for="storage">Storage</label>
            <input type="text" id="storage" name="storage" required>
            
            <label for="ram">RAM</label>
            <input type="text" id="ram" name="ram" required>
            
            <label for="date">Date (dd-mm-yyyy)</label>
            <input type="text" id="date" name="date" required>
            
            <input type="submit" value="Predict">
        </form>
    </div>
</body>
</html>

"""

result_html = """
<!DOCTYPE html>
<html>
<head>
    <title>Price Prediction Result</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333;
        }
        p {
            text-align: center;
            color: #555;
            font-size: 18px;
        }
        .price {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .btn-container {
            text-align: center;
            margin-top: 20px;
        }
        .btn {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            text-decoration: none;
            font-size: 16px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Price Prediction Result</h1>
        <p>Predicted price for <span class="product">{{ product_name }}</span> (<span class="storage">{{ storage }}</span>, <span class="ram">{{ ram }}</span>) on <span class="date">{{ date }}</span>:</p>
        <p class="price">₹{{ predicted_price|int}}</p>
        <div class="btn-container">
            <a href="/" class="btn">Back to Prediction</a>
        </div>
    </div>
</body>
</html>


"""

# Route to display the HTML form and handle form submission
@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # Get input values from the form
        product_name = request.form.get('product_name')
        storage = request.form.get('storage')
        ram = request.form.get('ram')
        date = request.form.get('date')
        
        # Predict the price
        predicted_price = predict_price(product_name, storage, ram, date)
        
        # Render result template with the predicted price
        return render_template_string(result_html, predicted_price=predicted_price, product_name=product_name, storage=storage, ram=ram, date=date)
    
    # Render the HTML form
    return render_template_string(form_html)

if __name__ == '__main__':
    app.run(debug=True)
