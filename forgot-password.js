const form = document.getElementById("forgot-form");
const emailInput = document.getElementById("email");
const submitButton = document.getElementById("submit-button");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  message.textContent = "";
  message.className = "";

  if (!email) {
    message.textContent = "Please enter your email.";
    message.className = "error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch(
      "https://astro-ecommerce-backend.vercel.app/api/v1/auth/forget_password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      message.textContent =
        data.message || "Password reset link sent successfully.";
      message.className = "success";

      form.reset();
    } else {
      message.textContent =
        data.message || "Unable to send password reset link.";
      message.className = "error";
    }
  } catch (error) {
    console.error("Forgot password error:", error);

    message.textContent = "Cannot connect to the server. Please try again.";
    message.className = "error";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Reset Link";
  }
});
