const date = new Date();

document.getElementById("date").textContent =
    date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });


function saveData() {

    const water = Number(document.getElementById("water").value);
    const sleep = Number(document.getElementById("sleep").value);
    const exercise = document.getElementById("exercise").value;
    const mood = document.getElementById("mood").value;

    if (!water || !sleep) {
        alert("Please enter your water and sleep information.");
        return;
    }

    let score = 0;

    if (water >= 8) score += 25;
    else if (water >= 6) score += 20;

    if (sleep >= 8) score += 25;
    else if (sleep >= 7) score += 20;

    if (exercise === "Yes") score += 25;

    if (mood === "Happy") score += 25;
    else if (mood === "Good") score += 20;
    else if (mood === "Okay") score += 15;
    else score += 10;


    document.getElementById("score").textContent = score + "%";

    document.getElementById("waterDisplay").textContent = water;

    document.getElementById("sleepDisplay").textContent = sleep;


    document.getElementById("waterBar").style.width =
        Math.min((water / 8) * 100, 100) + "%";

    document.getElementById("sleepBar").style.width =
        Math.min((sleep / 8) * 100, 100) + "%";


    let message;

    if (score >= 90) {
        message = "Excellent consistency today! 🌟";
    } else if (score >= 70) {
        message = "Great progress. Keep building your routine! 💪";
    } else {
        message = "Every small step counts. Keep going! 🌱";
    }

    document.getElementById("scoreText").textContent = message;


    document.getElementById("summary").innerHTML = `
        💧 Water: <strong>${water} glasses</strong><br>
        😴 Sleep: <strong>${sleep} hours</strong><br>
        🏃 Activity: <strong>${exercise}</strong><br>
        😊 Mood: <strong>${mood}</strong><br>
        📊 Wellness Score: <strong>${score}%</strong>
    `;


    if (water >= 8)
        document.getElementById("badge1").classList.add("unlocked");

    if (sleep >= 8)
        document.getElementById("badge2").classList.add("unlocked");

    if (exercise === "Yes")
        document.getElementById("badge3").classList.add("unlocked");

    if (score === 100)
        document.getElementById("badge4").classList.add("unlocked");


    const data = {
        water,
        sleep,
        exercise,
        mood,
        score,
        date: new Date().toISOString()
    };

    localStorage.setItem("wellnessData", JSON.stringify(data));
}


function generateInsight() {

    const saved = localStorage.getItem("wellnessData");

    const message = document.getElementById("aiMessage");

    if (!saved) {
        message.innerHTML =
            "🤖 I need your daily wellness data first. Enter your information and click <strong>Save Today's Progress</strong>.";
        return;
    }

    const data = JSON.parse(saved);

    let insight = "";

    if (data.water < 6) {
        insight += "💧 Your hydration is below your current goal. Consider making water breaks part of your routine.<br><br>";
    } else {
        insight += "💧 Your hydration tracking looks consistent today.<br><br>";
    }

    if (data.sleep < 7) {
        insight += "😴 Your recorded sleep was lower than your selected target.<br><br>";
    } else {
        insight += "😴 Your recorded sleep meets the target you're tracking.<br><br>";
    }

    if (data.exercise === "Yes") {
        insight += "🏃 You recorded physical activity today — nice consistency!<br><br>";
    } else {
        insight += "🏃 You didn't record exercise today. A small movement break could be an easy next step.<br><br>";
    }

    insight += `<strong>Agent recommendation:</strong> Based on today's entries, focus on one small, achievable habit rather than trying to change everything at once. 🌱`;

    message.innerHTML = insight;
}


function resetData() {

    localStorage.removeItem("wellnessData");

    document.getElementById("water").value = "";
    document.getElementById("sleep").value = "";

    document.getElementById("exercise").value = "Yes";
    document.getElementById("mood").value = "Happy";

    document.getElementById("score").textContent = "0%";
    document.getElementById("waterDisplay").textContent = "0";
    document.getElementById("sleepDisplay").textContent = "0";

    document.getElementById("waterBar").style.width = "0%";
    document.getElementById("sleepBar").style.width = "0%";

    document.getElementById("scoreText").textContent =
        "Start tracking your day";

    document.getElementById("summary").textContent =
        "Save your data to see your progress.";

    document.getElementById("aiMessage").textContent =
        "Enter your daily information below and I'll analyze your progress.";

    document.querySelectorAll(".badge").forEach(
        badge => badge.classList.remove("unlocked")
    );
}


function toggleTheme() {
    document.body.classList.toggle("dark");
}