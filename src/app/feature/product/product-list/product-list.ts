import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { DataViewModule, DataViewPageEvent } from 'primeng/dataview';
import { MessageModule } from 'primeng/message';
import { ProductService } from '../data/product-service';
import { ProductCard } from "../ui/product-card/product-card";
import { MessageService } from 'primeng/api';
import { ProductCardSkeleton } from "../ui/product-card-skeleton/product-card-skeleton";
import { ButtonModule } from 'primeng/button';
import { Error } from "../../shared-ui/error/error";

@Component({
  standalone: true,
  imports: [
    ButtonModule,
    DataViewModule,
    MessageModule,
    ProductCard,
    ProductCardSkeleton,
    Error,
  ],
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList {
  private readonly messageService = inject(MessageService)
  private readonly productService = inject(ProductService)

  protected readonly skip = signal(0)
  protected readonly limit = signal(30)
  protected readonly productsResource = this.productService.findProducts({ skip: this.skip, limit: this.limit })
  protected readonly isLoading = this.productsResource.isLoading
  protected readonly error = this.productsResource.error

  constructor() {
    effect(() => {
      if (this.error()) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an error fetching products' });
      }
    })
  }

  onPage(event: DataViewPageEvent) {
    this.skip.set(event.first)
    this.limit.set(event.rows)
  }

  retry() {
    this.productsResource.reload()
  }
}