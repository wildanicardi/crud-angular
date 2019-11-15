import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import Product from "../Product";
import { ProductsService } from "../products.service";

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css']
})
export class ProductChartComponent implements OnInit {
  products: Product[];
  productname = [];
  productprice = [];
  chart = [];
  constructor(private ps: ProductsService) { }

  ngOnInit() {
    this.ps.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.products.forEach(y => {
        this.productname.push(y.ProductName);
        this.productprice.push(y.ProductPrice);
      });
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.productname,
          datasets: [
            {
              data: this.productprice,
              borderColor: '#3cba9f',
              fill: false,
              backgroundColor: "#ff6384",
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }
}
