import { Component, OnInit } from '@angular/core';
import { ArtCurrentStatusService } from '../../services/art-current-status.service';
import { ArtCurrentStatus } from '../../models/art-current-status';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-art-current-status',
  templateUrl: './art-current-status.component.html',
  styleUrls: ['./art-current-status.component.css']
})
export class ArtCurrentStatusComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // Assign Highcharts to the component
  chartOptions: Highcharts.Options = {}; // Initialize chart options

  constructor(private artCurrentStatusService: ArtCurrentStatusService) {}

  ngOnInit(): void {
    this.artCurrentStatusService.getArtStatusOverTime().subscribe((data: any[]) => {
      this.processChartData(data);
      Highcharts.chart('container1', this.chartOptions);
    }, (error) => {
      console.error("Error fetching data:", error); // Handle errors
    });
  }

  ngAfterViewInit(): void {
    Highcharts.chart('container1', this.chartOptions);
    console.log('Chart should be rendered now.');
  }

  processChartData(data: any[]): void {
    // Filter out invalid dates and incorrect years
    const validData = data.filter(item => {
      const date = new Date(item.visitDate);
      const year = date.getFullYear();
      return !isNaN(date.getTime()) && year >= 2006; // Keep dates from 2006 and beyond
    });
  
    // Group dates by year
    const years = validData.map(item => {
      const date = new Date(item.visitDate);
      const year = date.getFullYear();
      return year;
    });
  
    // Handle incorrectly formatted years starting with '000'
    validData.forEach(item => {
      const date = new Date(item.visitDate);
      const year = date.getFullYear();
      if (year < 1000) {
        date.setFullYear(2000 + year % 100); // Correct the year
      }
      item.visitDate = date.toISOString().split('T')[0]; // Update the visitDate
    });
  
    // Group the data by 'arvStatus'
    const groupedData: { [key: string]: { [year: number]: number } } = {};
  
    validData.forEach(item => {
      if (!groupedData[item.arvStatus]) {
        groupedData[item.arvStatus] = {};
      }
  
      const year = new Date(item.visitDate).getFullYear();
      if (!groupedData[item.arvStatus][year]) {
        groupedData[item.arvStatus][year] = 0;
      }
      groupedData[item.arvStatus][year] += item.count;
    });
  
    // Update Highcharts options
    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'ART Status Over Time'
      },
      xAxis: {
        categories: Array.from(new Set(years)).map(String) // Unique years as strings
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },
      series: Object.keys(groupedData).map(status => ({
        name: status,
        type: 'line',
        data: Array.from(new Set(years)).map(year => groupedData[status][year] || 0) // Grouped counts per year
      }))
    };
  
    // Log for debugging
    console.log("Chart options:", this.chartOptions);
  }
    
}
