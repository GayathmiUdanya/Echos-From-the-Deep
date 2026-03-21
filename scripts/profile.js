//Object To Store the Profile Data
let profile = {
    name:"",
    age:"",
    country:"",
    role:"",
    issue:"",
    animal:"",
    activity:"",
    goal:"",
    volunteer:"",
    awareness:"",
}

//sample user profiles
const sampleProfiles = [
    {
        name: "Hashinth Sandul",
        age: 19,
        country: "Sri Lanka",
        role: "Student",
        issue: "Plastic Pollution",
        animal: "Sea Turtles",
        activity:"Diving",
        goal: "Organize beach cleanups in my community",
        volunteer: "Yes",
        awareness: "Start a social media campaign to educate others about plastic waste",
        photo:"assets/sample2.png"
    },

    {
        name: "Cleo Satori",
        age: 70,
        country: "USA",
        role: "Researcher",
        issue: "Plastic Pollution",
        animal: "Dolphin",
        activity:"Surfing",
        goal: "Clean the oceans",
        volunteer: "No",
        awareness: "Social media campaigns",
        photo:"assets/sample4.png"
    },

    {
        name: "Jane Smith",
        age: 25,
        country: "UK",
        role: "Ocean Enthusiast",
        issue: "Overfishing",
        animal: "Sharks",
        activity:"Swimming",
        goal: "Promote sustainable fishing practices",
        volunteer: "Yes",
        awareness: "Educational workshops and social media",
        photo:"assets/sample5.png"
    }
];

//Function to display user profiles 
function renderSampleData() {
    const container = document.getElementById("sample-data-container");
    container.innerHTML = ""; // clear first

    sampleProfiles.forEach(profile => {
        const card = document.createElement("div");
        card.classList.add("sample-data");

        card.innerHTML = `
            <img src="${profile.photo}" alt="${profile.name}" class="profile-photo">
            <div class="header">
                <div class="country"><p>${profile.country}</p></div>
                <div class="role"><p>${profile.role}</p></div>
            </div>

            <div class="name">
                <h1>${profile.name}</h1>
            </div>

            ${profile.age ? `<div class="details"><p>Age :</p><p>${profile.age}</p></div>` : ""}
            ${profile.issue ? `<div class="details"><p>Issue :</p><p>${profile.issue}</p></div>` : ""}
            ${profile.animal ? `<div class="details"><p>Animal :</p><p>${profile.animal}</p></div>` : ""}
            ${profile.activity ? `<div class="details"><p>Activity :</p><p>${profile.activity}</p></div>` : ""}
            ${profile.goal ? `<div class="details"><p>Goal :</p><p>${profile.goal}</p></div>` : ""}
            ${profile.volunteer ? `<div class="details"><p>Volunteer :</p><p>${profile.volunteer}</p></div>` : ""}
            ${profile.awareness ? `<div class="details"><p>Awareness :</p><p>${profile.awareness}</p></div>` : ""}
        `;

        container.appendChild(card);
    });
}

function createCreateButton() {
    const main = document.querySelector("main");

    const btn = document.createElement("button");
    btn.id = "createProfileBtn";
    btn.textContent = "Create New Profile";

    btn.addEventListener("click", createProfile);

    main.prepend(btn); //adds the button to the top of the page
}


//Function to save the profiles 
function saveProfile() {
    // array to store photos
    const photos = [
        "assets/sample.png",
        "assets/sample1.png",
        "assets/sample6.png"
    ]

    const newProfile = {...profile}; 

    //Random photo picker
    const randomPhoto = Math.floor(Math.random() * photos.length); //Gets the index
    newProfile.photo = photos[randomPhoto];

    // Replace "Not Mentioned" with empty string
    for(let key in newProfile){
        if(newProfile[key] === "Not Mentioned") newProfile[key] = "";
    }

    sampleProfiles.unshift(newProfile); //adds the profile to the begining 

    // Clear the sample container
    const container = document.getElementById("sample-data-container");
    container.innerHTML = ""; 

    // Hide profile builder completely
    const builder = document.getElementById("profileBuilder");
    builder.style.display = "none";
    builder.innerHTML = "";  // remove all builder HTML

    // Re-render profiles
    renderSampleData();

    // Show sample profiles container & create button
    container.style.display = "grid";
    document.getElementById("createProfileBtn").style.display = "inline-block";

    alert("Profile saved successfully!");
}

//Function to reset the profile builder 
function clearProfile() {
    if (!confirm("Are you sure you want to reset your profile?")) return; //If the user clicks "Cancel", stop the function; otherwise, continue to reset the profile

    profile = {
        name:"",
        age:"",
        country:"",
        role:"",
        issue:"",
        animal:"",
        activity:"",
        goal:"",
        volunteer:"",
        awareness:"",
    }
    
    //Reset the displayed values to "Not added yet"
    document.getElementById("name").textContent = "Not added yet";
    document.getElementById("age").textContent = "Not added yet";
    document.getElementById("country").textContent = "Not added yet";
    document.getElementById("role").textContent = "Not added yet";
    document.getElementById("issue").textContent = "Not added yet";
    document.getElementById("animal").textContent = "Not added yet";
    document.getElementById("activity").textContent = "Not added yet";
    document.getElementById("goal").textContent = "Not added yet";
    document.getElementById("volunteer").textContent = "Not added yet";
    document.getElementById("awareness").textContent = "Not added yet";

    //Reset progress bar
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("progressText").textContent = "0% Completed";

}

