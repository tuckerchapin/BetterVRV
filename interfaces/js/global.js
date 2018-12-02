// Helpers

// Converts camelCase strings to kebab-case strings
function camel2kebab(str) {
    return str.replace( /([A-Z])/g, "-$1").toLowerCase();
}

// Converts kebab-case strings to camelCase strings
function kebab2camel(str) {
    let words = str.split("-");
    let camel = words[0];
    for (let i = 1; i < words.length; i++) {
        camel += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return camel;
}
