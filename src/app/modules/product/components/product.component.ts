import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../../../global/entities/product.interface';
import {CartService} from '../../cart/service/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {



  public product!: Product;
  public count: number = 1;
  public selectedTab: string = 'Опис'

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
  ) {
  }

  ngOnInit() {
    this.productService.getProductFromCategoryById().subscribe(product => {
      this.product = product;

      this.cartService.cartList$.subscribe((cartList) => {
        this.product.count = this.cartService.isProductInCart(cartList, this.product.id)
        this.product.in_cart = !!this.cartService.isProductInCart(cartList, this.product.id)
        this.count = this.product.count || 1
      });
    })

  }

  ngOnDestroy() {
    this.productService.reset()
  }

  plus() {
    this.count = this.count < 1000 ? this.count + 1 : this.count;
    this.product.count = this.count
    this.toggleProductInCart();
  }

  minus() {
    this.count = this.count > 1 ? this.count - 1 : this.count;
    this.product.count = this.count
    this.toggleProductInCart();
  }

  countValueValidator() {
    if (this.count < 1) {
      this.count = 1;
      return;
    }

    if (this.count > 999) {
      this.count = 999;
    }

    this.product.count = this.count

    this.toggleProductInCart();
  }

  private toggleProductInCart() {
    if (this.product.in_cart) {
      this.cartService.modifyCart(this.product, 'edit', this.count);
    }
  }

  public toggleTab(tab: string) {
    this.selectedTab = tab
  }
}
