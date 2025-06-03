document.getElementById("form_login").addEventListener("submit", async (e) => {
    e.preventDefault();

    data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const feedback = await response.json();

        if (!response.ok) {
            console.error("API error", feedback);
        } else {
            localStorage.setItem("token", feedback.token);
            window.location.href = "welcome.html";
        }
    } catch (error) {
        console.log("Error to conect to API", error);
    }
});
