export interface ConfigType {
  method: string;
  baseUrl?: string;
  data?: any;
  headers?: any;
}

class Api {
  config: Omit<ConfigType, "method">;
  constructor(config?: Omit<ConfigType, "method">) {
    if (!config) {
      this.config = {};
      return;
    }
    this.config = config as ConfigType;
  }
  async request(url: string, config: ConfigType) {
    const {
      method,
      baseUrl = this.config.baseUrl,
      data,
      headers = {},
    } = config;
    const res = await fetch(baseUrl ? baseUrl + url : url, {
      method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        ...this.config.headers,
        ...headers,
      },
    });
    return await res.json();
  }

  get(url: string, config?: { headers?: any }) {
    const { headers = {} } = config || {};
    return this.request(url, {
      method: "GET",
      headers,
    });
  }

  post(url: string, config?: { data?: any; headers?: any }) {
    const { data, headers = {} } = config || {};
    return this.request(url, {
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json",
        ...this.config.headers,
        ...headers,
      },
    });
  }

  delete(url: string, config?: { headers?: any }) {
    const { headers } = config || {};
    return this.request(url, {
      method: "DELETE",
      headers: {
        ...this.config.headers,
        ...headers,
      },
    });
  }

  patch(url: string, config?: { data?: any; headers?: any }) {
    const { data, headers } = config || {};
    return this.request(url, {
      method: "PATCH",
      data,
      headers: {
        "Content-Type": "application/json",
        ...this.config.headers,
        ...headers,
      },
    });
  }

  create(config: Omit<ConfigType, "method">) {
    return new Api(config);
  }
}

const api = new Api();

export default api;
