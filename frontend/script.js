function predict() {
  const data = {
    "gender": document.getElementById("gender").value,
    "race/ethnicity": document.getElementById("race").value,
    "parental level of education": document.getElementById("education").value,
    "lunch": document.getElementById("lunch").value,
    "test preparation course": document.getElementById("prep").value
  };

  document.getElementById("result").innerHTML = "Predicting...";

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    if (result.error) {
      document.getElementById("result").innerHTML =
        "Error: " + result.error;
    } else {
      document.getElementById("result").innerHTML =
        `<p><b>Predicted Average Score:</b> ${result.predicted_average_score}</p>
         <p><b>Performance Level:</b> ${result.performance_level}</p>`;
    }
  })
  .catch(err => {
    document.getElementById("result").innerHTML =
      "Backend not reachable";
    console.error(err);
  });
}
