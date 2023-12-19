import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

class BaseHttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/',
      headers: {
        'Content-Type': 'application/json',
        // You can add more headers here if needed
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // You can modify headers or add tokens here before the request is sent
        // For example:
        // config.headers.Authorization = `Bearer ${getToken()}`;
        const token = Cookies.get('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Handle request errors here
        return Promise.reject(error);
      }
    );
  }

  // private setupInterceptors() {
  //   this.axiosInstance.interceptors.request.use(
  //     (config: AxiosRequestConfig) => {
  //       // You can modify headers or add tokens here before the request is sent
  //       // For example:
  //       // config.headers.Authorization = `Bearer ${getToken()}`;

  //       return config;
  //     },
  //     (error) => {
  //       // Handle request errors here
  //       return Promise.reject(error);
  //     }
  //   );

  //   this.axiosInstance.interceptors.response.use(
  //     (response: AxiosResponse) => {
  //       // Handle successful responses globally (if needed)
  //       return response;
  //     },
  //     (error) => {
  //       // Handle response errors globally (if needed)
  //       return Promise.reject(error);
  //     }
  //   );
  // }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request<T>(
        config
      );
      return response.data;
    } catch (error) {
      // Handle errors here
      throw error;
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  public async post<T, K>(
    url: string,
    data: K,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  // Add other HTTP methods (PUT, DELETE, etc.) if needed
}

export default BaseHttpService;
