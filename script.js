import { draw, fetchData } from "./helpers/helpers.js";
import store from "./store/store.js";

const { domElements } = store;

async function main() {
    try {
        store.data = await fetchData();

        if (!store.data) {
            domElements.errorDiv.style.display = "flex";
            domElements.errorText.textContent =
                "Error: Couldn't find data. Reload the page";
        } else {
            draw(store.data, domElements);
        }
    } catch (error) {
        console.error("Error in main function:", error);
    } finally {
        domElements.loadingDiv.style.display = "none";
        domElements.personsDiv.style.display = "flex";
    }
}

domElements.getDataBtn.addEventListener("click", () => {
    domElements.getDataDiv.style.display = "none";
    domElements.loadingDiv.style.display = "flex";
    main();
});
