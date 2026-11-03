const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || ''; 
let apiToken = null;

export const isRemoteApiConfigured = Boolean(API_BASE_URL);

export function setApiToken(token) {
  apiToken = token || null;
}

 

async function parseResponse(response) { 

  const contentType = response.headers.get('content-type') || ''; 

  const body = contentType.includes('application/json') ? await response.json() : await response.text(); 

 

  if (!response.ok) { 

    const message = typeof body === 'object' && body?.message ? body.message : 'No se pudo completar la solicitud.';
    const error = new Error(message);
    error.status = response.status;
    throw error;

  } 

 

  return body; 

} 

 

export async function apiRequest(endpoint, options = {}) { 

  if (!API_BASE_URL) { 

    throw new Error('Configura EXPO_PUBLIC_API_URL para usar la API remota.'); 

  } 

 

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { 
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
      ...options.headers,
    },
    body: options.body && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body, 
  }); 

 

  return parseResponse(response); 

} 
export const api = { 

  get: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'GET' }), 

  post: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'POST', body }), 

  put: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'PUT', body }), 

}; 