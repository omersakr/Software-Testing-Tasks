const { addItem, getItems, clearCart } = require('./cart');

describe('cart', () => {

  beforeEach(() => {
    clearCart();
  });

  afterEach(() => {
    clearCart();
  });

  test('add 1 item should have length 1', () => {
    addItem('apple');
    expect(getItems().length).toBe(1);
  });

  test('add 2 items should have length 2', () => {
    addItem('apple');
    addItem('banana');
    expect(getItems().length).toBe(2);
  });

});
