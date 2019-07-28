async function getData(selection) {
    let searchArray = [];
    let fetchPage = `https://swapi.co/api/${selection}`
    do { 
        const response = await fetch(fetchPage);
        const items = await response.json();
        items.results.forEach(item => {
            searchArray.push(item);
        });
        if (items.next) {
            fetchPage = items.next
        } else {
            return searchArray; 
        }
    }
    while (true)
}

function displayContent(selection) {
    while (boxes.hasChildNodes()) {
        boxes.removeChild(boxes.firstChild);
    }

    if (loading.childNodes.length == 1) {
        let newh1 = document.createElement('h1');
        newh1.appendChild(document.createTextNode('The Force Awaits.....'));
        loading.appendChild(newh1);
        footer.style.display = "none"
    }

    getData(selection).then(function (result) {
        result.forEach(item => {
            let item2, item3, title2, title3;
            if (selection === "people") {
                title2 = "Height";
                item2 = item.height + " cm";
                title3 = "Birth Year";
                item3 = item.birth_year;
            } else if (selection === "planets") {
                title2 = "Terrain";
                item2 = item.terrain;
                title3 = "Climate";
                item3 = item.climate;
            } else if (selection === "starships") {  
                title2 = "Ship Class";      
                item2 = item.starship_class;
                title3 = "Hyperdrive Rating";
                item3 = item.hyperdrive_rating;
            } else if (selection === "vehicles") {
                title2 = "Model";
                item2 = item.model;
                title3 = "Vehicle Class";
                item3 = item.vehicle_class;    
            } else if (selection === "species") {
                title2 = "Classification";
                item2 = item.classification;
                title3 = "Language";
                item3 = item.language;
            }        
            let ul = document.createElement('ul')
            boxes.appendChild(ul);
            let li1 = document.createElement("li");
            li1.appendChild(document.createTextNode(item.name));
            li1.classList.add("itemName");
            ul.appendChild(li1);
            let titleli2 = document.createElement("li");
            titleli2.appendChild(document.createTextNode(title2));
            titleli2.classList.add("itemTitle");
            ul.appendChild(titleli2);
            let li2 = document.createElement("li");
            li2.appendChild(document.createTextNode(item2));
            li2.classList.add("itemSpecs");
            ul.appendChild(li2);
            let titleli3 = document.createElement("li");
            titleli3.appendChild(document.createTextNode(title3));
            titleli3.classList.add("itemTitle");
            ul.appendChild(titleli3);
            let li3 = document.createElement("li");
            li3.appendChild(document.createTextNode(item3));
            li3.classList.add("itemSpecs");
            ul.appendChild(li3);
        })
        
    }).then(function() {
        if (loading.childNodes.length === 2) {
            loading.removeChild(loading.firstElementChild);
            footer.style.display = "block"

        }
    });
}

let boxes = document.querySelector(".boxes");
let people = document.querySelector(".peopleButton");
let planets = document.querySelector('.planetButton');
let ships = document.querySelector('.shipButton');
let vehicles = document.querySelector('.vehicleButton');
let species = document.querySelector('.speciesButton');
let loading = document.querySelector(".loading");
let footer = document.querySelector("h4");

people.addEventListener('click', function() {displayContent('people')});
planets.addEventListener('click', function() {displayContent('planets')});
ships.addEventListener('click', function() {displayContent('starships')});
vehicles.addEventListener('click', function() {displayContent('vehicles')});
species.addEventListener('click', function() {displayContent('species')});

displayContent('people');
