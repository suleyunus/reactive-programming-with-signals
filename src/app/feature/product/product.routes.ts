import { Routes } from '@angular/router';

import { ProductClient } from './data/product-client';

export default <Routes>[
  {
    path: '',
    providers: [ProductClient],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./product-list/product-list').then(
            (c) => c.ProductList,
          ),
      },
    ],
  },
];
