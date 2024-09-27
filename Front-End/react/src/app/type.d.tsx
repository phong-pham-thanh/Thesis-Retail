export type LoginState = {
  message: string | null;
  isSuccess: boolean;
  errors:
  | {
    /*
      "Password": string[]|null;
      UserName: string[]|null;
      AccountInformation: string[]|null;
      ConfirmPassword:string[]|null;*/
  }
  | string[]
  | null;
  token: string | undefined;
  userInformation?: null; //UserInformationLoginState |
  customerInformation?: null; //CustomerInformationLoginState |
  role: null; //RoleState |
  permission?: undefined | string[] | null;
  errorServer?: string;
};

export type UserState = {
  id: string | number;
  name: string;
  username: string;
  password: string | null;
  branch: string;
  address: string;
  dateOnboard: string;
  age: string | number;
};
/*
export type UserInformationLoginState = {
  "id": string,
  "name": string | null,
  "citizenId": string | null,
  "userName": string | null,
  "normalizedUserName": string,
  "email": string | null,
  "normalizedEmail": string | null,
  "emailConfirmed": boolean,
  "phoneNumber": string | null,
  "phoneNumberConfirmed": boolean,
  "twoFactorEnabled": boolean,
  "lockoutEnd": string | null,
  "lockoutEnabled": boolean,
  "isBlocked": boolean,
  "salesManager": {} | null,
  "customers": [],
  "roles": RoleState[],
};

export type MenuState = {
  "isOpen": boolean,
  "userRole": RoleState,
};*/

export type ProductState = {
  id: string;
  name: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  description: string;
  status: boolean;
};
export type CategoryState = {
  id: string;
  name: string;
};

export type ProductListState = ProductState[];

export type EmployeeState = {
  empId: string;
  empName: string;
  phone: string;
  gender: string;
  chinhanh: string;
  chucdanh: string;
};

export type EmployeeListState = EmployeeState[];

export type CustomerState = {
  cusId: string;
  cusName: string;
  phone: string;
  gender: string;
  email: string;
  tongchitieu: string;
};

export type CustomerListState = CustomerState[];


export type CategoryType = {
  id: string;
  name: string;
};

export type PartnerState =
  {
    id: number | string,
    name: string,
    totalSale: number,
  };

export type WarehouseState =
  {
    id: number | string,
    managerId: number | string,
    manager: null,
    address: string,
    status: boolean,
    inventories: null
  };

export type GoodsReceipt = {
  id: string;
  importDate: string;
  partnerId: string;
  receiptStatus: number;
  ListGoodReciptDetailsModel: []

  //parnersId: string;
};

export type ListGoodReciptDetailsModel =
{
  id: number,
  goodReceiptId: number,
  goodsReceipt: null,
  productId: number,
  product: {
    id: number,
    name: string,
    categoryId: number,
    category: {
      id: number,
      name: string
    },
    description: string,
    status: boolean,
    listInventories: null
  }|null,
  priceUnit: number,
  quantity: number
};

export type GoodReceiptDataType = GoodImportReceiptDetailDataType;
/*{
  id: string|number,
  importDate: string|Date,
  partnerID: string|number,
  receiptStatus: string|number,
  listGoodReciptDetailsModel: GoodsReceiptDetails[]|null,
  partner?: {
    id: number,
    name: string,
    totalSale: number
  },
};*/

export type GoodImportReceiptDetailDataType = {
  id: number,
  importDate: string,
  partnerID: number,
  partner: {
    id: number,
    name: string,
    totalSale: number
  },
  receiptStatus: number,
  totalAmount: number | null,
  listGoodReciptDetailsModel: [
    {
      id: number,
      goodReceiptId: number,
      goodsReceipt: null,
      productId: number,
      product: {
        id: number,
        name: string,
        categoryId: number,
        category: {
          id: number,
          name: string
        },
        description: string,
        status: boolean,
        listInventories: null
      },
      priceUnit: number,
      quantity: number
    }]
}

export type GoodExportReceiptDetailDataType = {
  id: number,
  exportDate: string,
  customerID: number,
  customer: {
    id: number,
    name: string,
    totalSale: number
  },
  exportStatus: number,
  totalAmount: number | null,
  listGoodExportDetailsModel: ListGoodReciptDetailsModel[]/*[
    {
      id: number,
      goodReceiptId: number,
      goodsReceipt: null,
      productId: number,
      product: {
        id: number,
        name: string,
        categoryId: number,
        category: {
          id: number,
          name: string
        },
        description: string,
        status: boolean,
        listInventories: null
      },
      priceUnit: number,
      quantity: number
    }]*/
}
