const categories = document.getElementById("body")
const url = "http://api.quotable.io"
const loadCategories = async () => {
    // populate the categories with the fetched values
    try {
        response = await fetch(url + "/tags")
        let data = await response.json();
        let categories = document.getElementById("category");
        console.log(categories)
        for (let i = 0; i < data.length; i++) {
            const option = document.createElement("option");
            option.value = data[i].name;
            option.innerHTML = camelCaseClean(data[i].name);
            categories.appendChild(option);
        }
    } catch (error) {
        console.log(error)
    }
}

const camelCaseClean = str => {
    str = str.replace("-", " ");
    splitStr = str.split(" ");
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
    }
    str = splitStr.join(" ");
    return str;
}

document.getElementById("getQuote").addEventListener("click", async (event) => {
    event.preventDefault();
    tag = document.getElementById("category").value;
    console.log(tag)
    try {
        response = await fetch(url + "/random?" + tag)
        let json = await response.json();
        document.getElementById("quote").style.display = "block";
        document.getElementById("quote-content").innerHTML = "<i>&quot;" + json.content + "&quot;</i>";
        document.getElementById("quote-author").innerHTML = json.author;
    } catch (error) {
        return error;
    }
});

loadCategories();