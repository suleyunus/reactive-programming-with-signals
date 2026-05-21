import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataViewModule, DataViewPageEvent } from 'primeng/dataview';
import { MessageModule } from 'primeng/message';
import { ProductService } from '../data/product-service';
import { ProductCard } from '../ui/product-card/product-card';
import { MessageService } from 'primeng/api';
import { ProductCardSkeleton } from '../ui/product-card-skeleton/product-card-skeleton';
import { ButtonModule } from 'primeng/button';
import { Error } from '../../shared-ui/error/error';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  of
} from 'rxjs';

import {
  catchError,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
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
  private readonly messageService = inject(MessageService);
  private readonly productService = inject(ProductService);

  protected readonly skip$ = new BehaviorSubject(0);
  protected readonly limit$ = new BehaviorSubject(30);

  private readonly retry$ = new Subject<void>();

  protected readonly vm$ = combineLatest([
    this.skip$,
    this.limit$,
    this.retry$.pipe(startWith(void 0))
  ]).pipe(
    switchMap(([skip, limit]) =>
      this.productService.findProducts({ skip, limit }).pipe(
        map((products) => ({
          status: 'resolved' as const,
          products,
          error: null
        })),
        startWith({
          status: 'loading' as const,
          products: null,
          error: null
        }),
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'There was an error fetching products'
          });

          return of({
            status: 'error' as const,
            products: null,
            error
          });
        })
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  onPage(event: DataViewPageEvent) {
    this.skip$.next(event.first);
    this.limit$.next(event.rows);
  }

  retry() {
    this.retry$.next();
  }
}