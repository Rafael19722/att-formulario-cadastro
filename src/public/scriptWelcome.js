const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

fetch("http://localhost:3000/api/me", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
    .then((res) => {
        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }
        return res.json();
    })
    .then((data) => {
        document.getElementById(
            "welcomeMessage"
        ).innerText = `Bem-vindo, ${data.name}`;
    })
    .catch((err) => {
        console.error(err);
    });

console.log("oi");

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
