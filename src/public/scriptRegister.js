document
    .getElementById("formulario_cadastro")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const selectedGender = document.querySelector(
            'input[name="gender"]:checked'
        );

        const data = {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("number").value,
            password: document.getElementById("password").value,
            gender: selectedGender.id,
        };

        try {
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const feedback = await response.json();

            if (!response.ok) {
                console.error("API error", feedback);
                alert(feedback.error);
            } else {
                console.log(feedback);
                alert("Register successful");
                window.location.href = "login.html";
            }
        } catch (error) {
            console.log("Error to conect to API", error);
        }
    });
