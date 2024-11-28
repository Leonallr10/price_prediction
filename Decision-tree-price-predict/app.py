# app.py
from flask import Flask, request, jsonify, render_template, send_from_directory
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import json
from typing import Dict, List, Tuple

app = Flask(__name__)

class OnlineAlgorithms:
    def __init__(self):
        self.bit_patterns = {}  # Track price change patterns
        self.timestamps = {}    # Track temporal patterns
        self.frequency = {}     # Track product popularity
        self.price_history = {} # Store historical prices
        self.similar_products = {} # Cache for similar products
        
    def update_bit_pattern(self, product_id: str, current_price: float) -> float:
        """
        Use bit pattern to predict price trends
        Returns predicted price movement (-1: decrease, 0: stable, 1: increase)
        """
        if product_id not in self.bit_patterns:
            self.bit_patterns[product_id] = {'pattern': [], 'last_price': current_price}
            return 0
            
        price_diff = current_price - self.bit_patterns[product_id]['last_price']
        bit = 1 if price_diff > 0 else 0
        
        # Store last 7 bits for pattern analysis
        pattern = self.bit_patterns[product_id]['pattern']
        pattern.append(bit)
        if len(pattern) > 7:
            pattern.pop(0)
            
        # Analyze pattern for trend prediction
        if len(pattern) >= 3:
            if sum(pattern[-3:]) >= 2:  # Upward trend
                prediction = 1
            elif sum(pattern[-3:]) <= 1:  # Downward trend
                prediction = -1
            else:
                prediction = 0
        else:
            prediction = 0
            
        self.bit_patterns[product_id]['last_price'] = current_price
        return prediction
        
    def update_timestamp(self, product_id: str) -> float:
        """
        Track temporal patterns and return time-based score
        """
        current_time = datetime.now()
        
        if product_id not in self.timestamps:
            self.timestamps[product_id] = {
                'last_update': current_time,
                'intervals': []
            }
            return 0
            
        interval = (current_time - self.timestamps[product_id]['last_update']).total_seconds()
        self.timestamps[product_id]['intervals'].append(interval)
        
        if len(self.timestamps[product_id]['intervals']) > 24:  # Keep last 24 intervals
            self.timestamps[product_id]['intervals'].pop(0)
            
        # Calculate time-based popularity score (0-1)
        avg_interval = np.mean(self.timestamps[product_id]['intervals'])
        score = 1 / (1 + np.log1p(avg_interval))  # Normalize to 0-1
        
        self.timestamps[product_id]['last_update'] = current_time
        return score
        
    def update_frequency(self, product_id: str, product_data: dict) -> Tuple[int, List[dict]]:
        """
        Track product popularity and find similar products
        Returns (frequency_count, similar_products)
        """
        if product_id not in self.frequency:
            self.frequency[product_id] = {
                'count': 0,
                'data': product_data
            }
            
        self.frequency[product_id]['count'] += 1
        
        # Find similar products based on price range and category
        if product_id not in self.similar_products:
            similar = []
            category = product_data['product']
            price = float(product_data['currentPrice'])
            
            for pid, data in self.frequency.items():
                if pid != product_id and data['data']['product'] == category:
                    price_diff = abs(float(data['data']['currentPrice']) - price)
                    if price_diff <= price * 0.2:  # Within 20% price range
                        similar.append({
                            'id': pid,
                            'name': data['data']['pdtName'],
                            'price': data['data']['currentPrice'],
                            'popularity': data['count']
                        })
            
            self.similar_products[product_id] = sorted(
                similar, 
                key=lambda x: x['popularity'], 
                reverse=True
            )[:5]  # Top 5 similar products
            
        return self.frequency[product_id]['count'], self.similar_products[product_id]
        
    def update_price_history(self, product_id: str, price: float, date: str) -> Dict:
        """
        Track price history and generate statistics
        """
        if product_id not in self.price_history:
            self.price_history[product_id] = []
            
        self.price_history[product_id].append({
            'date': date,
            'price': price
        })
        
        # Keep last 180 days of history
        if len(self.price_history[product_id]) > 180:
            self.price_history[product_id].pop(0)
            
        # Calculate price statistics
        prices = [p['price'] for p in self.price_history[product_id]]
        return {
            'min_price': min(prices),
            'max_price': max(prices),
            'avg_price': sum(prices) / len(prices),
            'price_volatility': np.std(prices) if len(prices) > 1 else 0
        }

