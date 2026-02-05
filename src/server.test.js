const request = require('supertest');
const { app } = require('./server');

describe('API', () => {
  test('GET / responde con mensaje de bienvenida', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.mensaje).toContain('API CI/CD');
    expect(res.body.version).toBeDefined();
  });

  test('GET /health responde ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /sumar?a=2&b=3 devuelve 5', async () => {
    const res = await request(app).get('/sumar?a=2&b=3');
    expect(res.status).toBe(200);
    expect(res.body.resultado).toBe(5);
  });

  test('GET /sumar sin params devuelve 400', async () => {
    const res = await request(app).get('/sumar');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
