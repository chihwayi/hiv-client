import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ArtInitiationService } from '../../../services/art-initiation.service';
import { ArtInitiationDemographics } from '../../../models/art-initiation-demographics';
import { ArtInitiationDemographicEntry } from '../../../models/art-initiation-demographic-entry';
import * as Highcharts from 'highcharts';
import HC_heatmap from 'highcharts/modules/heatmap';
import HC_exporting from 'highcharts/modules/exporting';

HC_heatmap(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-art-initiation-demographics',
  templateUrl: './art-initiation-demographics.component.html',
  styleUrls: ['./art-initiation-demographics.component.css']
})
export class ArtInitiationDemographicsComponent implements OnInit, AfterViewInit {
  

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor(private artInitiationService: ArtInitiationService) { }

  ngOnInit(): void {
    this.artInitiationService.getArtInitiationDemographics().subscribe((data: ArtInitiationDemographics) => {
      this.loadChartData(data);
      Highcharts.chart('container2', this.chartOptions);
    }, (error) => {
      console.error("Error fetching data:", error); // Handle errors
    });
    
  }

  ngAfterViewInit(): void {
    Highcharts.chart('container2', this.chartOptions);
  }
  
  loadChartData(data: ArtInitiationDemographics): void {
      const ageGroups = ['0-14', '15-24', '25-49', '50+'];
      
      const maleData = [
        data.ageGroup_0_14.filter((item: ArtInitiationDemographicEntry) => item.sex === 'MALE').length,
        data.ageGroup_15_24.filter((item: ArtInitiationDemographicEntry) => item.sex === 'MALE').length,
        data.ageGroup_25_49.filter((item: ArtInitiationDemographicEntry) => item.sex === 'MALE').length,
        data.ageGroup_50_plus.filter((item: ArtInitiationDemographicEntry) => item.sex === 'MALE').length
      ];

      const femaleData = [
        data.ageGroup_0_14.filter((item: ArtInitiationDemographicEntry) => item.sex === 'FEMALE').length,
        data.ageGroup_15_24.filter((item: ArtInitiationDemographicEntry) => item.sex === 'FEMALE').length,
        data.ageGroup_25_49.filter((item: ArtInitiationDemographicEntry) => item.sex === 'FEMALE').length,
        data.ageGroup_50_plus.filter((item: ArtInitiationDemographicEntry) => item.sex === 'FEMALE').length
      ];

      console.log("here is your data :", data)

      this.chartOptions = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'ART Initiations by Age Group and Gender'
        },
        xAxis: {
          categories: ageGroups,
          title: {
            text: 'Age Group'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Count of ART Initiations',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        legend: {
          reversed: true
        },
        tooltip: {
          valueSuffix: ' initiations'
        },
        series: [
          {
            name: 'Male',
            data: maleData,
            type: 'bar',
            color: '#4a90e2' // Blue color for male
          },
          {
            name: 'Female',
            data: femaleData,
            type: 'bar',
            color: '#e94e77' // Pink color for female
          }
        ]
      };
  }
}
