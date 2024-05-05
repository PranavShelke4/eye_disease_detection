import os
import numpy as np
from flask import Flask, jsonify, request, send_from_directory
from keras.models import load_model
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your trained model
model = load_model('./final.h5')

# Define your image preprocessing function
def preprocess_image(image_path):
    image = Image.open(image_path)
    image = image.resize((150, 150))
    test = np.array(image)
    test = np.expand_dims(test, axis=0)
    return test

# Define the main prediction endpoint
@app.route('/predict', methods=['POST'])
def apicall():
    try:
        image = request.files.getlist('files[]')[0]
        im = Image.open(image)
        im = im.resize((150, 150))
        
        test = np.array(im)
        test = np.expand_dims(test, axis=0)
        
        prediction = model.predict(test)
        predictions = prediction.tolist()[0]
        predicted_class = np.argmax(predictions)
        percentage = float(predictions[predicted_class])

        response_data = {
            "predicted_class": str(predicted_class),
            "percentage": percentage
        }

        responses = jsonify(response_data)
        responses.status_code = 200

        return responses

    except Exception as e:
        print("Error:", str(e))
        response_data = {"error": "Internal Server Error"}
        responses = jsonify(response_data)
        responses.status_code = 500
        return responses

# New route to get class names
@app.route('/class_names', methods=['GET'])
def get_class_names():
    class_names = ['Cataract', 'Diabetes', 'Glaucoma', 'Normal', 'Other']
    return jsonify(class_names)

# Route to serve static files (images) from the correct directory
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('./ML/EyE/Train/Cataract/', filename)

if __name__ == '__main__':
    app.run(debug=True)
