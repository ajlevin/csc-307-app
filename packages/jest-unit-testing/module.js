// module.js

function sum(a, b) {
    return a + b;
}

function div (a, b){
    if (b === 0) {
        throw new Error("Invalid division by zero");
    }
    return a / b;
}

/// change !isNan(...) to 
/// val.match(/\d+/g) and check if the result !== null
function containsNumbers(text){
    for (let i = 0; i < text.length; i++) {
        if (!isNaN(text.charAt(i)))
            return true;
    }
    return false;
}

module.exports = { sum, div, containsNumbers };
