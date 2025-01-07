
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpOptions } from '../interfaces/http-params.interface';
import { environment } from '../../environments/environment';
import { ApiError, ApiResponse } from '../interfaces/api-response.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
     * Get request to fetch data from an endpoint.
     * @param endpoint The API endpoint (e.g., 'users/profile').
     * @param options Optional query parameters.
     * @returns Observable of the API response.
     */
  get<T>(endpoint: string, options?: HttpOptions): Observable<any> {
    return this.http
      .get<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, {
        params: options?.params as { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
      })
      .pipe(catchError(this.handleError));
  }
  /**
     * Post request to send data to an endpoint.
     * @param endpoint The API endpoint (e.g., 'users/login').
     * @param data The data to be sent in the request body.
     * @param options Optional query parameters.
     * @returns Observable of the API response.
     */
  post<T>(endpoint: string, data: any, options?: HttpOptions): Observable<any> {
    return this.http
      .post<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, data, {
        params: options?.params as { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
      })
      .pipe(catchError(this.handleError));
  }
  /**
   * Post request to send form data to an endpoint.
   * @param endpoint The API endpoint (e.g., 'leave/create-leave-request').
   * @param formDataObject The form data to be sent.
   * @param options Optional query parameters.
   * @returns Observable of the API response.
   */
  postWithFormData<T>(endpoint: string, formDataObject: Record<string, any>, options?: HttpOptions): Observable<any> {
    const formData = new FormData();

    for (const key in formDataObject) {
      if (formDataObject.hasOwnProperty(key)) {
        const value = formDataObject[key];

        if (value instanceof File || value instanceof Blob) {
          formData.append(key, value, value instanceof File ? value.name : undefined);
        } else {
          formData.append(key, value);
        }
      }
    }

    return this.http
      .post<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, formData, {
        params: options?.params as { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
      })
      .pipe(catchError(this.handleError));
  }
  /**
   * Put request to update data at an endpoint.
   * @param endpoint The API endpoint (e.g., 'users/123').
   * @param data The data to be sent in the request body.
   * @param options Optional query parameters and headers.
   * @returns Observable of the API response.
   */
  put<T>(endpoint: string, data: any, options?: HttpOptions): Observable<any> {
    return this.http
      .put<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, data, {
        params: options?.params as { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
      })
      .pipe(catchError(this.handleError));
  }
  /**
   * Delete request to remove data at an endpoint.
   * @param endpoint The API endpoint (e.g., 'users/123').
   * @param options Optional query parameters and headers.
   * @returns Observable of the API response.
   */
  delete<T>(endpoint: string, options?: HttpOptions): Observable<any> {
    return this.http
      .delete<ApiResponse<T>>(`${this.apiUrl}/${endpoint}`, {
        params: options?.params as { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
      })
      .pipe(catchError(this.handleError));
  }
  /**
   * Download a file from an endpoint.
   * @param endpoint The API endpoint (e.g., 'files/123').
   * @param options Optional query parameters and headers.
   * @returns Observable of the file as a Blob.
   */
  downloadFile(endpoint: string, options?: HttpOptions): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${endpoint}`, {
        responseType: 'blob',
        params: options?.params as { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Upload a file to an endpoint.
   * @param endpoint The API endpoint (e.g., 'files/upload').
   * @param file The file to be uploaded.
   * @param options Optional query parameters and headers.
   * @returns Observable of the API response.
   */
  uploadFile(endpoint: string, file: File, options?: HttpOptions): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<ApiResponse<any>>(`${this.apiUrl}/${endpoint}`, formData, {
        params: options?.params as { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
      })
      .pipe(catchError(this.handleError));
  }
  /**
   * Handle HTTP errors and return a consistent error format.
   * @param error The HTTP error response.
   * @returns Observable of the API error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    const apiError: ApiError = {
      code: error.status.toString(),
      message: error.error?.message || 'An unexpected error occurred',
      details: error.error?.details || null,
      timestamp: new Date().toISOString(),
      path: error.url || undefined,
    };

    return throwError(() => apiError);
  }
}
