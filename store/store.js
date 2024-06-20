const store = {
    data: null,
    domElements: {
        personsDiv: document.querySelector(".persons"),
        getDataBtn: document.querySelector(".get-data-button"),
        getDataDiv: document.querySelector(".get-data"),
        loadingDiv: document.querySelector(".loading-box"),
        errorDiv: document.querySelector(".error-box"),
        errorText: document.querySelector(".error-text"),
    },
};

export default store;
