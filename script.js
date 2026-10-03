const date = new Date();

document.getElementById("date").textContent =
    date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });


// -----------------------------
// SAVE DAILY WELLNESS DATA
// -----------------------------

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


    // Today's record
    const today = new Date().toISOString().split("T")[0];

    const newRecord = {
        date: today,
        water: water,
        sleep: sleep,
        exercise: exercise,
        mood: mood,
        score: score
    };


    // Get previous records
    let history =
        JSON.parse(localStorage.getItem("wellnessHistory")) || [];


    // Replace today's record if it already exists
    history = history.filter(item => item.date !== today);

    history.push(newRecord);


    // Keep only the latest 7 days
    history = history.slice(-7);

    localStorage.setItem(
        "wellnessHistory",
        JSON.stringify(history)
    );


    updateDashboard(newRecord);
    showHistory();
}


// -----------------------------
// UPDATE DASHBOARD
// -----------------------------

function updateDashboard(data) {

    document.getElementById("score").textContent =
        data.score + "%";

    document.getElementById("waterDisplay").textContent =
        data.water;

    document.getElementById("sleepDisplay").textContent =
        data.sleep;


    document.getElementById("waterBar").style.width =
        Math.min((data.water / 8) * 100, 100) + "%";

    document.getElementById("sleepBar").style.width =
        Math.min((data.sleep / 8) * 100, 100) + "%";


    let message;

    if (data.score >= 90) {
        message = "Excellent consistency today! 🌟";
    }
    else if (data.score >= 70) {
        message = "Great progress. Keep building your routine! 💪";
    }
    else {
        message = "Every small step counts. Keep going! 🌱";
    }

    document.getElementById("scoreText").textContent =
        message;


    document.getElementById("summary").innerHTML = `
        💧 Water: <strong>${data.water} glasses</strong><br>
        😴 Sleep: <strong>${data.sleep} hours</strong><br>
        🏃 Activity: <strong>${data.exercise}</strong><br>
        😊 Mood: <strong>${data.mood}</strong><br>
        📊 Wellness Score: <strong>${data.score}%</strong>
    `;


    unlockAchievements(data);
}


// -----------------------------
// ACHIEVEMENTS
// -----------------------------

function unlockAchievements(data) {

    if (data.water >= 8)
        document.getElementById("badge1")
            .classList.add("unlocked");

    if (data.sleep >= 8)
        document.getElementById("badge2")
            .classList.add("unlocked");

    if (data.exercise === "Yes")
        document.getElementById("badge3")
            .classList.add("unlocked");

    if (data.score === 100)
        document.getElementById("badge4")
            .classList.add("unlocked");
}


// -----------------------------
// AI WELLNESS ASSISTANT
// -----------------------------

function generateInsight() {

    const history =
        JSON.parse(localStorage.getItem("wellnessHistory")) || [];

    const message =
        document.getElementById("aiMessage");


    if (history.length === 0) {

        message.innerHTML =
            "🤖 Please save today's wellness data first so I can analyze it.";

        return;
    }


    const latest =
        history[history.length - 1];


    let insight = "";


    if (latest.water < 6) {

        insight +=
            "💧 Your recorded hydration is below your current target. Try spreading water breaks throughout the day.<br><br>";

    } else {

        insight +=
            "💧 Your hydration tracking looks good today.<br><br>";
    }


    if (latest.sleep < 7) {

        insight +=
            "😴 Your recorded sleep is below the target you're tracking. Consider keeping a consistent sleep routine.<br><br>";

    } else {

        insight +=
            "😴 Your recorded sleep meets your current target.<br><br>";
    }


    if (latest.exercise === "Yes") {

        insight +=
            "🏃 You recorded physical activity today. Nice work keeping movement in your routine!<br><br>";

    } else {

        insight +=
            "🏃 No activity was recorded today. Even a short movement break can be a simple next step.<br><br>";
    }


    insight += `
        <strong>🤖 Wellness Assistant:</strong><br>
        Your current wellness score is ${latest.score}%.
        Focus on one small habit at a time and build consistency.
        🌱
    `;


    message.innerHTML = insight;
}


// -----------------------------
// 7-DAY HISTORY
// -----------------------------

function showHistory() {

    const history =
        JSON.parse(localStorage.getItem("wellnessHistory")) || [];


    const summary =
        document.getElementById("summary");


    if (history.length === 0)
        return;


    let historyHTML = `
        <hr style="margin:20px 0;border:0;border-top:1px solid #ddd;">
        <strong>📅 Recent Wellness History</strong><br><br>
    `;


    history.slice().reverse().forEach(item => {

        historyHTML += `
            <div style="margin-bottom:12px;">
                <strong>${item.date}</strong>
                — Score: ${item.score}%
                — 💧 ${item.water}
                — 😴 ${item.sleep}h
                — 🏃 ${item.exercise}
            </div>
        `;
    });


    summary.innerHTML += historyHTML;
}


// -----------------------------
// RESET
// -----------------------------

function resetData() {

    localStorage.removeItem("wellnessHistory");

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


// -----------------------------
// DARK MODE
// -----------------------------

function toggleTheme() {

    document.body.classList.toggle("dark");
}