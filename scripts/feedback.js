//Live character count
const message = document.getElementById("message");
const charCount = document.getElementById("char_count");

message.addEventListener("input",()=>{
    const remanining = 300 - message.value.length;
    charCount.textContent = remanining + "Characters Remaining";
});

//Form validation and Confirmation message
const form=message.getElementById("feedbackForm");

form.addEventListener("submit",(e)=>{
    e.preventDefault(); //stops the page from refreshing
    let valid =true;

    //help to show clear error message
    function showError(id,msg){
        document.getElementById(id).textContent=msg;
        valid=false;
    }
    function clearError(id){
        document.getElementById(id).textContent="";
    }

    //Full Name
    const fullname = document.getElementById("fullname").value.trim();
    fullname == "" ? showError("fullname-error", "Full Name is required"): clearError("fullname_error");

    //Email 
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //to checck if a string matches a specific format 
    !emailRegex.test(email) ? showError("email-error", "Enter a valid email") : clearError("email_error");

    //Telephone
    const tel = document.getElementById("tel").value.trim();
    tel == "" ? showError("tel-error", "Telephone Number is required") : clearError("tel_error");

    // Address
    const address = document.getElementById("address").value.trim();
    address === "" ? showError("address-error", "Address is required") : clearError("address_error");

    // Category
    const category = document.getElementById("category").value;
    category === "" ? showError("category-error", "Please select a category") : clearError("category_error");

    // Date
    const date = document.getElementById("date").value;
    date === "" ? showError("date-error", "Please select a date") : clearError("date_error");

    // Message
    const msg = document.getElementById("message").value.trim();
    msg === "" ? showError("message-error", "Message cannot be empty") : clearError("message_error");

    //Show success if all info is valid 
    if(valid){
        document.getElementById("success-message").style.display = "block";
        form.reset();
        charCount.textContent = "300 Characters Remaining"
    }
});