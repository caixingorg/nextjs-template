export class QueryKeyFactory {
  static create(scope: string, ...args: unknown[]): readonly unknown[] {
    return [scope, ...args];
  }

  static user(userId?: string) {
    return this.create('user', userId);
  }

  static auth() {
    return this.create('auth');
  }

  // Add more key factories as needed
}
