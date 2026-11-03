import assert from 'node:assert/strict';
import test from 'node:test';

process.env.EXPO_PUBLIC_API_URL = 'http://api.example.test/api';
const { api, setApiToken } = await import('../services/apiService.js?api-service-tests');

test('el cliente agrega el token y serializa el cuerpo JSON', async () => {
  const originalFetch = globalThis.fetch;
  let request;
  setApiToken('test-jwt');
  globalThis.fetch = async (url, options) => {
    request = { url, options };
    return new Response('{"ok":true}', {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  };

  try {
    const result = await api.post('/auth/profile', { name: 'Usuario' });
    assert.deepEqual(result, { ok: true });
    assert.equal(request.url, 'http://api.example.test/api/auth/profile');
    assert.equal(request.options.method, 'POST');
    assert.equal(request.options.headers.Authorization, 'Bearer test-jwt');
    assert.equal(request.options.headers['Content-Type'], 'application/json');
    assert.deepEqual(JSON.parse(request.options.body), { name: 'Usuario' });
  } finally {
    globalThis.fetch = originalFetch;
    setApiToken(null);
  }
});

test('el cliente propaga el estado HTTP y el mensaje de error del backend', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('{"error":"UNAUTHORIZED","message":"Token inválido."}', {
    status: 401,
    headers: { 'content-type': 'application/json' },
  });

  try {
    await assert.rejects(api.get('/auth/me'), (error) => (
      error.message === 'Token inválido.' && error.status === 401
    ));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