class EnhancedPricePredictionModel:
    def __init__(self):
        # Updated festival dates with specific Indian festivals
        self.festivals = {
            'Diwali': {
                'date_range': ['2024-11-01', '2024-11-05'],
                'discount_range': (10, 25)
            },
            'Pongal': {
                'date_range': ['2024-01-14', '2024-01-17'],
                'discount_range': (10, 20)
            },
            'Tamil New Year': {
                'date_range': ['2024-04-14', '2024-04-15'],
                'discount_range': (10, 20)
            },
            'Telugu New Year': {
                'date_range': ['2024-04-09', '2024-04-10'],
                'discount_range': (10, 20)
            },
            'Christmas': {
                'date_range': ['2024-12-20', '2024-12-25'],
                'discount_range': (15, 25)
            },
            'New Year': {
                'date_range': ['2024-12-28', '2024-01-02'],
                'discount_range': (15, 25)
            }
        }
        
        # Updated bank offers with major Indian banks
        self.bank_offers = [
            {'bank': 'HDFC', 'discount': 10, 'probability': 0.15},
            {'bank': 'ICICI', 'discount': 12, 'probability': 0.12},
            {'bank': 'SBI', 'discount': 8, 'probability': 0.18},
            {'bank': 'Axis', 'discount': 15, 'probability': 0.10},
            {'bank': 'Kotak', 'discount': 7, 'probability': 0.14},
            {'bank': 'Punjab National Bank', 'discount': 9, 'probability': 0.08},
            {'bank': 'Bank of Baroda', 'discount': 11, 'probability': 0.09},
            {'bank': 'Canara Bank', 'discount': 8, 'probability': 0.07},
            {'bank': 'Yes Bank', 'discount': 13, 'probability': 0.05},
            {'bank': 'Federal Bank', 'discount': 10, 'probability': 0.06}
        ]

    def is_festival_day(self, date: datetime) -> tuple:
        for festival, details in self.festivals.items():
            start = datetime.strptime(details['date_range'][0], '%Y-%m-%d')
            end = datetime.strptime(details['date_range'][1], '%Y-%m-%d')
            if start <= date <= end:
                return True, festival, details['discount_range']
        return False, None, None

    def get_bank_offer(self, date: datetime) -> dict:
        # Reduced probability to make bank offers rarer (20% chance per day)
        if random.random() < 0.20:
            return random.choices(
                self.bank_offers, 
                weights=[offer['probability'] for offer in self.bank_offers],
                k=1
            )[0]
        return None

    def calculate_launch_discount(self, days_since_launch: int, initial_price: float) -> float:
        # Updated launch discount logic for first 3 weeks
        if days_since_launch <= 7:  # First week
            return initial_price * 0.20  # 20% discount
        elif days_since_launch <= 14:  # Second week
            return initial_price * 0.15  # 15% discount
        elif days_since_launch <= 21:  # Third week
            return initial_price * 0.10  # 10% discount
        return 0  # No launch discount after 3 weeks

    def is_night_time(self, date: datetime) -> bool:
        # Consider night time between 10 PM and 6 AM
        hour = date.hour
        return hour >= 22 or hour < 6

    def predict_daily_prices(self, initial_price: float, launch_date: str, days: int = 180) -> List[Dict]:
        predictions = []
        launch_datetime = datetime.strptime(launch_date, '%Y-%m-%d')
        current_date = datetime.now()

        for day_offset in range(days):
            prediction_date = current_date + timedelta(days=day_offset)
            base_price = initial_price
            discounts = []
            
            # Weekend discount (Saturday and Sunday) - fixed 5%
            if prediction_date.weekday() >= 5:
                discounts.append(('Weekend', 5.0))
            
            # Festival discount (10-25%)
            is_festival, festival_name, discount_range = self.is_festival_day(prediction_date)
            if is_festival:
                festival_discount = random.uniform(discount_range[0], discount_range[1])
                discounts.append((festival_name, festival_discount))
            
            # Night time discount (5-10%, rare occurrence)
            if self.is_night_time(prediction_date) and random.random() < 0.3:  # 30% chance for night discount
                night_discount = random.uniform(5, 10)
                discounts.append(('Night Offer', night_discount))
            
            # Launch discount (20%, 15%, 10% for first 3 weeks)
            days_since_launch = (prediction_date - launch_datetime).days
            launch_discount = self.calculate_launch_discount(days_since_launch, initial_price)
            if launch_discount > 0:
                discount_percentage = (launch_discount/initial_price) * 100
                discounts.append(('Launch Offer', discount_percentage))
            
            # Bank offer (random bank, rare occurrence)
            bank_offer = self.get_bank_offer(prediction_date)
            if bank_offer:
                discounts.append((f"{bank_offer['bank']} Bank Offer", bank_offer['discount']))
            
            # Calculate final price with all applicable discounts
            total_discount_percentage = min(sum(discount[1] for discount in discounts), 40)  # Cap total discount at 40%
            final_price = base_price * (1 - total_discount_percentage/100)
            
            predictions.append({
                'date': prediction_date.strftime('%Y-%m-%d'),
                'predicted_price': round(final_price, 2),
                'original_price': initial_price,
                'total_discount': round(total_discount_percentage, 1),
                'active_discounts': discounts,
                'is_weekend': prediction_date.weekday() >= 5,
                'is_festival': is_festival,
                'festival_name': festival_name if is_festival else None,
                'season': self.get_season(prediction_date)
            })
        
        return predictions

    def get_season(self, date: datetime) -> str:
        # Added helper method to determine season
        month = date.month
        if month in [3, 4, 5]:
            return 'Summer'
        elif month in [6, 7, 8, 9]:
            return 'Monsoon'
        elif month in [10, 11]:
            return 'Post-Monsoon'
        else:
            return 'Winter'

# Initialize global instances
price_predictor = EnhancedPricePredictionModel()
online_algorithms = OnlineAlgorithms()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        product_id = f"{data['product']}_{data['pdtName']}"
        current_price = float(data['currentPrice'])
        
        # Get predictions from price predictor
        predictions = price_predictor.predict_daily_prices(
            initial_price=float(data['initialPrice']),
            launch_date=data['launchDate']
        )
        
        # Update online algorithms
        bit_counter = online_algorithms.update_bit_pattern(product_id, current_price)
        time_since_update = online_algorithms.update_timestamp(product_id)
        update_frequency, similar_products = online_algorithms.update_frequency(product_id, data)
        price_stats = online_algorithms.update_price_history(
            product_id, 
            current_price,
            datetime.now().strftime('%Y-%m-%d')
        )
        
        # Enhanced online metrics
        online_metrics = {
            'bit': bit_counter,
            'timestamp': time_since_update,
            'frequency': update_frequency,
            'price_stats': price_stats,
            'similar_products': similar_products
        }
        
        return jsonify({
            'status': 'success',
            'predictions': predictions,
            'online_metrics': online_metrics
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

if __name__ == '__main__':
    app.run(debug=True)