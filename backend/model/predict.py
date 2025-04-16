import sys
import json
import pandas as pd
import pickle
import os
import traceback

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

def load_model():
    """Load the trained model from the pickle file"""
    try:
        # Try to load the model from the current directory
        model_path = os.path.join(script_dir, 'placement_predictor_model.pkl')
        if not os.path.exists(model_path):
            # If not found, try the original path
            model_path = os.path.join(script_dir, '..', '..', 'frontend', 'src', 'models', 'placement_predictor_model.pkl')
        
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
        
        # Load the model
        model = load_model()
        
        # Make prediction
        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]
        
        # Return the prediction as JSON
        result = {
            "placed": int(prediction),
            "probability": float(probability)
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        error_msg = f"Prediction failed: {str(e)}"
        print(json.dumps({"error": error_msg}))
        sys.exit(1)

if __name__ == "__main__":
    main()