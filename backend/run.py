import argparse
from app import create_app

app = create_app()

if __name__ == '__main__':
    # Set up argument parser
    parser = argparse.ArgumentParser(description="Run the Flask application.")
    parser.add_argument(
        "--port", 
        type=int, 
        default=5000, 
        help="Port to run the Flask app on (default: 5000)."
    )
    args = parser.parse_args()

    # Run the Flask app with the specified or default port
    app.run(debug=True, host='0.0.0.0', port=args.port)
