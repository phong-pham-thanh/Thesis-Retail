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
  allProductInBill: Product[] = [];
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
  }

  addProductToBill(item: Product){
    this.allProductInBill.push(item);
  }
}