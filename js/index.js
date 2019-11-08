'use-strict';

const SEATTLE_START_INDEX = 0;
const SEATTLE_END_INDEX = 1233;

// let searchButton = qs(".searchButton");

// searchButton.addEventListener("click", searchData);

// function searchData() {
//     d3.csv("./data/uwcourses.csv")
//     .then(function(data) {
//     wrangleData(data);
//     });
// }

d3.csv("./data/uwcourses.csv")
.then(function(data) {
    wrangleData(data);
});

function wrangleData(data) {
    let newData = data.slice(SEATTLE_START_INDEX, SEATTLE_END_INDEX);

    let firstIndex = findFirst(newData, 0, newData.length - 1, "CSS", "Department");
    let endIndex = findLast(newData, 0, newData.length - 1, "CSS", "Department");

   printData(newData, firstIndex, endIndex);
}

function printData(data, first, end) {
    console.log("lul");
    let recommendedSection = qs(".searchResult");
    recommendedSection.innerHTML = "<h2> Recommended Courses </h2>";

    for (let i = first; i <= end; i++) {
        let card = document.createElement("div");
        card.classList.add("clickable");
        card.classList.add("card");
        let name = document.createElement("h3");
        name.innerText = data[i]["Department"] + " " + data[i]["Code"] + " " + data[i]["Name"];
        let reason = document.createElement("p");
        reason.innerText = "Because you searched for 'CSS'";
        card.appendChild(name);
        card.appendChild(reason);
        recommendedSection.appendChild(card);
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