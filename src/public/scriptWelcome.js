const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", async () => {
    if (!token) {
        alert("Você precisa estar logado para acessar essa página.");
        window.location.href = "login.html"; // Redireciona para login se não tiver token
    } else {
        const response = await fetch("http://localhost:3000/api/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Envia o token no header
            },
        });
        const feedback = await response.json();

        console.log(feedback);

        document.getElementById(
            "welcomeMessage"
        ).innerText = `Welcome, ${feedback.name}`;
    }
});

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
