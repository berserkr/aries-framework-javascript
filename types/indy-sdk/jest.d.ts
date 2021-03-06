import { ConnectionRecord } from '../../src/lib/storage/ConnectionRecord';

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeConnectedWith(connection: ConnectionRecord): R;
    }
  }
}

export {};
