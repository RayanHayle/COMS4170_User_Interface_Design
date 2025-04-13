# Rayan Hayle, Rah2236
from flask import Flask, render_template, jsonify, request
import json

app = Flask(__name__)

# Load data from JSON file
with open('data.json', 'r') as file:
    city_data = json.load(file)

@app.route('/') #homepage
def home():
    return render_template('index.html')

@app.route('/get_city_data') #data.json
def get_city_data():
    return jsonify(city_data)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '').strip()  # Get the search query
    results = []

    # Only search if the query is not empty
    if query:
        for city in city_data:
            if query.lower() in city['city'].lower():  
                results.append(city)

    return jsonify(results)

# Route to view city details
@app.route('/city/<city_name>')
def city_details(city_name):
    # Check if the city exists in the data
    city_info = next((city for city in city_data if city['city'].lower() == city_name.lower()), None)
    if city_info:
        return render_template('city_details.html', city=city_info)
    
    # Render the error page if city not found
    return render_template('error.html'), 404  # Render error page instead of plain text

if __name__ == '__main__':
    app.run(debug=True)