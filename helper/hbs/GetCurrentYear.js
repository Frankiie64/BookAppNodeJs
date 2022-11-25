const now = function () {
    const time = new Date().getFullYear();
    return `${time}`;
}

exports.getCurrentYear = now;