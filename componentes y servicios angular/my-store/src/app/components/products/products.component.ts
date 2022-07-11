import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../servises/store.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  // myShoppingCart: Product[] = [];
  total = 0;
  myShoppingCart: Product[] = [];
  products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpeg',
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpeg',
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpeg',
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpeg',
    },
  ];

  constructor(
    private storeService: StoreService
    ) {
      this.myShoppingCart = this.storeService.getShoppingCart();
    }

  ngOnInit(): void {}

   onAddToShoppingCart(product: Product) {
    //  this.myShoppingCart.push(product);
     this.storeService.addProduct(product)
     this.total = this.storeService.getTotal();
  }

}
