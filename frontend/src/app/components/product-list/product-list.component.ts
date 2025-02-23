import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  categories: string[] = ['Electronics', 'Clothing', 'Books', 'Home'];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        this.filterProducts();
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedCategory
          ? product.category === this.selectedCategory
          : true)
    );
    this.totalPages = Math.ceil(
      this.filteredProducts.length / this.itemsPerPage
    );
    this.currentPage = 1;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert('Product added to cart!');
  }
}
