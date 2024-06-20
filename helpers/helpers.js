import {
    getPersonAdressHTML,
    getPersonCardHTML,
    getPersonInfoHTML,
} from "./htmlData.js";
import { setButtonEvents } from "../events/events.js";
import api from "../api/api.js";
import store from "../store/store.js";

export const fetchData = async () => {
    try {
        const fetchPromises = Array.from({ length: 10 }, () =>
            fetch(api).then((response) => response.json())
        );

        const results = await Promise.all(fetchPromises);
        return results.map((result) => result.results[0]);
    } catch (error) {
        console.error("Error fetching data:", error);
        return false;
    }
};

export function draw(data, domElements) {
    domElements.personsDiv.innerHTML = "";
    const persons = document.createDocumentFragment();
    data.forEach((element) => {
        persons.appendChild(createPerson(element));
    });
    domElements.personsDiv.appendChild(persons);
    setButtonEvents();
}

function createPerson(el) {
    const div = document.createElement("div");
    div.classList = "person center";
    div.innerHTML = getPersonCardHTML(el, el.name, el.registered.date);
    return div;
}

export function showDetails(id, string) {
    const { data } = store;
    const div = document.getElementById(id);
    const element = data.find((obj) => obj.registered.date === id);
    switch (string) {
        case "info":
            div.innerHTML = getPersonInfoHTML(element);
            break;
        case "location":
            div.innerHTML = getPersonAdressHTML(element[string]);
            break;
    }
}

export function deletePerson(id) {
    store.data = store.data.filter((person) => person.registered.date !== id);
    draw(store.data, store.domElements);
}
