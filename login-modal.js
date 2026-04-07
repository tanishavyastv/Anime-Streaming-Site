document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    fetch("/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(response => {
            alert(response.message);
            if (response.success) {
                location.reload(); // Or redirect
            }
        });
});