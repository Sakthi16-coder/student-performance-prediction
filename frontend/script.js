function resetForm(){
  document.getElementById("gender").value = "female";
  document.getElementById("race").value = "group C";
  document.getElementById("education").value = "some college";
  document.getElementById("lunch").value = "standard";
  document.getElementById("prep").value = "none";

  document.getElementById("result").innerHTML = `
    <div class="placeholder">
      <div class="big">—</div>
      <div>Waiting for prediction…</div>
    </div>`;
}

function badgeClass(level){
  const x = (level || "").toLowerCase();
  if (x.includes("low")) return "low";
  if (x.includes("high")) return "high";
  return "medium";
}

function predict(){
  const btn = document.getElementById("predictBtn");
  btn.disabled = true;
  btn.style.opacity = "0.8";

  const data = {
    "gender": document.getElementById("gender").value,
    "parental level of education": document.getElementById("education").value,
    "lunch": document.getElementById("lunch").value,
    "test preparation course": document.getElementById("prep").value
  };

  document.getElementById("result").innerHTML = `
    <div class="placeholder">
      <div class="big">…</div>
      <div>Predicting…</div>
    </div>`;

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    if (result.error) {
      document.getElementById("result").innerHTML = `
        <div class="placeholder">
          <div class="big">!</div>
          <div><b>Error:</b> ${result.error}</div>
        </div>`;
      return;
    }

    const score = result.predicted_average_score;
    const level = result.performance_level;
    const cls = badgeClass(level);

    document.getElementById("result").innerHTML = `
      <div class="kpiRow">
        <div class="kpi">
          <div class="label">Predicted Average Score</div>
          <div class="value">${score}</div>
        </div>
        <div class="kpi">
          <div class="label">Performance Level</div>
          <div class="value"><span class="badge ${cls}">${level}</span></div>
        </div>
      </div>`;
  })
  .catch(err => {
    document.getElementById("result").innerHTML = `
      <div class="placeholder">
        <div class="big">×</div>
        <div>Backend not reachable. Start backend: <code>py -m backend.app</code></div>
      </div>`;
    console.error(err);
  })
  .finally(() => {
    btn.disabled = false;
    btn.style.opacity = "1";
  });
}
