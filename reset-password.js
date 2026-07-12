const form = document.getElementById("reset-form");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const submitButton = document.getElementById("submit-button");
const message = document.getElementById("message");

// Read reset token from the URL
const params = new URLSearchParams(window.location.search);
const resetToken = params.get("token");

if (!resetToken) {
  message.textContent = "Reset token is missing.";
  message.className = "error";
  form.style.display = "none";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  message.textContent = "";
  message.className = "";

  if (!password || !confirmPassword) {
    message.textContent = "Both password fields are required.";
    message.className = "error";
    return;
  }

  if (password.length < 8) {
    message.textContent = "Password must contain at least 8 characters.";
    message.className = "error";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    message.className = "error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Resetting...";

  try {
    const response = await fetch(
      "https://astro-ecommerce-backend.vercel.app/api/v1/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetToken,
          password,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      message.textContent = data.message || "Password reset successfully.";
      message.className = "success";

      form.reset();
      form.style.display = "none";
    } else {
      message.textContent = data.message || "Unable to reset password.";
      message.className = "error";
    }
  } catch (error) {
    console.error("Reset password error:", error);

    message.textContent = "Cannot connect to the server. Please try again.";
    message.className = "error";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Reset Password";
  }
});
