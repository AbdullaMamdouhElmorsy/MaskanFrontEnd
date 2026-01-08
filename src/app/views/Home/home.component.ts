import {Component, OnInit} from '@angular/core'
import { GlobalService } from 'src/app/Global/Services/global.service';

@Component({
    selector:'maskan-home',
    templateUrl:'./home.component.html',

})

export class HomeComponent implements OnInit{

  uniteChart:any=null;
  constructor(
    private globalService:GlobalService
  )
  {}
  uniteChartPieData:any;
  // chartPieData = {
  //   labels: ['Red', 'Green', 'Yellow'],
  //   datasets: [
  //     {
  //       data: [this.uniteChart?.occupiedUnites, 50, 100],
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //       hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  //     }
  //   ]
  // };
  complainChartPieData:any;
  complainCharts:any=null;
  chartLineOptions = {
    maintainAspectRatio: false,
  };
  // chartDoughnutData = {
  //   labels: ['VueJs', 'EmberJs', 'ReactJs', 'Angular'],
  //   datasets: [
  //     {
  //       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
  //       data: [40, 20, 80, 10]
  //     }
  //   ]
  // };
  
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    getUniteChart()
    {
      this.globalService.get_Analisis("Unite").subscribe(
        res=>this.uniteChart=res,
        error=>console.log(error),
        ()=>{
          let lables:string[]=[];
          if(this.globalService.lang=="en")
            lables=['Occupied Unites', 'Not Occupied Unites'];
          else
          lables=['وحدات مشغوله', 'وحدات غير مشغوله' ];
        this.uniteChartPieData= {
          labels: lables,
            datasets: [
              {
                data: [this.uniteChart?.occupiedUnites,this.uniteChart.notOccupiedUnites,],
                backgroundColor: ['#FFCE56','#36A2EB', '#36A2EB'] ,
                hoverBackgroundColor: ['#FFCE56','#36A2EB', '#36A2EB', ]
              }
            ]
          };
        }
        
        )
    }
    getComplainChart()
    {
        

      this.globalService.get_Analisis("Complain").subscribe(
        res=>this.complainCharts=res,
        error=>console.log(error),
        ()=>{
          console.log(this.globalService.get_ComplainStatus().map(s=>s.label),"staus");
          this.complainChartPieData = {
            labels: this.globalService.get_ComplainStatus().map(s=>s.label),
            datasets: [
              {
                //'#DD1B16'
                backgroundColor: ['#E46651','#FFCE56', '#32CD32'],
                data: [this.complainCharts.waitingCount , this.complainCharts.inProgressCount, this.complainCharts.solvedCount]
              }
            ]
          };
        }
        
        )


     
    }
    
  
    get randomData() {
      return Math.round(Math.random() * 100);
    }
  
    ngOnInit(): void {
        this.getUniteChart();
        this.getComplainChart();
    } 
}