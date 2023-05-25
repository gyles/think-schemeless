export class DomainException extends Error {
  constructor(public readonly message: string) {
    super(message)
  }
}
