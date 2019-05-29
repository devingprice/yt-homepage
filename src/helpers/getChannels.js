
// Fetch user channels and add to json file
// Will need to load json file and add to it, then save

let fs = require("fs");
let sampleObject = {
    a: 1,
    b: 2,
    c: {
        x: 11,
        y: 22
    }
};

fs.writeFile("./channels.json", JSON.stringify(sampleObject, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});