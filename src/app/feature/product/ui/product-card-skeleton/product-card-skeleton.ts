import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-product-card-skeleton',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './product-card-skeleton.html',
  host: {
    class: 'group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
  }
})
export class ProductCardSkeleton { }
