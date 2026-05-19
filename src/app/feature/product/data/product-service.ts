import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { defaultProductsResponse, ProductsResponse } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = `https://dummyjson.com`;

  findProducts({ skip, limit }: { skip: Signal<number>, limit: Signal<number> }) {
    return httpResource<ProductsResponse>(() => ({
      url: `${this.baseUrl}/products`,
      params: {
        limit: limit(),
        skip: skip(),
      }
    }),
      {
        defaultValue: defaultProductsResponse,
      }
    )
  }
}
