import axios, { AxiosResponse } from "axios";

class AxiosInstance {
  authToken = localStorage.getItem("token");

  instance = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
  });

  get(url: string, params = {}): Promise<AxiosResponse> {
    return this.instance.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }

  post(url: string, body: any): Promise<AxiosResponse> {
    return this.instance.post(url, body, {
      headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });
  }

  patch(url: string, body: any): Promise<AxiosResponse> {
    return this.instance.patch(url, body, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  put(url: string, body: any): Promise<AxiosResponse> {
    return this.instance.put(url, body, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  del(url: string): Promise<AxiosResponse> {
    return this.instance.delete(url, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

export default new AxiosInstance();
