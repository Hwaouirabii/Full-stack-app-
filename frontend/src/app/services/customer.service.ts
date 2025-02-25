

  import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Customer } from '../models/customer.model';
  import { Observable, catchError, of, retry } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class CustomerService {
    // List of backend URLs for load balancing
    private backendUrls = [
      'http://localhost:5001/api/customers',
      'http://localhost:5002/api/customers',
      'http://localhost:5003/api/customers',
    ];

    constructor(private http: HttpClient) {}

    // Helper method to get a random backend URL
    private getRandomBackendUrl(): string {
      const randomIndex = Math.floor(Math.random() * this.backendUrls.length);
      return this.backendUrls[randomIndex];
    }

    // Get all customers
    get(): Observable<Customer[]> {
      const url = this.getRandomBackendUrl();
      return this.http.get<Customer[]>(url).pipe(
        retry(2), // Retry the request up to 2 times if it fails
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching customers:', error.message);
          return of([]); // Return an empty array if the request fails
        })
      );
    }

    // Get a customer by ID
    getById(id: string): Observable<Customer> {
      const baseUrl = this.getRandomBackendUrl();
      const url = `${baseUrl}/${id}`;
      return this.http.get<Customer>(url).pipe(
        retry(2), // Retry the request up to 2 times if it fails
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching customer:', error.message);
          return of({} as Customer); // Return an empty object if the request fails
        })
      );
    }

    // Create a new customer
    post(customer: Customer): Observable<Customer> {
      const url = this.getRandomBackendUrl();
      return this.http.post<Customer>(url, customer).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error creating customer:', error.message);
          return of({} as Customer); // Return an empty object if the request fails
        })
      );
    }

    // Update a customer by ID
    put(id: string, customer: Customer): Observable<Customer> {
      const baseUrl = this.getRandomBackendUrl();
      const url = `${baseUrl}/${id}`;
      return this.http.put<Customer>(url, customer).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error updating customer:', error.message);
          return of({} as Customer); // Return an empty object if the request fails
        })
      );
    }

    // Delete a customer by ID
    delete(id: string): Observable<Customer> {
      const baseUrl = this.getRandomBackendUrl();
      const url = `${baseUrl}/${id}`;
      return this.http.delete<Customer>(url).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error deleting customer:', error.message);
          return of({} as Customer); // Return an empty object if the request fails
        })
      );
    }
  }