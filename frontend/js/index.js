const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // empêche le rechargement de la page

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  try {
    const response = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      status.textContent = "✅ Message envoyé avec succès";
      form.reset();
    } else {
      status.textContent = "❌ " + result.error;
    }
  } catch (error) {
    status.textContent = "❌ Erreur serveur";
    console.error(error);
  }
});
