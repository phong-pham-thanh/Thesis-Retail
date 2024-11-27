export class DateParam{
    startDate: Date;
    endDate: Date;
}

export class GoodNoteAnalyse{
    productId: number;
    productName: string;
    quantity: number;
    precentage: number;
}

export class BillMonthAnalyse{
    month: number;
    year: number;
    totalAmount: number;
    wareHouseId: number;
    wareHouseName: number;
}

export class PriceProductAnalyse{
    day: number;
    month: number;
    year: number;
    price: number;
}