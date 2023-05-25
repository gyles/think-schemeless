import { Payload } from './payload'

export class LogItem {
  constructor(
    public readonly id: string,
    public readonly created: Date,
    public readonly userId: string,
    public readonly action: string,
    public readonly url: string,
    public readonly payload: Payload,
  ) {}
}
