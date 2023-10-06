let data = [];
const  domElements = {
    personsDiv: document.querySelector(".persons"),
    getDataBtn: document.querySelector(".get-data-button"),
    getDataDiv: document.querySelector(".get-data"),
    loadingDiv: document.querySelector(".loading-page"),
    errorDiv: document.querySelector(".error-page"),
    errorText: document.querySelector(".error-text")
}

async function getData() {
    try {
        const store = await fetch("https://jsonplaceholder.typicode.com/users");
        data = await store.json();
        await draw(data);
    }
    catch(err) {
        domElements.errorDiv.style.display = "flex";
        domElements.errorText.textContent = "Error: Couldn't find data. Reload the page";
        console.log(err);
    }
    finally {
        domElements.loadingDiv.style.display = "none";
    }
}

async function draw(data) {
    domElements.personsDiv.innerHTML = "";
    const persons = document.createDocumentFragment();
    data.forEach(element => {
        persons.appendChild(createPerson(element));
    });
    domElements.personsDiv.appendChild(persons);
}

function createPerson(el) {
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = createPersonCard(el);
    return div;
}

function showDetails(id, string) {
    const div = document.getElementById(id);
    const element = data.find((obj) => obj.id === id);
    const detail = element[string];
    switch (string) {
        case "info":
            div.innerHTML = createInfo(element);
            break;
        case "company":
            div.innerHTML = createCompany(detail);
            break;
        case "address":
            div.innerHTML = createAddress(detail);
            break;
    }
}

function openWebPage(url) {
    window.open(url);
}

function createCompany(company) {
    return`
        <div class="company-name">
            <p>Company Name</p><span>${company.name}</span>
        </div>
        <div class="catchphrase">
            <p>Catch Phrase</p><span>${company.catchPhrase}</span>
        </div>
        <div class="bs">
            <p>Bs</p><span>${company.bs}</span>
        </div>
    `;
}

function createAddress(address) {
    return `
        <div class="city">
            <p>City</p><span>${address.city}</span>
        </div>
        <div class="street">
            <p>Street</p><span>${address.street}</span>
        </div>
        <div class="suite">
            <p>Suite</p><span>${address.suite}</span>
        </div>
        <div class="zipcode">
            <p>Zipcode</p><span>${address.zipcode}</span>
        </div>
        <div class="geo">
            <p>Geolocation</p>
            <div class="geo-cordinates"><span>${address.geo.lat}</span><span>${address.geo.lng}</span>
            </div>
        </div>

    `;
}

function createInfo (el) {
    return `
        <div class="username">
            <p>Username</p><span>${el.username}</span>
        </div>
        <div class="email">
            <p>Email</p><span>${el.email}</span>
        </div>
        <div class="phone">
            <p>Phone Number</p><span>${el.phone}</span>
        </div>
    `
}

function createPersonCard(el) {
    return `
        <div class="person-name">
            <div class="person-photo">
                <img src="./assets/person${el.id}.jpg" alt="${el.name} Photo">
            </div>
            <div class="name">
                <h1>${el.name}</h1>
            </div>
        </div>
        <div class="buttons">
            <button class="info-btn" onclick="showDetails(${el.id},'info')">Info</button>
            <button class="company-btn" onclick="showDetails(${el.id},'company')">Company</button>
            <button class="address-btn" onclick="showDetails(${el.id},'address')">Address</button>
        </div>
        <div id="${el.id}" class="info">
            <div class="username">
                <p>Username</p><span>${el.username}</span>
            </div>
            <div class="email">
                <p>Email</p><span>${el.email}</span>
            </div>
            <div class="phone">
                <p>Phone Number</p><span>${el.phone}</span>
            </div>
        </div>
        <div class="website" onclick="openWebPage('${el.website}')">
            <p">View Website</a>
        </div>
    `
}

domElements.getDataBtn.addEventListener("click", () => {
    domElements.getDataDiv.style.display = "none";
    domElements.loadingDiv.style.display = "flex";
    setTimeout(()=>{
        getData()
    },3000);
});