//Function to Create the Profile Builder Interface
function createProfile() {

    document.getElementById("createProfileBtn").style.display = "none";
    document.getElementById("sample-data-container").style.display = "none";

    const profileBuilder = document.getElementById("profileBuilder");


    profileBuilder.style.display = "flex"; //Makes the hidden profile builder visible

    profileBuilder.innerHTML = `
        <h1>User Profile Builder</h1>
        <p>Click through each step to build your identity and personalize your profile</p>

        <div>
            <button onclick="step1()">Step 1: Basic Info</button>
            <button onclick="step2()">Step 2: Interests</button>
            <button onclick="step3()">Step 3: Goals</button>
            <button onclick="clearProfile()">Reset Profile</button>
        </div>

        <div class="progressContainer">
            <div id="progressBar" class="progressBar"></div>
        </div>

        <p id="progressText">0% Completed</p>
        <h2>Build Your Profile</h2>
        <p>Leave blank to skip the question which are not marked required*.</p>
        <p>They will NOT appear in your profile.</p>

        <div class="profile">

            <section class="profile-section">
                <h3>Step 1: Basic Details</h3>

                <div class="profile-row">
                    <p class="profile-label">Name:</p>
                    <p id="name" class="profile-value">Not added yet</p>
                </div>

                <div class="profile-row">
                    <p class="profile-label">Age:</p>
                    <p id="age" class="profile-value">Not added yet</p>
                </div>

                <div class="profile-row">
                    <p class="profile-label">Country:</p>
                    <p id="country" class="profile-value">Not added yet</p>
                </div>

                <div class="profile-row">
                    <p class="profile-label">Role:</p>
                    <p id="role" class="profile-value">Not added yet</p>
                </div>

            </section>

            <section class="profile-section">
                <h3>Step 2: Interests</h3>

                <div class="profile-row">
                    <p class="profile-label">Main Concern:</p>
                    <p id="issue" class="profile-value">Not added yet</p>
                </div>

                <div class="profile-row">
                    <p class="profile-label">Favourite Species:</p>
                    <p id="animal" class="profile-value">Not added yet</p>
                </div>

                <div class="profile-row">
                    <p class="profile-label">Favourite Activity:</p>
                    <p id="activity" class="profile-value">Not added yet</p>
                </div>

            </section>

            <section class="profile-section">
                <h3>Step 3: Actions</h3>

                <div class="profile-row">
                    <p class="profile-label">Goal:</p>
                    <p id="goal" class="profile-value">Not added yet</p>
                </div>

                <div class="profile-row">
                    <p class="profile-label">Volunteer:</p>
                    <p id="volunteer" class="profile-value">Not added yet</p>
                </div>

                <div class="profile-row">
                    <p class="profile-label">Awareness Plan:</p>
                    <p id="awareness" class="profile-value">Not added yet</p>
                </div>

            </section>

        </div>

        <div class="save">
            <button onclick="saveProfile()">Save</button>
        </div>
    `;
}

//Basic Information 

function step1() {
    let name = "";
    let age = "";
    let country = "";
    let role = "";

    // Required fields 
    while(!name) {
        let input = prompt("What is your name?");
        if(input === null || input.trim() === "") {
            alert("Name is required!");
        } else {
            name = input;
            profile.name = name;
        }
    }


    // Optional fields — allow skipping
    age = prompt("How old are you? (Optional — leave blank to skip)");
    profile.age = (age && age.trim() !== "") ? age : "Not Mentioned";

    while(!country) {
    let input = prompt("Which country do you live in?*");
    if(input === null || input.trim() === "") {
        alert("Country is required!");
    } else {
        country = input;
        profile.country = country;
    }
}

    while(!role) {
        let input = prompt("What is your role?* (Student / Ocean Enthusiast / Volunteer / Researcher / Other)");
        if(input === null || input.trim() === "") {
            alert("Role is required!");
        } else {
            role = input;
            profile.role = role;
        }
    }

    document.querySelectorAll(".profile-section")[0].style.display = "block";
    document.querySelector(".save").style.display = "block";

    updateProgress();
    renderProfile();

}

//Interests 
function step2() {
    let issue = prompt("Which marine issue concerns you the most?");
    profile.issue = (issue && issue.trim() !== "") ? issue : "Not Mentioned";

    let animal = prompt("Which marine animal do you care about the most");
    profile.animal = (animal && animal.trim() !== "") ? animal : "Not Mentioned";

    let activity = prompt("What ocean related activity do you enjoy the most? (e.g: Diving, Surfing)")
    profile.activity = (activity && activity.trim() !== "") ? activity : "Not Mentioned";

    document.querySelectorAll(".profile-section")[1].style.display = "block";

    updateProgress();
    renderProfile();
}

//Future 
function step3() {
    let goal = prompt("What is one ocean protection goal you want to achieve?");
    profile.goal = (goal && goal.trim() !== "") ? goal : "Not Mentioned";

    let volunteer = prompt("Are you willing to volunteer conservation efforts? (Yes/No)");
    profile.volunteer = (volunteer && volunteer.trim() !== "") ? volunteer : "Not Mentioned";

    let awareness = prompt("How do you plan to raise awareness?");
    profile.awareness = (awareness && awareness.trim() !== "") ? awareness : "Not Mentioned";

    document.querySelectorAll(".profile-section")[2].style.display = "block";

    updateProgress();
    renderProfile();
}

//progress bar
function updateProgress() {
    let filled = 0;
    for(let key in profile){
        if(profile[key] && profile[key] !== "Not Mentioned"){
            filled++;
        }
    }

    let percent = Math.round((filled/10)*100); //10 questions

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").textContent = percent + "% Completed";
}

//profile builder 
function renderProfile() {
    const fields = ["name","age","country","role","issue","animal","activity","goal","volunteer","awareness"];
    fields.forEach(f => {
        const el = document.getElementById(f);
        el.textContent = profile[f] && profile[f].trim() !== "" ? profile[f] : "";
    });
}


createCreateButton();
renderSampleData();