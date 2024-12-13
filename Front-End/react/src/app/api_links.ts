const authUrl = "https://localhost:7030";

const api_links = {
  product: {
    // GET ALL PRODUCTS
    getAll: {
      url: `${authUrl}/Product/getAllProductFullInventory`,
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
    import: {
      //GET ALL
      getAll: {
        url: `${authUrl}/GoodRecipt/GetAllGoodReciptsByRole`,
        method: "GET",
      },
      //GET BY ID
      getById: {
        url: `${authUrl}/GoodRecipt/getGoodReciptBydId/`,
        method: "GET",
      },
      //UPDATE BY ID
      update: {
        url: `${authUrl}/GoodRecipt/updateGoodReceipt/`,
        method: "PUT",
        data: {},
      },
      //POST
      createNew: {
        url: `${authUrl}/GoodRecipt/addGoodRecipt`,
        method: "POST",
        data: {},
      },

      //SET STATE
      accept: {
        url: `${authUrl}/GoodRecipt/acceptGoodRecipt/`,
        method: "GET",
      },
      delete: {
        url: `${authUrl}/GoodRecipt/deleteItem/`,
        method: "GET",
      },
      cancel: {
        url: `${authUrl}/GoodRecipt/cancelGoodRecipt/`,
        method: "GET",
      },
      download: {
        url: `${authUrl}/GoodRecipt/download/`,
        method: "GET",
      },
    },

    export: {
      getAll: {
        url: `${authUrl}/GoodExport/GetAllGoodExportsByRole`,
        method: "GET",
      },
      //GET BY ID
      getById: {
        url: `${authUrl}/GoodExport/getGoodExportById/`,
        method: "GET",
      },
      //UPDATE BY ID
      update: {
        url: `${authUrl}/GoodExport/updateGoodExport/`,
        method: "PUT",
        data: {},
      },

      //POST
      createNew: {
        url: `${authUrl}/GoodExport/addGoodExport`,
        method: "POST",
        data: {},
      },

      //SET STATE
      accept: {
        url: `${authUrl}/GoodExport/acceptGoodExport/`,
        method: "GET",
      },
      delete: {
        url: `${authUrl}/GoodExport/deleteItem/`,
        method: "GET",
      },
      cancel: {
        url: `${authUrl}/GoodExport/cancelGoodExport/`,
        method: "GET",
      },
      download: {
        url: `${authUrl}/GoodExport/download/`,
        method: "GET",
      },
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
      withCredentials: true
    },
  },

  partner: {
    getAll: {
      url: `${authUrl}/Partner`,
      method: "GET",
    },
    edit: (id: number) => ({
      url: `${authUrl}/Partner/updatePartnerById/${id}`,
      method: "PUT",
      data: {},
    }),
    create: {
      url: `${authUrl}/Partner/addNewPartner`,
      method: "POST",
      data: {},
    },
    search: (name: string) => ({
      url: `${authUrl}/Partner/getPartnerBySearchName`,
      method: "GET",
      data: { name },
    }),
  },

  customer: {
    getAll: {
      url: `${authUrl}/Customer`,
      method: "GET",
    },
    edit: (id: number) => ({
      url: `${authUrl}/Customer/updateCustomerById/${id}`,
      method: "PUT",
      data: {},
    }),
    create: {
      url: `${authUrl}/Customer/addNewCustomer`,
      method: "POST",
      data: {},
    },
    search: (name: string) => ({
      url: `${authUrl}/Customer/getCustomerBySearchName`,
      method: "GET",
      data: { name },
    }),
  },

  warehouse: {
    getAll: {
      url: `${authUrl}/WareHouse`,
      method: "GET",
    },
    getAllByRole: {
      url: `${authUrl}/WareHouse/getAllByRole`,
      method: "GET",
    },
    getById: {
      url: `${authUrl}/Warehouse/getWarehouseById/`,
      method: "GET",
    },
    edit: (id: number) => ({
      url: `${authUrl}/Warehouse/updateWarehouseById/${id}`,
      method: "PUT",
      data: {},
    }),
    create: {
      url: `${authUrl}/Warehouse/addNewWarehouse`,
      method: "POST",
      data: {},
    },
    search: (name: string) => ({
      url: `${authUrl}/Warehouse/getCustomerBySearchName`,
      method: "GET",
      data: { name },
    }),
  },

  users: {
    setSession: (id: number) => ({
      url: `${authUrl}/User/setSession/${id}`,
      method: "GET",
    }),
  },

  uploadFile: {
    post: {
      url: `${authUrl}/api/Upload/upload-image`,
      method: "POST",
      data: {},
    },
  },
};

export default api_links;
