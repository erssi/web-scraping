/* eslint-disable no-throw-literal */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LocalStorageService } from './LocalStorageService';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = LocalStorageService.getItem('accessToken');
  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return config;
});

export { axiosInstance };

export class ApiService {
  static async get<T>(
    path: string,
    params?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T> {
    try {
      const response = await axiosInstance.get(path, {
        params: params,
        headers: headers,
      });

      return ApiService.handleResponse(response);
    } catch (error: any) {
      return ApiService.handleError(error);
    }
  }

  static async post<T>(
    path: string,
    data?: any,
    params?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T> {
    try {
      const response = await axiosInstance.post(path, data, {
        params: params,
        headers: headers,
      });

      return ApiService.handleResponse(response);
    } catch (error: any) {
      return ApiService.handleError(error);
    }
  }

  static async patch<T>(
    path: string,
    data: any,
    params?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T> {
    try {
      const response = await axiosInstance.patch(path, data, {
        params: params,
        headers: headers,
      });

      return ApiService.handleResponse(response);
    } catch (error: any) {
      return ApiService.handleError(error);
    }
  }

  static async delete(
    path: string,
    params?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<Record<string, never>> {
    try {
      const response = await axiosInstance.delete(path, {
        params: params,
        headers: headers,
      });

      return ApiService.handleResponse(response);
    } catch (error: any) {
      return ApiService.handleError(error);
    }
  }

  static handleResponse(response: AxiosResponse): any {
    return response.data;
  }

  static handleError(error: AxiosError): never {
    const statusCode = error.response?.status;

    if (statusCode === 422) {
      throw {
        statusCode: 422,
        status: 'unprocessable_entity',
        message: 'Validation Failed',
      };
    } else {
      const responseData: any = error.response?.data;

      throw {
        statusCode: statusCode as number,
        status: responseData?.status,
        message: responseData?.data?.join(','),
      };
    }
  }
}
