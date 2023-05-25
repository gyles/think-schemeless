import { LogItem } from '../../entity/log-item'
import { Payload } from '../../entity/payload'
import { DomainException } from '../exception/domain-exception'
import { SaveLogs } from './save-logs'
import { v4 } from 'uuid'

describe('Save Logs use case', () => {
  const logGateway = {
    getLogById: jest.fn(),
    getLogs: jest.fn(),
    saveLogs: jest.fn(),
  }

  beforeEach(async () => {
    jest.resetAllMocks()
  })

  describe('saveLogs', () => {
    it('should throw domain exception when saving logs given no log item', () => {
      const useCase = new SaveLogs<Array<LogItem>, string, string>(logGateway)

      expect(() => useCase.saveLogs([])).toThrow(DomainException)
      expect(() => useCase.saveLogs([])).toThrow('Cannot save empty logs.')
    })

    it('should allow save when saving logs given log items', () => {
      const useCase = new SaveLogs<Array<LogItem>, string, string>(logGateway)

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

      useCase.saveLogs(logs)

      expect(logGateway.saveLogs).toBeCalledWith(logs)
    })
  })
})
