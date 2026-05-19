import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../data/product';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  host: {
    class: 'group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
  }
})
export class ProductCard {
  @Input({ required: true }) product: Product | undefined = undefined;
}
