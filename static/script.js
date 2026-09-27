const form = document.getElementById("loanForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Predicting...";

    const data = {
        person_age: Number(form.person_age.value),
        person_income: Number(form.person_income.value),
        person_home_ownership: form.person_home_ownership.value,
        person_emp_length: Number(form.person_emp_length.value),
        loan_intent: form.loan_intent.value,
        loan_grade: form.loan_grade.value,
        loan_amnt: Number(form.loan_amnt.value),
        loan_int_rate: Number(form.loan_int_rate.value),
        loan_percent_income: Number(form.loan_percent_income.value),
        cb_person_default_on_file: form.cb_person_default_on_file.value,
        cb_person_cred_hist_length: Number(form.cb_person_cred_hist_length.value)
    };

    try {
        const res = await fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const text = await res.text();
            alert("Backend Error:\n" + text);
            return;
        }

        const result = await res.json();

        const box = document.getElementById("result");
        document.getElementById("risk").innerText = result.Result;
        document.getElementById("prob").innerText =
            (result.default_probability * 100).toFixed(2) + "%";

        box.className = result.Result === "High Risk" ? "high" : "low";
        box.classList.remove("hidden");

    } catch (err) {
        alert(err.message);
    } finally {
        button.disabled = false;
        button.textContent = "Predict Risk";
    }
});
