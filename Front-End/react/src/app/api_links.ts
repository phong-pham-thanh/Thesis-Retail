
const authUrl = "https://localhost:7030";

const api_links = {
    product: {
        // GET ALL PRODUCTS
        getAll: {
            url: `${authUrl}/Product`,
            method: "GET",
        },

        // GET PRODUCT BY ID
        getById: (productId: number) => ({
            url: `${authUrl}/Product/getProductById/${productId}`,
            method: "GET",
        }),

        // CREATE NEW PRODUCT
        createNew: {
            url: `${authUrl}/Product/addNewProduct`,
            method: "POST",
            data: {},
        },

        // EDIT PRODUCT
        edit: (productId: number) => ({
            url: `${authUrl}/Product/updateProductById/${productId}`,
            method: "PUT",
            data: {}, // This will be populated with the product data to update
        }),

        // DELETE PRODUCT
        delete: (productId: number) => ({
            url: `${authUrl}/Product/deleteProductById/${productId}`,
            method: "DELETE",
        }),
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
    },
    category: {
        getAll:{
            url: `${authUrl}/Category`,
            method: "GET",
        }
    },

    user: {
        //GET ALL
        getAll: {
            url: `${authUrl}/User`,
            method: "GET",
        },

        //POST FOR LOGIN
        login: {
            url: `${authUrl}/User/login`,
            method: "POST",
            data: {},
        },

    }
}

export default api_links