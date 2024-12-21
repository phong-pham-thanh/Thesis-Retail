import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateParam, GoodNoteAnalyse } from '../../model/analyse.model';
import { UtilitiesService } from '../../common/utilities.service';
import { AnalyseService } from '../../services/analyse.service';

@Component({
  selector: 'app-analyse-top-product-sale',
  templateUrl: './analyse-top-product-sale.component.html',
  styleUrls: ['./analyse-top-product-sale.component.scss']
})
export class AnalyseTopProductSaleComponent {
  products = [
    { name: 'Sản phẩm A', sold: 150 },
    { name: 'Sản phẩm B', sold: 80 },
    { name: 'Sản phẩm C', sold: 200 }
  ];
  startDate: Date;
  endDate: Date;
  topSale: number = -1;
  result: string | null = null;
  currentRange: DateParam;
  currentData: GoodNoteAnalyse[] = [];


  constructor(private analyseService: AnalyseService) { }

  ngOnInit() {
    this.currentRange = new DateParam();
    this.topSale = null;
    this.getDataAnalyse();
  }

  onDateRangeChange(event: MatDatepickerInputEvent<moment.Moment>) {
    const selectedDate: Date = event.value ? event.value.toDate() : null;
    const dateRange = new DateParam();
    if (event.targetElement?.getAttribute('matStartDate') !== null) {
      this.startDate = selectedDate;
    } else if (event.targetElement?.getAttribute('matEndDate') !== null) {
      this.endDate = selectedDate;
    }
    dateRange.startDate = this.startDate;
    dateRange.endDate = this.endDate;
    this.currentRange = UtilitiesService.cloneDeep(dateRange);
  }

  getDataAnalyse() {
    this.analyseService.getTopSale(this.currentRange, this.topSale).subscribe((data: GoodNoteAnalyse[]) => {
      this.currentData = UtilitiesService.cloneDeep(data);
    });

  }


}
