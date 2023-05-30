export interface Gateway<Entity, Request, Filter> {
  getLogById(id: string): Promise<Entity>
  getLogs(request: Request, filter: Filter): Promise<Entity[]>
  saveLogs(logs: Entity[]): Promise<void>
}
