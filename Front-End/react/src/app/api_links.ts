
const authUrl = "https://localhost:7030";

const api_links = {
    product: {
        //GET ALL
        getAll: {
            url: `${authUrl}/Product`,
            method: "GET",
        },
        //GET BY ID
        getById: {
            url: `${authUrl}/Product`,
            method: "GET",
        },

        //POST
        createNew: {
            url: `${authUrl}/Product`,
            method: "POST",
            data: {},
        },

        ////////////////////// ELSE //////////////////////
        edit: {
            url: `${authUrl}api/Product/`,
            method: "PUT",
            //token: "",
            data: {}
        },

    },
    goodsIssue: {
        //GET ALL
        getAll: {
            url: `${authUrl}/GoodRecipt`,
            method: "GET",
        },
        //GET BY ID
        getById: {
            url: `${authUrl}/GoodRecipt`,
            method: "GET",
        },

        //POST
        createNew: {
            url: `${authUrl}/GoodRecipt`,
            method: "POST",
            data: {},
        },

        ////////////////////// ELSE //////////////////////
        edit: {
            url: `${authUrl}api/Product`,
            method: "PUT",
            token: "",
            data: {}
        },
    }

}

export default api_links