import { Component, ViewChild } from '@angular/core';
import { AnalyseService } from '../../services/analyse.service';
import { DateParam, PriceProductAnalyse } from '../../model/analyse.model';
import { Chart } from 'chart.js';
import { Product } from '../../model/product.model';
import { State } from '../../product-state/product.state';
import { Store, select } from '@ngrx/store';

import * as productActions from '../../product-state/product.actions';
import * as productSelector from '../../product-state/product.reducer';
import { filter, map, mergeMap, take } from 'rxjs';
import { UtilitiesService } from '../../common/utilities.service';
@Component({
  selector: 'app-analyse-price-product',
  templateUrl: './analyse-price-product.component.html',
  styleUrls: ['./analyse-price-product.component.scss']
})
export class AnalysePriceProductComponent {
  canvas: any;
  ctx: any;
  chart: Chart;
  zoomLevel = 1;
  allProducts: Product[] = [];
  productSelectedId: number;
  stepSize: number;

  @ViewChild('mychart') mychart: any;

  constructor(private analyseService: AnalyseService, protected store: Store<State>,) {
    this.store.dispatch(new productActions.LoadAllProduct());

    this.store.pipe(select(productSelector.getIsLoaded),
      filter(loaded => loaded === true),
      mergeMap(_ =>
        this.store.pipe(select(productSelector.getAllProduct),
          map(result => {
            this.allProducts = result.filter(pro => pro.currentPrice);
          }))
      ), take(1)
    ).subscribe();
  }

  changeStepSize(){
    if(!UtilitiesService.isNullOrEmpty(this.chart)){
      this.chart.options.scales['x'].ticks.maxTicksLimit = this.stepSize;
      this.chart.update();
    }
  }

  onProductSelectedChange(id: number) {
    this.analyseService.getPriceProductAnalyse(id).subscribe((result: PriceProductAnalyse[]) => {
      var datasetAnalyse: any[] = [];
      if (result.length > 0) {
        var newDataSetItem = {
          label: this.allProducts.find(x => x.id === id).name,
          fill: false,
          data: result.map(r => {
            return {
              x: new Date(Number(r.year), Number(r.month) - 1, Number(r.day)),
              y: r.price
            }
          })
        }
        datasetAnalyse.push(newDataSetItem);
      }
      this.chart.data.datasets = datasetAnalyse;
      this.chart.update();
    })
  }



  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: [],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            position: 'bottom',
            time: {
              unit: 'day',
              tooltipFormat: 'dd-MM-yyyy',
              displayFormats: {
                day: 'dd - MM - YYYY',
              }
            },
            ticks: {
              callback: function (tick) {
                const dateTick = new Date(tick);
                if (dateTick instanceof Date) {
                  const day = dateTick.getDate();
                  const month = dateTick.getMonth() + 1;
                  const year = dateTick.getFullYear();
                  return `${day.toString().padStart(2, '0')} - ${month.toString().padStart(2, '0')} - ${year}`;
                }
                return tick;
              },
              stepSize: 1
            },
            title: {
              display: true,
              text: 'Thời gian'
            }
          },
          y: {
            type: 'linear',
            ticks: {
              callback: function (tick) {
                return new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  minimumFractionDigits: 0,
                }).format(tick as number);
              }
            },
            title: {
              display: true,
              text: 'Giá sản phẩm'
            }
          }
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
              threshold: 10,
            },
            zoom: {
              mode: 'xy',
              wheel: {
                enabled: true,
              },
            }
          }
        },
        elements: {
          point: {
            radius: 8,
            hoverRadius: 12,
            pointStyle: 'circle'
          }
        }
      }
    });
  }
}
