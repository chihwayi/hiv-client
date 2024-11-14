import { Component, OnInit } from '@angular/core';
import { ArtInitiationService } from '../../../services/art-initiation.service';
import { ArtInitiationFacility } from '../../../models/art-initiation-facility';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-art-initiation-demographics-facility',
  templateUrl: './art-initiation-demographics-facility.component.html',
  styleUrls: ['./art-initiation-demographics-facility.component.css']
})
export class ArtInitiationDemographicsFacilityComponent implements OnInit {
  public chartOptions: any;
  public Highcharts = Highcharts;

  constructor(private artInitiationService: ArtInitiationService) {}

  ngOnInit() {
    this.artInitiationService.getArtInitiationFacilityData().subscribe(data => {
      const chartData = this.transformData(data);
      this.initializeChart(chartData);
    });
  }

  initializeChart(chartData: any) {
    const { years, series } = chartData;

    this.chartOptions = {
      chart: {
        type: 'line', // Line chart type
        zoomType: 'xy'
      },
      title: {
        text: 'ART Initiation Demographics by Province'
      },
      xAxis: {
        categories: years, // Years on the X-axis
        title: {
          text: 'Year of Enrollment'
        }
      },
      yAxis: {
        title: {
          text: 'Number of Patients'
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        pointFormat: '<span style="color:{point.color}">{point.series.name}: <b>{point.y}</b><br/>'
      },
      series: series // Use the transformed series directly
    };

    Highcharts.chart('container3', this.chartOptions);
  }

  transformData(data: ArtInitiationFacility[]) {
    const filteredData = data.filter(item => (item.yearEnrolled ?? 0) >= 2006);
    const years = Array.from(new Set(filteredData.map(item => item.yearEnrolled ?? 0))).sort();
    const provinces = Array.from(new Set(filteredData.map(item => item.provinceName))).filter(Boolean); // Filter out any undefined values
    const series: Array<{ name: string, data: number[] }> = [];

    provinces.forEach(province => {
      const provinceData: number[] = [];

      years.forEach(year => {
        // Count total patients for this province in the given year
        const yearData = filteredData.filter(item => item.yearEnrolled === year && item.provinceName === province);
        const totalPatients = yearData.length; // Total count of patients
        provinceData.push(totalPatients);
      });

      // Add data for the province with a fallback for undefined names
      series.push({
        name: province || '', // Use an empty string if province is undefined
        data: provinceData
      });
    });

    console.log({ years, series }); // Check data structure here
    return { years, series };
  }
}
