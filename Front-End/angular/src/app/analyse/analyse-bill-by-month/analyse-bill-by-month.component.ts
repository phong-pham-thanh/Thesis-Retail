import { Component, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AnalyseService } from '../../services/analyse.service';
import { BillMonthAnalyse, DateParam, GoodNoteAnalyse } from '../../model/analyse.model';
import { UtilitiesService } from '../../common/utilities.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import zoomPlugin from 'chartjs-plugin-zoom'; // Import zoom plugin

Chart.register(zoomPlugin);
@Component({
  selector: 'app-analyse-bill-by-month',
  templateUrl: './analyse-bill-by-month.component.html',
  styleUrls: ['./analyse-bill-by-month.component.scss']
})
export class AnalyseBillByMonthComponent {

  canvas: any;
  ctx: any;
  chart: any;
  zoomLevel = 1;

  @ViewChild('mychart') mychart: any;

  constructor(private analyseService: AnalyseService) {

  }
  ngAfterViewInit() {
    const dateRange = new DateParam();
    this.analyseService.getBillByMonth(dateRange).subscribe((data: BillMonthAnalyse[]) => {


      const listWareHouseId = [...new Set(data.map(item => item.wareHouseId))];


      var datasetAnalyse: any[] = [];
      listWareHouseId.forEach(wid => {
        let currentInfoAnalyse: BillMonthAnalyse[] = UtilitiesService.cloneDeep(data.filter(x => x.wareHouseId === wid));
        if(currentInfoAnalyse.length > 0){
          var newDataSetItem = {
            label: currentInfoAnalyse[0].wareHouseName,
            fill: false,
            barThickness: 10,
            data: currentInfoAnalyse.map(infoW => {
              return {
                x: new Date(Number(infoW.year), Number(infoW.month) - 1),
                y: infoW.totalAmount
              }
            })
          }
        }
        datasetAnalyse.push(newDataSetItem);
      });
      console.log(datasetAnalyse)
      this.canvas = this.mychart.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      this.chart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          datasets: datasetAnalyse,
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              position: 'bottom',
              time: {
                unit: 'month',
                tooltipFormat: 'MM yyyy',
                displayFormats: {
                  month: 'MM - YYYY',
                }
              },
              ticks: {
                callback: function (tick) {
                  const dateTick = new Date(tick);
                  if (dateTick instanceof Date) {
                    const month = dateTick.getMonth() + 1;
                    const year = dateTick.getFullYear();
                    return `${month.toString().padStart(2, '0')} - ${year}`;
                  }
                  return tick;
                },
                stepSize: 2
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
                text: 'Tổng tiền bán'
              }
            }
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
                threshold: 10,
              },
              zoom: {
                mode: 'x',
                wheel: {
                  enabled: true,
                },
              }
            }
          },
        elements: {
          bar: {
            borderWidth: 2,
          }
        }
        }
      });
    });




  }
}
