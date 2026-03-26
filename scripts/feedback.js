// Live character count - Grabbing the required elements 
const message = document.getElementById("message"); // Grabs the input from the "message" area
const charCount = document.getElementById("char-count"); // Grabs the input from the "char-count" area

// Live character count - Updating the char counter on each key stroke 
message.addEventListener("input",()=>{
    const remanining = 300 - message.value.length; // Subtracts the maximum number of characters from the text in the message box
    charCount.textContent = remanining + "Characters Remaining"; // Updates the remaining characters available to be entered 
});

// Form validation and Confirmation message
const form = document.getElementById("feedbackForm"); // Grabs the from element 

form.addEventListener("submit",(e)=>{
    e.preventDefault(); // Stops the page from refreshing
    let valid = true; // Assumes the form has valid details until it runs in to an error

    // Helps to show clear error messages
    function showError(id,msg){
        document.getElementById(id).textContent = msg;
        valid = false;
    }

    function clearError(id){
        document.getElementById(id).textContent = "";
    }

    // Validating the Full Name
    const fullname = document.getElementById("fullname").value.trim(); // Removes empty spaces from the start and finish 
    const nameRegex = /^[a-zA-Z\s]+$/; // Only allows letters and spaces
    fullname === "" ? showError("fullname-error", "Full name is required") //Runs if the feild is empty
    : !nameRegex.test(fullname) ? showError("fullname-error", "Full name can only contain letters") // Runs if the feild doesnt have the regex 
    : clearError("fullname-error"); // Clears if the input is valid 

    // Validating the Email 
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Checking if the string matches the starndard email format 
    email === "" ? showError ("email-error", "Email is required")
    : !emailRegex.test(email) ? showError("email-error", "Enter a valid email") 
    : clearError("email-error");

    // Validating the Telephone
    const tel = document.getElementById("telephone").value.trim();
    const telRegex = /^[0-9\s\-()]+$/;
    tel === "" ? showError("telephone-error", "Telephone number is required") 
    : !telRegex.test(tel) ? showError("telephone-error", "Telephone number can only contain numbers and spaces")
    : clearError("telephone-error");

    // Validating the Address
    const address = document.getElementById("address").value.trim();
    const addressRegex = /^[a-zA-Z\s0-9\-(),.]+$/;
    address === "" ? showError("address-error", "Address is required") 
    : !addressRegex.test(address) ? showError("address-error", "Address can contain only numbers and letters")
    : clearError("address-error");

    // Validating the Category
    const category = document.getElementById("category").value;
    category === "" ? showError("category-error", "Please select a category") 
    : clearError("category-error");

    // Validating the Date
    const date = document.getElementById("date").value;
    date === "" ? showError("date-error", "Please select a date") 
    : clearError("date-error");

    // Validating the Message
    const msg = document.getElementById("message").value.trim();
    msg === "" ? showError("message-error", "Message cannot be empty") 
    : clearError("message-error");

    //Show success if all info is valid, and reset the form
    if(valid){
        document.getElementById("success-message").style.display = "block";
        form.reset(); 
        charCount.textContent = "300 Characters Remaining"; // Reset the "300 Charcater Remanining"
    }
});