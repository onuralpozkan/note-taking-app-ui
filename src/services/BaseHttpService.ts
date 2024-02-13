import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';
import { LoginResponseType } from './UserService';

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
        const token = Cookies.get('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError<{ statusCode: number; message: string }>) => {
        if (error.response && error.response.status === 401) {
          return Promise.resolve(error.response?.data);
        }
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError<LoginResponseType>) => {
        return Promise.resolve(error.response);
      }
    );
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request<T>(
        config
      );
      return response.data;
    } catch (error) {
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

  public async put<T, K>(
    url: string,
    data: K,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }
}

export default BaseHttpService;
