const sumar = require('./index').sumar;
test('Suma correcta ', () => {
    expect(sumar(2, 3)).toBe(5);
});
