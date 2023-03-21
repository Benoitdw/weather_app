const BASE_API_URL = import.meta.env.VITE_METEO_BASE_API_URL;

export default class WeatherApiClient {
  base_url: string;
  constructor() {
    this.base_url = BASE_API_URL + "/v1";
  }

  async request(options: {
    url: string;
    method: string;
    query?: string;
    headers?: string;
    options?: object;
    body?: object;
  }) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== "") {
      query = "?" + query;
    }

    let response;
    console.log(this.base_url + options.url + query)
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        body: options.body ? JSON.stringify(options.body) : null,
      });
    } catch (error) {
      let description = error;
      if (error instanceof Error) {
        let description = error.toString();
      }
      response = {
        ok: false,
        status: 500,
        json: async () => {
          return {
            code: 500,
            message: "The server is unresponsive",
            description: description,
          };
        },
      };
    }
    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null,
    };
  }

  async get(url: string, query?: string, options?: object) {
    return this.request({ method: "GET", url, query, ...options });
  }

  async post(url: string, body: object, options: object) {
    return this.request({ method: "POST", url, body, ...options });
  }

  async put(url: string, body: object, options: object) {
    return this.request({ method: "PUT", url, body, ...options });
  }

  async delete(url: string, options: object) {
    return this.request({ method: "DELETE", url, ...options });
  }
}
