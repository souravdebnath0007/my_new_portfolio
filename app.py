from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name", "")
    email = data.get("email", "")
    message = data.get("message", "")
    # For now, just log it. Add email sending later if needed.
    print(f"Contact form submission from {name} ({email}): {message}")
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True)
