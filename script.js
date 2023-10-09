let data = [];
const  domElements = {
    personsDiv: document.querySelector(".persons"),
    getDataBtn: document.querySelector(".get-data-button"),
    getDataDiv: document.querySelector(".get-data"),
    loadingDiv: document.querySelector(".loading-page"),
    errorDiv: document.querySelector(".error-page"),
    errorText: document.querySelector(".error-text")
}

async function main() {
    try {
		for (let i = 0; i < 10; i++) {
			let element  = await fetch("https://randomuser.me/api/");
			element = await element.json();
			data.push(element.results[0])
		}
        draw(data);
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

function showDetails(id, string) {
	
    const div = document.getElementById(id);
    const element = data.find((obj) => obj.registered.date === id);
    switch (string) {
        case "info":
            div.innerHTML = createInfo(element);
            break;
        case "location":
            div.innerHTML = createAddress(element[string]);
            break;
    }
}

function createPerson(el) {
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = createPersonCard(el, el.name, el.registered.date);
    return div;
}

function deletePerson(id) {
    data = data.filter((person) => person.registered.date !== id);
	draw(data);
}


function createAddress(location) {
    return `
        <div class="country">
            <p>Country</p><span>${location.country}</span>
        </div>
        <div class="state">
            <p>State</p><span>${location.state}</span>
        </div>
        <div class="city">
            <p>City</p><span>${location.city}</span>
        </div>
        <div class="postcode">
            <p>Postcode</p><span>${location.postcode}</span>
        </div>
        <div class="street">
            <p>Street</p>
            <div class="street-details"><span>${location.street.name}</span><span>${location.street.number}</span>
            </div>
        </div>

    `;
}

function createInfo (el) {
    return `
        <div class="username">
            <p>Username</p><span>${el.login.username}</span>
        </div>
        <div class="email">
            <p>Email</p><span>${el.email}</span>
        </div>
        <div class="phone">
            <p>Phone Number</p><span>${el.phone}</span>
        </div>
		<div class="age">
            <p>Age</p><span>${el.dob.age}</span>
        </div>
		<div class="gender">
           <p>Gender</p><span>${el.gender}</span>
        </div>
    `
}

function createPersonCard (el, name, id) {
    return `
        <div class="person-name">
            <div class="person-photo">
                <img src="${el.picture.large}" alt="Profile Photo">
            </div>
            <div class="name">
                <h1>${name.title} ${name.first} ${name.last}</h1>
            </div>
        </div>
        <div class="buttons">
            <button class="info-btn" onclick="showDetails('${id}','info')">Info</button>
            <button class="address-btn" onclick="showDetails('${id}','location')">Address</button>
        </div>
        <div id="${id}" class="info">
            <div class="username">
                <p>Username</p><span>${el.login.username}</span>
            </div>
            <div class="email">
                <p>Email</p><span>${el.email}</span>
            </div>
            <div class="phone">
                <p>Phone Number</p><span>${el.phone}</span>
            </div>
			<div class="age">
				<p>Age</p><span>${el.dob.age}</span>
			</div>
			<div class="gender">
				<p>Gender</p><span>${el.gender}</span>
			</div>
        </div>
        <div class="delete" onclick="deletePerson('${id}')">
            <p class="delete-user">Click To Delete User</p>
        </div>
    `
}

domElements.getDataBtn.addEventListener("click", () => {
    domElements.getDataDiv.style.display = "none";
    domElements.loadingDiv.style.display = "flex";
    setTimeout(()=>{
        main()
    },3000);
});