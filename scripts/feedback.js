// Live character count - Grabbing the required elements 
const message = document.getElementById("message"); // Grabs the input from the "message" area
const charCount = document.getElementById("char-count"); // Grabs the input from the "char-count" area

// Live character count - Updating the char counter on each key stroke 
message.addEventListener("input",()=>{
    const remaining = 300 - message.value.length; // Subtracts the maximum number of characters from the text in the message box
    charCount.textContent = remaining + " Characters Remaining"; // Updates the remaining characters available to be entered 
});

// Form validation and Confirmation message
const form = document.getElementById("feedbackForm"); // Grabs the from element 

form.addEventListener("submit",(e)=>{
    e.preventDefault(); // Stops the page from refreshing
    let valid = true; // Assumes the form has valid details until it runs in to an error

    // Show clear error messages
    function showError(id,msg){
        document.getElementById(id).textContent = msg;
        valid = false;
    }

    // Clears the error message
    function clearError(id){
        document.getElementById(id).textContent = "";  
    }

    // Validating the Full Name
    const fullname = document.getElementById("fullname").value.trim(); // Removes empty spaces from the start and finish 
    const nameRegex = /^[a-zA-Z\s]+$/; // Only allows letters and spaces
    
    if (fullname === ""){ 
        showError("fullname-error", "Full name is required");//Runs if the field is empty
    } 
    else if (!nameRegex.test(fullname)){
        showError("fullname-error", "Full name can only contain letters");// Runs if the feild doesnt have the regex 
    } 
    else {
        clearError("fullname-error");// Clears if the input is valid 
    } 

    // Validating the Email 
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Checking if the string matches the standard email format 
    
    if (email === "" ){
        showError ("email-error", "Email is required");
    }
    else if(!emailRegex.test(email)){
        showError("email-error", "Please enter a valid email");
    }else{
        clearError("email-error");
    }

    // Validating the Telephone
    const tel = document.getElementById("telephone").value.trim();
    const telRegex = /^[\d\s\-()+]{7,15}$/;
    const digitsOnly = tel.replace(/\D/g, ""); // Removes all non digit characters and store only the numbers
    
    if (tel === ""){
        showError("telephone-error", "Telephone number is required");
    }
    else if (!telRegex.test(tel) || digitsOnly.length < 7){
        showError("telephone-error", "Please enter a valid telephone number");
    }
    else{
        clearError("telephone-error");
    }

    // Validating the Address
    const address = document.getElementById("address").value.trim();
    const addressRegex = /^[a-zA-Z\s0-9\-(),.]+$/;
    
    if (address === ""){ 
        showError("address-error", "Address is required");
    }
    else if(!addressRegex.test(address)){
        showError("address-error", "Please enter a valid address");
    }
    else{
        clearError("address-error");
    }

    // Validating the Category
    const category = document.getElementById("category").value;
    
    if (category === ""){
        showError("category-error", "Please select a category");
    }
    else{
        clearError("category-error");
    }

    // Validating the Date
    const date = document.getElementById("date").value;
    
    if (date === ""){ 
        showError("date-error", "Please select a date");
    }
    else{
        clearError("date-error");
    }

    // Validating the Message
    const msg = document.getElementById("message").value.trim();
    
    if (msg === ""){
        showError("message-error", "Message cannot be empty");
    }
    else {
        clearError("message-error");
    }

    //Show success if all info is valid, and reset the form
    if(valid){
        document.getElementById("success-message").style.display = "block";
        form.reset(); 
        charCount.textContent = "300 Characters Remaining"; // Reset the "300 Charcters Remaining"
    }
});