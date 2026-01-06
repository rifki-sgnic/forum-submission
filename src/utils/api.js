const BASE_URL = import.meta.env.VITE_BASE_URL_API;

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message || response.statusText);
    return handleError(error);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else if (contentType && contentType.includes('text/')) {
    return await response.text();
  } else {
    return await response.blob();
  }
}

async function handleError(error) {
  throw new Error(error.message);
}

const api = {
  async get(param, token = null, options = {}) {
    return await this._fetch(param, token, { ...options, method: 'GET' });
  },
  async post(param, token = null, options = {}) {
    return await this._fetch(param, token, { ...options, method: 'POST' });
  },
  async patch(param, token = null, options = {}) {
    return await this._fetch(param, token, { ...options, method: 'PATCH' });
  },
  async delete(param, token = null, options = {}) {
    return await this._fetch(param, token, { ...options, method: 'DELETE' });
  },

  async _fetch(param, token = null, options = {}) {
    const headers = {
      ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const fetchOptions = {
      ...options,
      headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(BASE_URL + param, fetchOptions);
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};

export default api;
