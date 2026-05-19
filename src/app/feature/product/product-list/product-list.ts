import { Component, OnInit } from '@angular/core';
import { DataViewModule, DataViewPageEvent } from 'primeng/dataview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { Product } from '../data/product';
import { ProductClient } from '../data/product-client';
import { CommonModule } from '@angular/common';
import { ProductCard } from "../ui/product-card/product-card";
import { MessageService } from 'primeng/api';
import { ProductCardSkeleton } from "../ui/product-card-skeleton/product-card-skeleton";
import { ButtonModule } from 'primeng/button';
import { Error } from "../../shared-ui/error/error";

@Component({
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    DataViewModule,
    ProgressSpinnerModule,
    MessageModule,
    ProductCard,
    ProductCardSkeleton,
    Error
  ],
  selector: 'app-product-list',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;

  skip = 0
  limit = 30
  totalProducts = 0;

  constructor(private readonly productClient: ProductClient, private readonly messageService: MessageService) { }

  ngOnInit() {
    this.findProducts({ first: this.skip, rows: this.limit })
  }

  findProducts(event: DataViewPageEvent) {
    this.skip = event.first
    this.limit = event.rows

    this.loading = true;

    this.productClient.findProducts({ skip: this.skip, limit: this.limit })
      .subscribe({
        next: (response) => {
          this.products = response.products;
          this.totalProducts = response.total;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load products';
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load products' });
        }
      });
  }

  retry() {
    this.findProducts({ first: this.skip, rows: this.limit });
  }
}