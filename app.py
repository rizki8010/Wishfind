from flask import Flask, render_template, request
from keras.models import load_model  # type: ignore
import os
import pandas as pd
import numpy as np
import pickle

app = Flask(__name__)
app.template_folder = os.path.join(os.getcwd(), "templates", "html")

# Load the models
EF_model = load_model(
    "energy_efficiency_model.h5", custom_objects={"mse": "mean_squared_error"}
)
stats = pickle.load(open("stats.pkl", "rb"))


def norm(X, stats):
    if X.ndim == 1:
        return (X - stats["mean"]) / stats["std"]
    else:
        return (X - stats["mean"].values) / stats["std"].values


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/masahiro")
def masahiro():
    return render_template("masahiro.html")


@app.route("/ilham")
def ilham():
    return render_template("ilham.html")


@app.route("/yonathan")
def yonathan():
    return render_template("yonathan.html")


@app.route("/fadilah")
def fadilah():
    return render_template("eledison.html")


@app.route("/machine")
def machine():
    return render_template("machine.html")


@app.route("/predict", methods=["POST"])
def predict():
    # Get the input values from the form
    values = [
        float(request.form.get(f))
        for f in [
            "Relative_Compactness",
            "Surface_Area",
            "Wall_Area",
            "Roof_Area",
            "Overall_Height",
            "Orientation",
            "Glazing_Area",
            "Glazing_Area_Distribution",
        ]
    ]

    # Convert values list to numpy array
    values = np.array(values)

    # Normalizing the input
    values = norm(values, stats)

    values_reshaped = np.reshape(values, (1, -1))

    # Predict heating load
    heating_load = EF_model.predict([values_reshaped])[0][0][0]

    # Predict cooling load
    cooling_load = EF_model.predict([values_reshaped])[1][0][0]

    return render_template(
        "machine.html", heating_load=heating_load, cooling_load=cooling_load
    )


if __name__ == "__main__":
    app.run(debug=True)
