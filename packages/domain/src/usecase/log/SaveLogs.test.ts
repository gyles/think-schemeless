import { LogItem } from '../../entity/LogItem'
import { DomainException } from '../exception/DomainException'
import { SaveLogs } from './SaveLogs'

describe('Save Logs use case', () => {
  const logGateway = {
    getLogById: jest.fn(),
    getLogs: jest.fn(),
    saveLogs: jest.fn(),
  }

  beforeEach(async () => {
    jest.resetAllMocks()
  })

  it('should throw domain exception when saving logs given no log item', () => {
    const useCase = new SaveLogs<Array<LogItem>, string, string>(logGateway)

    expect(() => useCase.saveLogs([])).toThrow(DomainException)
    expect(() => useCase.saveLogs([])).toThrow('Cannot save empty logs.')
  })
})
