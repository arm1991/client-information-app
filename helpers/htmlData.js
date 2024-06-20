export function getPersonAdressHTML(location) {
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

export function getPersonInfoHTML(el) {
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
    `;
}

export function getPersonCardHTML(el, name, id) {
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
            <button class="info-btn green-button" data="${id}" >Info</button>
            <button class="address-btn green-button" data="${id}" >Address</button>
        </div>
        <div id="${id}" class="info wrap">
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
        <div class="delete-btn center" data="${id}">
            <p class="delete-user" data="${id}">Click To Delete User</p>
        </div>
    `;
}
