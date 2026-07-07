document.addEventListener("DOMContentLoaded", async () => {
  const message = document.getElementById("message");

  const params = new URLSearchParams(window.location.search);

  const token = params.get("token");

  if (!token) {
    message.innerHTML = "❌ Token not found.";
    return;
  }

  try {
    const response = await fetch(
      "https://astro-ecommerce-backend-0lmf.onrender.com/api/v1/auth/email-verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-verification-token": token,
        },
      },
    );

    const data = await response.json();

    if (response.ok) {
      message.innerHTML = "✅ Email verified successfully.";
    } else {
      message.innerHTML = "❌ " + data.message;
    }
  } catch (err) {
    console.error(err);

    message.innerHTML = "❌ Something went wrong.";
  }
});
