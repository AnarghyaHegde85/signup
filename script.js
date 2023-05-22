const accountForm = document.getElementById("account-form");
const personalForm = document.getElementById("personal-form");
const nextButton = document.querySelector(".submit-button");

function showErrorMessage(input, message) {
  input.nextElementSibling.textContent = message;
}

function clearErrorMessage(input) {
  input.nextElementSibling.textContent = "";
}

function validateEmail(input) {
  const emailRegex = /^[^\s@]+@gmail\.com$/;
  if (!emailRegex.test(input.value.toLowerCase())) {
    return false;
  }
  
    return true;
}

function validatePhone(input) {
  const phoneNumberPattern = /^\d{10}$/;
  if (!phoneNumberPattern.test(input.value)) {
    return false;
  }
  return true;
}
function validateAccountForm() {
  const firstName = accountForm.querySelector('input[placeholder="First Name"]');
  const lastName = accountForm.querySelector('input[placeholder="Last Name"]');
  const email = accountForm.querySelector('input[name="email"]');
  const phone = accountForm.querySelector('input[name="phone"]');
  const password = accountForm.querySelector('input[placeholder="Password"]');
  const confirmPassword = accountForm.querySelector('input[placeholder="Confirm Password"]');
  
  
  if (!validateEmail(email)) {
    showErrorMessage(email, "Please enter a valid email address.");
    return false;
  } else {
    clearErrorMessage(email);
  }

  if (!validatePhone(phone)) {
    showErrorMessage(phone, "Please enter a 10-digit phone number.");
    return false;
  } else {
    clearErrorMessage(phone);
  }

  return true;
}

function showSection(sectionId) {
  
  if (!sectionId) {
    sectionId = "account-form";
  }
  if (sectionId === "account-form") {
    accountForm.style.display = "block";
    personalForm.style.display = "none";
    document.querySelector(".account-button").classList.add("active");
    document.querySelector(".personal-button").classList.remove("active");
  } else if (sectionId === "personal-form") {
    accountForm.style.display = "none";
    personalForm.style.display = "block";
    document.querySelector(".account-button").classList.remove("active");
    document.querySelector(".personal-button").classList.add("active");
  }
  nextButton.disabled = true;
}

function submitForm() {
  const fatherName = personalForm.querySelector('input[name="fatherName"]');
  const motherName = personalForm.querySelector('input[name="MotherName"]');
  const qualification = personalForm.querySelector('input[name="Qualification"]');

  if (fatherName.value.trim() === "") {
    showErrorMessage(fatherName, "Please enter your father's name.");
    nextButton.disabled = true;
    //return;
  } else {
    clearErrorMessage(fatherName);
  }

  if (motherName.value.trim() === "") {
    showErrorMessage(motherName, "Please enter your mother's name.");
    nextButton.disabled = true;
    //return;
  } else {
    clearErrorMessage(motherName);
  }

  if (qualification.value.trim() === "") {
    showErrorMessage(qualification, "Please enter your qualification.");
    nextButton.disabled = true;
    //return;
  } else {
    clearErrorMessage(qualification);
  }
return true;
}

function updateNextButtonState() {
  const formInputs = accountForm.querySelectorAll("input");
  let isFormValid = true;

  formInputs.forEach((input) => {
    if (input.value.trim() === "") {
      isFormValid = false;
      return;
    }
  });
  nextButton.disabled = !isFormValid;
}

window.addEventListener("load", function () {
  showSection("account-form");

  const formInputs = accountForm.querySelectorAll("input");
  for (let input of formInputs) {
    input.addEventListener("input", function () {
      updateNextButtonState();
      
    });
  }
});
nextButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (accountForm.style.display === "block") {
    if (validateAccountForm()) {
      showSection("personal-form");
    }
  } else if (personalForm.style.display === "block") {
    if (submitForm()) {
      alert("Form submitted successfully!");
    }
  }
});
