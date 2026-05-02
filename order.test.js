jest.mock('./pricing');

const { calculatePrice } = require('./order');
const { getDiscount } = require('./pricing');

describe('calculatePrice', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('when discount is 0.5 price is reduced correctly', () => {
    getDiscount.mockReturnValue(0.5);
    const result = calculatePrice(100);
    expect(result).toBe(50);
    expect(getDiscount).toHaveBeenCalled();
  });

  test('getDiscount is called during calculation', () => {
    getDiscount.mockReturnValue(0.2);
    calculatePrice(200);
    expect(getDiscount).toHaveBeenCalledTimes(1);
  });

});
