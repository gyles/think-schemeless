import { v4 } from 'uuid'
import { LogItem } from '../../entity/log-item'
import { SearchLogs } from './search-logs'
import { Payload } from '../../entity/payload'

describe('Search Logs use case', () => {
  const logGateway = {
    getLogById: jest.fn(),
    getLogs: jest.fn(),
    saveLogs: jest.fn(),
  }

  beforeEach(async () => {
    jest.resetAllMocks()
  })

  describe('searchById', () => {
    it('should return item when searching by id given an existing log item', () => {
      const log = new LogItem(
        v4(),
        new Date(),
        v4(),
        'GET',
        '/order/32e1bbc1-74f9-42bb-8ee5-c1efd819ce66',
        undefined,
      )
      logGateway.getLogById.mockReturnValueOnce(log)

      const useCase = new SearchLogs<string, string>(logGateway)
      const result = useCase.searchLogById(log.id)

      expect(logGateway.getLogById).toBeCalledWith(log.id)
      expect(result).toBe(log)
    })
  })

  describe('searchByQuery', () => {
    it('should return items when searching by query given a existing matches', () => {
      const logs = [
        new LogItem(
          v4(),
          new Date(),
          v4(),
          'GET',
          '/order/32e1bbc1-74f9-42bb-8ee5-c1efd819ce66',
          undefined,
        ),
        new LogItem(
          v4(),
          new Date(),
          v4(),
          'POST',
          '/order',
          new Payload(v4(), v4(), 5),
        ),
      ]
      logGateway.getLogs.mockReturnValueOnce(logs)

      const useCase = new SearchLogs<string, string>(logGateway)
      const result = useCase.searchByQuery(
        'request',
        'userId==5087d5bf-4f78-413b-b700-620a24306d56',
      )

      expect(logGateway.getLogs).toBeCalledWith(
        'request',
        'userId==5087d5bf-4f78-413b-b700-620a24306d56',
      )
      expect(result).toBe(logs)
    })
  })
})
