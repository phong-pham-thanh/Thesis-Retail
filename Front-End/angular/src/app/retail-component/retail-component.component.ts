import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from './product.service';
import { assetUrl } from "../../single-spa/asset-url";
import { BillDetails } from '../model/billDetail.model';
import { Bill } from '../model/bill.model';
const imageUrl = assetUrl("images/Cocacola.png");

@Component({
  selector: 'app-retail-component',
  templateUrl: './retail-component.component.html',
  styleUrls: ['./retail-component.component.scss']
})


export class RetailComponentComponent implements OnInit {

  imageUrl = imageUrl;
  allProduct: Product[] = [];
  allBillDetails: BillDetails[] = [];
  currentBill: Bill;
  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.productService.getAllProduct().subscribe(
      (data: Product[]) => {
        this.allProduct = data;
        console.log(this.allProduct)
      },
      (error) => {
        console.error('There was an error fetching the products!', error);
      }
    );

    this.currentBill = {
      id: -1,
      createdDate: new Date(),
      customerId: -1,
      billDetails: [],
    }

  }

  addProductToBill(item: Product){
    
    if(this.currentBill && this.currentBill.billDetails && this.currentBill.billDetails.find(de => de.product.id === item.id) != null){
      let currentProductDetail: BillDetails = this.currentBill.billDetails.find(de => de.product.id === item.id)
      currentProductDetail.quantity += 1;
      return;
    }

    const newBillDetail: BillDetails = {
      product: item,
      quantity: 1,
    }
    this.currentBill.billDetails?.push(newBillDetail);
  }
  
  changeQuantity(item: BillDetails, isPlus: boolean){
    if(!this.currentBill) return;
    if(isPlus){
      item.quantity += 1;
    }
    else if(!isPlus && item.quantity > 1){

      item.quantity -= 1;
    }
  }

  removeItem(item: BillDetails){
    this.currentBill.billDetails = this.currentBill.billDetails.filter(bi => bi.product?.id !== item.product?.id);
  }
}