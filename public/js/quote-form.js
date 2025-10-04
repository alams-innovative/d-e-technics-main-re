document.addEventListener("DOMContentLoaded", () => {
  // Function to get URL parameters
  function getUrlParameter(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]")
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
    const results = regex.exec(location.search)
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
  }

  // Get the product name from URL parameter
  const productParam = getUrlParameter("product")

  // If product parameter exists, fill the product field
  if (productParam) {
    const productField = document.getElementById("product")
    if (productField) {
      productField.value = productParam

      // Optional: Make the field readonly if it's pre-filled
      // Uncomment the next line if you want this behavior
      // productField.setAttribute('readonly', 'readonly');
    }
  }

  // Form validation (existing code from form-validation.js)
  const form = document.querySelector(".quote-form")

  if (form) {
    // Add real-time validation clearing when user types
    const formInputs = form.querySelectorAll(".form-control")
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.classList.remove("is-invalid")
        const errorMsg = input.parentNode.querySelector(".invalid-feedback")
        if (errorMsg) errorMsg.remove()
      })
    })

    form.addEventListener("submit", (event) => {
      let isValid = true

      // Get all required inputs
      const requiredInputs = form.querySelectorAll("[required]")

      // Remove any existing error messages
      const errorMessages = form.querySelectorAll(".invalid-feedback")
      errorMessages.forEach((message) => message.remove())

      // Reset validation styling
      const formControls = form.querySelectorAll(".form-control")
      formControls.forEach((control) => {
        control.classList.remove("is-invalid")
      })

      // Validate each required field
      requiredInputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.classList.add("is-invalid")

          // Create and append error message
          const errorDiv = document.createElement("div")
          errorDiv.className = "invalid-feedback"
          errorDiv.textContent = "This field is required"
          input.parentNode.appendChild(errorDiv)
        }
      })

      // Validate email format if email field exists and has a value
      const emailInput = form.querySelector("#email")
      if (emailInput && emailInput.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(emailInput.value)) {
          isValid = false
          emailInput.classList.add("is-invalid")

          // Create and append error message
          const errorDiv = document.createElement("div")
          errorDiv.className = "invalid-feedback"
          errorDiv.textContent = "Please enter a valid email address"
          emailInput.parentNode.appendChild(errorDiv)
        }
      }

      // Validate phone format if phone field exists and has a value
      const phoneInput = form.querySelector("#phone")
      if (phoneInput && phoneInput.value.trim()) {
        // More flexible phone validation - just check for digits
        const phoneDigits = phoneInput.value.replace(/\D/g, "")
        if (phoneDigits.length < 7 || phoneDigits.length > 15) {
          isValid = false
          phoneInput.classList.add("is-invalid")

          // Create and append error message
          const errorDiv = document.createElement("div")
          errorDiv.className = "invalid-feedback"
          errorDiv.textContent = "Please enter a valid phone number (7-15 digits)"
          phoneInput.parentNode.appendChild(errorDiv)
        }
      }

      // If form is not valid, prevent submission
      if (!isValid) {
        event.preventDefault()
      }
    })
  }
})
