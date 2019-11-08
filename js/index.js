'use-strict';

const SEATTLE_START_INDEX = 0;
const SEATTLE_END_INDEX = 1233;

d3.csv("./data/uwcourses.csv")
.then(function(data) {
    wrangleData(data);
});

function wrangleData(data) {
    let newData = data.slice(SEATTLE_START_INDEX, SEATTLE_END_INDEX);

    let firstIndex = findFirst(newData, 0, newData.length - 1, "CSS", "Department");
    let endIndex = findLast(newData, 0, newData.length - 1, "CSS", "Department");

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