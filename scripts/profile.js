//Object To Store the Profile Data
let profile = {
    name:"",
    username:"",
    age:"",
    country:"",
    role:"",
    issue:"",
    animal:"",
    goal:"",
    volunteer:"",
    awareness:"",
}

//sample user profiles
const sampleProfiles = [
    {
        name: "Gayathmi Udanya",
        username: "jay_gayathmiii",
        age: 17,
        country: "Sri Lanka",
        role: "Student",
        issue: "Plastic Pollution",
        animal: "Sea Turtles",
        goal: "Organize beach cleanups in my community",
        volunteer: "Yes",
        awareness: "Start a social media campaign to educate others about plastic waste",
        photo:"assets/sample2.png"
    },

    {
        name: "Jane Smith",
        username: "ocean_lover123",
        age: 70,
        country: "USA",
        role: "Researcher",
        issue: "Plastic Pollution",
        animal: "Dolphin",
        goal: "Clean the oceans",
        volunteer: "No",
        awareness: "Social media campaigns",
        photo:"assets/sample4.png"
    },

    {
        name: "John Doe",
        username: "marine_enthusiast",
        age: 25,
        country: "UK",
        role: "Ocean Enthusiast",
        issue: "Overfishing",
        animal: "Sharks",
        goal: "Promote sustainable fishing practices",
        volunteer: "Yes",
        awareness: "Educational workshops and social media",
        photo:"assets/sample5.png"
    }
];

//Function to display user profiles 
function renderSampleData() {
    const container = document.getElementById("sample-data-container");

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
            <div class="details">
                <p>Age :</p>
                <p>${profile.age}</p>
            </div>
            <div class="details">
                <p>Issue :</p>
                <p>${profile.issue}</p>
            </div>
            <div class="details">
                <p>Animal :</p>
                <p>${profile.animal}</p>
            </div>
            <div class="details">
                <p>Goal :</p>
                <p>${profile.goal}</p>
            </div>
            <div class="details">
                <p>Volunteer :</p>
                <p>${profile.volunteer}</p>
            </div>
            <div class="details">
                <p>Awareness :</p>
                <p>${profile.awareness}</p>
            </div>
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

    main.prepend(btn);
}


//Function to save profiles 
function saveProfile() {
    // Push the current profile to the sampleProfiles array
    const newProfile = { ...profile }; // copy the profile object
    // Optionally, set a default photo
    newProfile.photo = "sample.jpeg"; 
    sampleProfiles.push(newProfile);

    // Re-render the cards
    renderSampleData();

    // Reset the builder
    clearProfile(); // optional: clear form for next user
    alert("Profile saved and added to sample cards!");
}

//Function to Create the Profile Builder Interface
function createProfile() {

    document.getElementById("createProfileBtn").style.display = "none";
    document.getElementById("sample-data-container").style.display = "none";

    const profileBuilder = document.getElementById("profileBuilder");

    profileBuilder.innerHTML = `
    <div id="profileBuilder">

        <h1>User Profile Builder</h1>

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

        <div class="profile">

            <section class="profile-section">
                <h3>Step 1: Basic Details</h3>

                <div class="profile-row">
                    <p class="profile-label">Name:</p>
                    <p id="name" class="profile-value">Not added yet</p>
                </div>

                <div class="profile-row">
                    <p class="profile-label">Username:</p>
                    <p id="username" class="profile-value">Not added yet</p>
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

    </div>
    `;
}


//Basic Information 

function step1() {
    let name = "";
    let username = "";
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

    while(!username) {
        let input = prompt("Choose a username:");
        if(input === null || input.trim() === "") {
            alert("Username is required!");
        } else {
            username = input;
            profile.username = username;
        }
    }

    // Optional fields — allow skipping
    age = prompt("How old are you? (Optional — leave blank to skip)");
    profile.age = (age && age.trim() !== "") ? age : "Not Mentioned";

    country = prompt("Which country do you live in? (Optional — leave blank to skip)");
    profile.country = (country && country.trim() !== "") ? country : "Not Mentioned";

    while(!role) {
        let input = prompt("What is your role? (Student / Ocean Enthusiast / Volunteer / Researcher / Other)");
        if(input === null || input.trim() === "") {
            alert("Role is required!");
        } else {
            role = input;
            profile.role = role;
        }
    }

    updateProgress();
    renderProfile();

}

//Interests 
function step2() {
    let issue = prompt("Which marine issue concerns you the most? (Optional — leave blank to skip)");
    profile.issue = (issue && issue.trim() !== "") ? issue : "Not Mentioned";

    let animal = prompt("Which marine animal do you care about the most? (Optional)");
    profile.animal = (animal && animal.trim() !== "") ? animal : "Not Mentioned";

    updateProgress();
    renderProfile();
}

//Future 
function step3() {
    let goal = prompt("What is one ocean protection goal you want to achieve? (Optional)");
    profile.goal = (goal && goal.trim() !== "") ? goal : "Not Mentioned";

    let volunteer = prompt("Are you willing to volunteer conservation efforts? (Yes/No, Optional)");
    profile.volunteer = (volunteer && volunteer.trim() !== "") ? volunteer : "Not Mentioned";

    let awareness = prompt("How do you plan to raise awareness? (Optional)");
    profile.awareness = (awareness && awareness.trim() !== "") ? awareness : "Not Mentioned";

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
    document.getElementById("name").textContent = profile.name || "Not added yet";
    document.getElementById("username").textContent = profile.username || "Not added yet";
    document.getElementById("age").textContent = profile.age || "Not added yet";
    document.getElementById("country").textContent = profile.country || "Not added yet";
    document.getElementById("role").textContent = profile.role || "Not added yet";
    document.getElementById("issue").textContent = profile.issue || "Not added yet";
    document.getElementById("animal").textContent = profile.animal || "Not added yet";
    document.getElementById("goal").textContent = profile.goal || "Not added yet";
    document.getElementById("volunteer").textContent = profile.volunteer || "Not added yet";
    document.getElementById("awareness").textContent = profile.awareness || "Not added yet";
}


createCreateButton();
renderSampleData();