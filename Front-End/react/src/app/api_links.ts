const authUrl = "https://localhost:7030";

const api_links = {
  product: {
    // GET ALL PRODUCTS
    getAll: {
      url: `${authUrl}/Product`,
      method: "GET",
    },
/*
    goodsIssue: {
        //GET ALL
        getAll: {
            url: `${authUrl}/GoodRecipt/GetAllGoodRecipts`,
            method: "GET",
        },
        //GET BY ID
        getById: {
            url: `${authUrl}/GoodRecipt/getGoodReciptBydId/`,
            method: "GET",
        },

        //POST
        createNew: {
            url: `${authUrl}/GoodRecipt/addGoodRecipt`,
            method: "POST",
            data: {},
        },

        ////////////////////// ELSE //////////////////////
        edit: {
            url: `${authUrl}api/Product`,
            method: "PUT",
            token: "",
            data: {}
        },*/
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

    import: {
      //GET ALL
      getAll: {
        url: `${authUrl}/GoodRecipt/GetAllGoodRecipts`,
        method: "GET",
      },
      //GET BY ID
      getById: {
        url: `${authUrl}/GoodRecipt/getGoodReciptBydId/`,
        method: "GET",
      },

      //POST
      createNew: {
        url: `${authUrl}/GoodRecipt/addGoodRecipt`,
        method: "POST",
        data: {},
      },
    },
    export: {
      getAll: {
        url: `${authUrl}/GoodExport/GetAllGoodExports`,
        method: "GET",
      },
      //GET BY ID
      getById: {
        url: `${authUrl}/GoodExport/getGoodExportById/`,
        method: "GET",
      },

      //POST
      createNew: {
        url: `${authUrl}/GoodExport/addGoodRecipt`,
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

    ////////////////////// ELSE //////////////////////
    edit: {
      url: `${authUrl}api/Product`,
      method: "PUT",
      token: "",
      data: {},
    },
  },

  category: {
    getAll: {
      url: `${authUrl}/Category`,
      method: "GET",
    },
    edit: (id: number) => ({
      url: `${authUrl}/Category/updateCategoryById/${id}`,
      method: "PUT",
      data: {},
    }),
    create: {
      url: `${authUrl}/Category/addNewCategory`,
      method: "POST",
      data: {},
    },
    search: (name: string) => ({
      url: `${authUrl}/Category/getCategoryBySearchName`,
      method: "GET",
      data: { name },
    }),
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
  },

  customer: {
    getAll: {
      url: `${authUrl}/Customer`,
      method: "GET",
    },
  },
  
  partner: {
    getAll: {
      url: `${authUrl}/Partner`,
      method: "GET",
    },
  },

  warehouse: {
    getAll: {
      url: `${authUrl}/WareHouse`,
      method: "GET",
    },
  },
};

export default api_links;
