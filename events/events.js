import { deletePerson, showDetails } from "../helpers/helpers.js";

export const setButtonEvents = () => {
    const buttons = {
        deleteUserButtons: Array.from(document.querySelectorAll(".delete-btn")),
        showInfoButtons: Array.from(document.querySelectorAll(".info-btn")),
        showLocationButtons: Array.from(
            document.querySelectorAll(".address-btn")
        ),
    };

    buttons.showInfoButtons.forEach((showInfoButton) => {
        showInfoButton.addEventListener("click", (e) => {
            showDetails(e.target.attributes.data.value, "info");
        });
    });

    buttons.showLocationButtons.forEach((showLocationButton) => {
        showLocationButton.addEventListener("click", (e) => {
            showDetails(e.target.attributes.data.value, "location");
        });
    });

    buttons.deleteUserButtons.forEach((deleteUserButton) => {
        deleteUserButton.addEventListener("click", (e) => {
            console.log(e.target);
            deletePerson(e.target.attributes.data.value);
        });
    });
};
