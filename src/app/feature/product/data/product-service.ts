import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsResponse } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = `https://dummyjson.com`;

  constructor(private readonly http: HttpClient) { }

  findProducts({ skip = 0, limit = 30 }: { skip?: number, limit?: number } = {}) {
    return this.http.get<ProductsResponse>(`${this.baseUrl}/products?limit=${limit}&skip=${skip}`)
  }
}
