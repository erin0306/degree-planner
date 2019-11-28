export function ssearchCourse(data, dept, AofK, quarter, campus) {
    let result = data.filter(course => course["Department"].includes(dept));
    result = result.filter(course => course["Areas of Knowledge"].includes(AofK));
    result = result.filter(course => course["Offered"].includes(quarter));
    result = result.filter(course => course["Campus"].includes(campus));
    return result;
}