const { HeadlinesService } = require('./headlines.service');

describe('HeadlinesService', () => {

  let mockDb;
  let mockApi;
  let service;

  beforeEach(() => {
    mockDb = {
      get: jest.fn(),
      set: jest.fn()
    };
    mockApi = {
      fetch: jest.fn()
    };
    service = new HeadlinesService(mockDb, mockApi);
  });

  test('cache exists returns data without calling api', async () => {
    const cachedData = ['headline 1', 'headline 2'];
    mockDb.get.mockResolvedValue(cachedData);
    const result = await service.getHeadlines();
    expect(result).toEqual(cachedData);
    expect(mockDb.get).toHaveBeenCalledWith('headlines');
    expect(mockApi.fetch).not.toHaveBeenCalled();
  });

  test('cache missing calls api and sets cache', async () => {
    const apiData = ['new headline 1', 'new headline 2'];
    mockDb.get.mockResolvedValue(null);
    mockApi.fetch.mockResolvedValue(apiData);
    const result = await service.getHeadlines();
    expect(result).toEqual(apiData);
    expect(mockDb.get).toHaveBeenCalledWith('headlines');
    expect(mockApi.fetch).toHaveBeenCalled();
    expect(mockDb.set).toHaveBeenCalledWith('headlines', apiData);
  });

  test('api fails throws error and db.set not called', async () => {
    mockDb.get.mockResolvedValue(null);
    mockApi.fetch.mockRejectedValue(new Error('API error'));
    await expect(service.getHeadlines()).rejects.toThrow('API error');
    expect(mockDb.set).not.toHaveBeenCalled();
  });

});
