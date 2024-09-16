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
  "id": string | number ,
  "name": string,
  "username": string,
  "password": string | null,
  "branch": string,
  "address": string,
  "dateOnboard": string,
  "age": string | number
}
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

export type GoodsReceipt = {
  id: string;
  importDate: string;
  partnerId: string;
  receiptStatus: number;
  ListGoodReciptDetailsModel:[]

  //parnersId: string;
};

export type GoodsReceiptDetails = 
  {
    id?: string;
    goodsReceiptId: string;
    productId: string;
    priceUnit: number;
    quantity: number;
  };

export type CategoryType = {
  id: number;
  name: string;
};

export type PartnerState = 
  {
    id: number|string,
    name: string,
    totalSale: number,
  };

export type WarehouseState = 
  {
    id: number|string,
    managerId: number|string,
    manager: null,
    address: string,
    status: boolean,
    inventories: null
  };

  export type GoodReceiptDataType = {
    id: String|Number,
    exportDate: String|Date,
    partnerID: String|Number,
    receiptStatus: String|Number,
    listGoodReciptDetailsModel: GoodsReceiptDetails[]|null,
  };