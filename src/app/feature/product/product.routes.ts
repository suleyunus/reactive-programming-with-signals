import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
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
