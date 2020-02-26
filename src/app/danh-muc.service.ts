import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DanhMucService {

  constructor(private httpClient: HttpClient) {
  }

  getCategory(): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8080/products`);
  }

  addCategory(name: string, gia: number, loai: string, description: string): Observable<any> {
    const category = {
      name,
      gia,
      loai,
      description
    };
    return this.httpClient.post<any>(`http://localhost:8080/products`, category);
  }

  deleteCategory(id): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:8080/delete-products/` + id);
  }

  editCategory(name: string, gia: number, loai: string, description: string, id: number): Observable<any> {
    const category = {
      name,
      gia,
      loai,
      description,
      id
    };
    return this.httpClient.put<any>(`http://localhost:8080/products/` + id, category);
  }

  findById(id): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/products/` + id);
  }

  findAllByNameContains(category: string): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8080/' + '/findAllByNameContains?products=' + category);
  }
}
