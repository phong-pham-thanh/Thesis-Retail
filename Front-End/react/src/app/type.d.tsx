import { WarehouseType } from "../pages/warehouse/WarehousePage";

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
  imgPath?: string;
  barcode?: string;
  listInventories?:
      {
        "id": number,
        "productId": number,
        "wareHouseId": number,
        "quantity": number
      }[],
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
  id: string;
  name: string;
  phoneNumber: string;
};

export type CustomerListState = CustomerState[];

export type CategoryType = {
  id: string;
  name: string;
};

export type PartnerState = {
  id: number | string;
  name: string;
  totalSale: number;
  phoneNumber: string;
};

export type WarehouseState = {
  id: number | string;
  managerId: number | string;
  manager: null;
  address: string;
  status: boolean;
  inventories: null;
};

export type GoodsReceipt = {
  id: string;
  importDate?: string;
  exportDate?: string;
  partnerId?: string;
  customerId?: string;
  receiptStatus?: number;
  exportStatus?: number;
  ListGoodReciptDetailsModel?: [];
  listGoodExportDetailModels?: [];
  wareHouseId: string;
};

export type ListGoodReciptDetailsModel = {
  id: number;
  goodReceiptId?: number;
  goodExportId?: number;
  goodsReceipt?: null;
  goodExport?: null;
  productId: number;
  product?: {
    id?: number;
    name?: string;
    categoryId?: number;
    category?: CategoryType;
    description?: string;
    status?: boolean;
    listInventories?: null;
    currentPrice?: null;
  } | null;
  priceUnit?: number;
  quantity: number;
};

export type GoodImportReceiptDetailDataType = {
  id: number;
  importDate: string;
  partnerID: number;
  partner?: PartnerState;
  receiptStatus: number;
  totalAmount?: number | null;
  listGoodReciptDetailsModel: ListGoodReciptDetailsModel[];
  wareHouseId: string;
  wareHouse?: WarehouseState;
  createdBy?:{
    name: string;
  };
  acceptedBy?:{
    name: string;
  };
};

export type GoodExportReceiptDetailDataType = {
  id: number;
  exportDate: string;
  customerId: number;
  customer?: CustomerState;
  exportStatus: number;
  totalAmount?: number | null;
  listGoodExportDetailsModel?: ListGoodReciptDetailsModel[];
  listGoodExportDetailModels?: ListGoodReciptDetailsModel[];
  wareHouseId: string;
  wareHouse?: WarehouseState;
  createdBy?:{
    name: string;
  };
  acceptedBy?:{
    name: string;
  };
};

type UserWarehouseType = {
  id: number;
  userId: number;
  wareHouseId: number;
  userModel: StaffState;
  wareHouseModel: WarehouseType;
};

export type StaffState = {
  id: number;
  name: string;
  username: string;
  password: string;
  branch: string;
  address: string;
  dateOnboard: Date;
  dateOfBirth?: Date | null;
  age: number;
  isAdmin?: boolean | null;
  defaultWareHouseId?: number | null;
  defaultWareHouse?: WarehouseType | null;
  listUserWareHouse?: UserWarehouseType[];
};
