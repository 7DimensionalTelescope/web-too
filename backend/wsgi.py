from app import create_app

app = create_app()

if __name__ == '__main__':
    # Run the Flask app with the specified or default port
    app.run(debug=True)
