const { ProductService } = require('./product.service');

describe('ProductService', () => {

  let mockDb;
  let service;

  beforeEach(() => {
    mockDb = {
      find: jest.fn(),
      insert: jest.fn()
    };
    service = new ProductService(mockDb);
  });

  test('getProduct calls db with correct id', async () => {
    mockDb.find.mockResolvedValue({ id: '123', name: 'Laptop' });
    const result = await service.getProduct('123');
    expect(mockDb.find).toHaveBeenCalledWith('123');
    expect(result.name).toBe('Laptop');
  });

  test('createProduct calls insert', async () => {
    const product = { name: 'Phone', price: 500 };
    mockDb.insert.mockResolvedValue({ id: '456', ...product });
    const result = await service.createProduct(product);
    expect(mockDb.insert).toHaveBeenCalledWith(product);
    expect(result.id).toBe('456');
  });

  test('getProduct handles failure case', async () => {
    mockDb.find.mockRejectedValue(new Error('DB error'));
    await expect(service.getProduct('999')).rejects.toThrow('DB error');
  });

  test('createProduct handles failure case', async () => {
    mockDb.insert.mockRejectedValue(new Error('Insert failed'));
    await expect(service.createProduct({})).rejects.toThrow('Insert failed');
  });

});
