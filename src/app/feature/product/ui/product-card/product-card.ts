import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../data/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
  }
})
export class ProductCard {
  readonly product = input.required<Product>()
}
