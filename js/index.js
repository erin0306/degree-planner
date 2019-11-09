'use-strict';

let course = [{Campus: "Seattle", Department: "INFO", Code: "201", Name: "", Credits: "", Knowledge: "I&S", Offered: "AU18"},
{Campus: "Seattle", Department: "INFO", Code: "200", Name: "", Credits: "", Knowledge: "I&S", Offered: "AU18"},
{Campus: "Seattle", Department: "CSE", Code: "142", Name: "", Credits: "", Knowledge: "QSR", Offered: "AU17"},
{Campus: "Seattle", Department: "CSE", Code: "143", Name: "", Credits: "", Knowledge: "QSR", Offered: "AU18"},
{Campus: "Seattle", Department: "ECON", Code: "200", Name: "", Credits: "", Knowledge: "I&S", Offered: "AU17"},
{Campus: "Seattle", Department: "ENGL", Code: "131", Name: "", Credits: "", Knowledge: "C", Offered: "AU17"}];

const SEATTLE_START_INDEX = 1235;
const SEATTLE_END_INDEX = 12406;

let searchButton = qs(".searchButton");
let dashboard = qs("#dashboard");
let courses = qs("courses");

dashboard.addEventListener('click', popDashboard);

searchButton.addEventListener('click', function(event) {
    event.preventDefault(); //don't do normal behavior
    event.stopPropagation(); //don't pass the event to parents
    d3.csv("./data/uwcourses.csv")
    .then(wrangleData);
    return false; //don't do normal behavior OR propagate! (for IE)
});

function popDashboard() {
    qs("h1").innerHTML = 
    "<div class=\"hamburger-menu\"><a href=\"#\"><i class=\"fa fa-bars\" aria-label=\"menu\"></i></a></div>Dashboard<button><i class=\"fas fa-sign-out-alt\" aria-label=\"Log out\"></i></button>";
    qs(".active").classList.remove("active");
    qs("#dashboard").classList.add("active");
}

function wrangleData(data) {
    let input = $("searchField");
    data = data.slice(SEATTLE_START_INDEX, SEATTLE_END_INDEX);
    let firstIndex = findFirst(data, 0, data.length - 1, input.value, "Department");
    let endIndex = findLast(data, 0, data.length - 1, input.value, "Department");
    console.log(data);

    printData(data, firstIndex, endIndex);
}

// function filter(data, column, term) {
//     let newData = {}
//     if (term == "") {
//         return data;
//     } else {
//         for (let i = 0; i < data.length; i++) {
//             if (data[i][column].contains(term)) {
//                 newData.push(data[i]);
//             }
//         }
//     }
//     return newData;
// }

function printData(data, first, end) {
    let recommendedSection = qs(".searchResult");
    recommendedSection.innerHTML = "<h2> Recommended Courses </h2>";
    if (first != -1 && end != -1) {
        for (let i = first; i <= end; i++) {
            let card = document.createElement("div");
            card.classList.add("clickable");
            card.classList.add("card");
    
            let name = document.createElement("h3");
            name.innerText = data[i]["Department"] + " " + data[i]["Code"] + " " + data[i]["Name"];
            let reason = document.createElement("p");
            reason.innerText = "Because you searched for " + data[i]["Department"];
            let panel = document.createElement("div");
            panel.classList.add("card");
            panel.classList.add("panel");
            panel.classList.add("hidden");
            panel.innerHTML = "<b>Campus: </b>" + data[i]["Campus"] + "<br> " + 
                               "<b>Credits: </b>" + data[i]["Credits"] + "<br>" + 
                               "<b>Areas of Knowledge: </b>" + data[i]["Areas of Knowledge"] + "<br>" + 
                               "<b>Prerequisites: </b>" + data[i]["Prerequisites"] + "<br>" + 
                               "<b class=\"quarter\">Quarter(s) Offered: </b>" + data[i]["Offered"];
            if (data[i]["Offered"] == "") {
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
}

function openPanel(card) {
    let panel = card.querySelector(".panel");
    if (panel.classList.contains("hidden")) {
        panel.classList.remove("hidden");
    } else {
        panel.classList.add("hidden");
    }

}

function findFirst(data, start, end, prefix, column) {
    if (start <= end) {
        let mid = parseInt(start + (end - start) / 2);
        let compare = data[mid][column].localeCompare(prefix);
        if (compare < 0) {
            return findFirst(data, mid + 1, end, prefix, column);
        }
        if (compare > 0) {
            return findFirst(data, start, mid - 1, prefix, column);
        }
        if (compare == 0) {
            if (mid == 0 || data[mid - 1][column].localeCompare(prefix) < 0) {
                return mid;
            }
            return findFirst(data, start, mid - 1, prefix, column);
        }
    }
    return -1;
}

function findLast(data, start, end, prefix, column) {
    if (start <= end) {
        let mid = parseInt(start + (end - start) / 2);
        let compare = data[mid][column].localeCompare(prefix);

        if (compare < 0) {
            return findLast(data, mid + 1, end, prefix, column);
        }
        if (compare > 0) {
            return findLast(data, 0, mid - 1, prefix, column);
        }
        if (compare == 0) {
            if (mid == data.length - 1 || data[mid + 1][column].localeCompare(prefix) > 0) {
                return mid;
            }
            return findLast(data, mid + 1, end, prefix, column);
        }
    }
    return -1;
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