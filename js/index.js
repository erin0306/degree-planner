'use-strict';

let searchButton = qs(".searchButton");
let dashboard = $("dashboard");
let courses = $("courses");

const dashboardSection = ["Profile", "Current Courses", "Future Courses"];
const profileSection = [{H2: "Student Profile", Name: "Khoa Nguyen Luong", Content: ["Junior", " ID: 99999"]}, 
                        {H2: "Intended Major", Name: "Informatics", Content: ["HCI Track"]},
                        {H2: "Graduation Process", Name: "100 credits", Content: ["40 intended major credits"]}];

let state = {
    allCourses: [],
    displayCourses: [],
    input: "",
    AofK: "",
    quarter: "",
    campus: "",
};

$('course-page').style.display = 'none';
$('program-results').style.display = 'none';

// Get all data
d3.csv("./data/uwcourses.csv").then(function(data){
    console.log(data);
    state.allCourses = data;
    return data;
}).then(function(){
    console.log(state);
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('course-page').style.display = '';
}).catch(console.log.bind(console));


// Get filter values
let form = document.querySelector("#filter");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    if ((document.querySelectorAll('input[name="AofK"]:checked')).length > 0) {
        state.AofK = document.querySelector('input[name="AofK"]:checked').value;
    }
    if ((document.querySelectorAll('input[name="quarter"]:checked')).length > 0) {
        state.quarter = document.querySelector('input[name="quarter"]:checked').value;
    }
    if ((document.querySelectorAll('input[name="campus"]:checked')).length > 0) {
        state.campus = document.querySelector('input[name="campus"]:checked').value;
    }
    state.displayCourses = state.allCourses.filter(updateDisplay);
    console.log(state.displayCourses);
    renderCourses();
  }, false);

// Get input value and update state
let inputText = document.getElementById('searchField');
inputText.addEventListener('input', function(event){
    state.input = inputText.value.toUpperCase();
});

dashboard.addEventListener('click', popDashboard);
courses.addEventListener('click', popCourses);

function popDashboard() {
    $("dashboard-page").innerHTML = "";
    qs("h1").innerHTML = 
    "<div class=\"hamburger-menu\"><a href=\"#\"><i class=\"fa fa-bars\" aria-label=\"menu\"></i></a></div>Dashboard<button><i class=\"fas fa-sign-out-alt\" aria-label=\"Log out\"></i></button>";
    qs(".active").classList.remove("active");
    $("dashboard").classList.add("active");
    $("course-page").innerHTML = "";
    $("program-results").style.display = 'block';
    $("course-results").innerHTML = "<h2>Recommended Courses</h2>";
    let dashboard = $("dashboard-page");
    for (let i = 0; i < dashboardSection.length; i++) {
        let subSection = document.createElement("section");
        subSection.classList.add("subSection");
        if (dashboardSection[i] != "Profile") {
            let h2 = document.createElement("h2");
            h2.innerText = dashboardSection[i];
            subSection.appendChild(h2);
        } else {
            renderProfile(subSection)
        }
        dashboard.appendChild(subSection);
    }
}

function renderProfile(subSection) {
    for (let i = 0; i < profileSection.length; i++) {
        let profile = document.createElement("div");
        profile.classList.add("profile");
        let h2 = document.createElement("h2");
        h2.innerText = profileSection[i]["H2"];
        profile.appendChild(h2);
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = "<h3></h3><p></p>"
        card.querySelector("h3").innerText = profileSection[i]["Name"];
        card.querySelector("p").innerText = profileSection[i]["Content"];
        profile.appendChild(card);
        subSection.appendChild(profile);
    }
}

function popCourses() {
}

searchButton.addEventListener('click', function(event) {
    event.preventDefault(); //don't do normal behavior
    state.displayCourses = state.allCourses.filter(updateDisplay);
    renderCourses();
    return false; //don't do normal behavior OR propagate! (for IE)
});

// Refilter everytime search button or submit filter pressed
function updateDisplay(course) {
    // console.log(course);
    if (course['Areas of Knowledge'] === undefined || 
        course.Campus === undefined ||
        course.Offered === undefined ||
        course.Department === undefined) {
        return false;
    } 
    return course['Areas of Knowledge'].includes(state.AofK) &&
    course.Campus.includes(state.campus) &&
    course.Offered.includes(state.quarter) &&
    course.Department.includes(state.input);
};


function renderCourses() {
    let recommendedSection = qs(".searchResult");
    recommendedSection.innerHTML = "<h2> Recommended Courses </h2>";
    for (let i = 0; i < state.displayCourses.length; i++) {
        let card = document.createElement("div");
        card.classList.add("clickable");
        card.classList.add("card");
        let name = document.createElement("h3");
        name.innerText = state.displayCourses[i]["Department"] + " " + state.displayCourses[i]["Code"] + " " + state.displayCourses[i]["Name"];
        let reason = document.createElement("p");
        reason.innerText = "Because you searched for " + state.displayCourses[i]["Department"];
        let panel = document.createElement("div");
        panel.classList.add("card");
        panel.classList.add("panel");
        panel.classList.add("hidden");
        panel.innerHTML = "<b>Campus: </b>" + state.displayCourses[i]["Campus"] + "<br> " + 
                            "<b>Credits: </b>" + state.displayCourses[i]["Credits"] + "<br>" + 
                            "<b>Areas of Knowledge: </b>" + state.displayCourses[i]["Areas of Knowledge"] + "<br>" + 
                            "<b>Prerequisites: </b>" + state.displayCourses[i]["Prerequisites"] + "<br>" + 
                            "<b class=\"quarter\">Quarter(s) Offered: </b>" + state.displayCourses[i]["Offered"];
        if (state.displayCourses[i]["Offered"] == "") {
            panel.querySelector(".quarter").innerText = "Quarter(s) Offered: All"
        }
        // <p><input class='star' type='checkbox' title='bookmark page'> Bookmark</p>
        card.appendChild(name);
        card.appendChild(reason);
        card.appendChild(panel);
        card.addEventListener('click', function(){openPanel(card)});
        recommendedSection.appendChild(card);
    }
}

function openPanel(card) {
    let panel = card.querySelector(".panel");
    if (panel.classList.contains("hidden")) {
        panel.classList.remove("hidden");
    } else {
        panel.classList.add("hidden");
    }

}


/* ------------------------------ Helper Functions  ------------------------------ */

/**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} id - element ID
 * @returns {object} DOM object associated with id.
 */
function $(id) {
    return document.getElementById(id);
}

/**
 * Returns the first element that matches the given CSS selector.
 * @param {string} query - CSS query selector.
 * @returns {object[]} array of DOM objects matching the query.
 */
function qs(query) {
    return document.querySelector(query);
}

/**
 * Returns the array of elements that match the given CSS selector.
 * @param {string} query - CSS query selector
 * @returns {object[]} array of DOM objects matching the query.
 */
function qsa(query) {
    return document.querySelectorAll(query);
}