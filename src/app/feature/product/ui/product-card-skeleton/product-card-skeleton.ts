import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-product-card-skeleton',
  imports: [SkeletonModule],
  templateUrl: './product-card-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white'
  }
})
export class ProductCardSkeleton { }
