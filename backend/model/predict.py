import sys
import json
import pandas as pd
import pickle
import os
import traceback

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Model accuracy information based on the image
MODEL_ACCURACIES = {
    "linear_regression": 0.8642,
    "logistic_regression": 0.8889,
    "decision_tree": 0.8025,
    "random_forest": 0.8889,
    "svm": 0.8642,
    "naive_bayes": 0.6667,
    "knn": 0.7407,
    "neural_network": 0.8765,
    "gradient_boosting": 0.8765
}

# Get available models from the directory
def get_available_models():
    """Get a list of available trained models in the model directory"""
    try:
        models = []
        for file in os.listdir(script_dir):
            if file.startswith("placement_predictor_") and file.endswith(".pkl"):
                model_name = file.replace("placement_predictor_", "").replace(".pkl", "")
                models.append(model_name)
        return models
    except Exception as e:
        print(json.dumps({"error": f"Failed to get available models: {str(e)}"}))
        return list(MODEL_ACCURACIES.keys())  # Fallback to predefined list

def load_model(model_name):
    """Load the specified trained model from the pickle file"""
    try:
        # Get available models
        available_models = get_available_models()
        
        # Validate model name
        if model_name not in available_models:
            error_msg = f"Model '{model_name}' is not available. Available models: {', '.join(available_models)}"
            print(json.dumps({"error": error_msg}))
            sys.exit(1)
            
        model_filename = f"placement_predictor_{model_name}.pkl"
        model_path = os.path.join(script_dir, model_filename)
        
        # Use json.dumps for all output to ensure valid JSON
        print(json.dumps({"info": f"Loading model from: {model_path}"}))
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        return model
    except Exception as e:
        print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
        sys.exit(1)

def process_input(data):
    """Process the input data into the format expected by the model"""
    try:
        # Create a DataFrame with the same structure as the training data
        input_df = pd.DataFrame({
            'Gender': [data.get('gender', 'Male')],
            '10th board': [data.get('tenthBoard', 'CBSE')],
            '10th marks': [float(data.get('tenthMarks', 0))],
            '12th board': [data.get('twelfthBoard', 'CBSE')],
            '12th marks': [float(data.get('twelfthMarks', 0))],
            'Stream': [data.get('stream', 'Computer Science and Engineering')],
            'Cgpa': [float(data.get('cgpa', 0))],
            'Internships(Y/N)': [1 if data.get('internships') else 0],
            'Training(Y/N)': [1 if data.get('training') else 0],
            'Backlog in 5th sem': [1 if data.get('backlog') else 0],
            'Innovative Project(Y/N)': [1 if data.get('innovativeProject') else 0],
            'Communication level': [int(data.get('communicationLevel', 1))],
            'Technical Course(Y/N)': [1 if data.get('technicalCourse') else 0]
        })
        
        # Use json.dumps for all output to ensure valid JSON
        print(json.dumps({"info": "Input processed successfully"}))
        return input_df
    except Exception as e:
        print(json.dumps({"error": f"Failed to process input: {str(e)}"}))
        sys.exit(1)

def main():
    try:
        # Get input data from command line argument
        input_json = sys.argv[1]
        data = json.loads(input_json)
        
        # Use json.dumps for all debug output
        print(json.dumps({"debug": "Data received", "data": data}))
        
        # Process the input data
        input_df = process_input(data)
        
        # Get the model name from the request - no default provided
        if 'modelName' not in data:
            print(json.dumps({"error": "No model name provided in request"}))
            sys.exit(1)
            
        model_name = data['modelName']
        
        # Load the model - will exit with error if model not available
        model = load_model(model_name)
        
        # Make prediction
        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]
        
        # Get all available models for the response
        available_models = get_available_models()
        
        # Return the prediction as JSON
        result = {
            "placed": int(prediction),
            "probability": float(probability),
            "model": model_name,
            "accuracy": MODEL_ACCURACIES.get(model_name, 0.0),
            "available_models": available_models
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        error_msg = f"Prediction failed: {str(e)}"
        print(json.dumps({"error": error_msg}))
        sys.exit(1)

if __name__ == "__main__":
    main()