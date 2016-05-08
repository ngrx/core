import { Observable } from 'rxjs/Observable';

import { enterZone, EnterZoneSignature } from '../../operator/enter-zone';

Observable.prototype.enterZone = enterZone;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    enterZone: EnterZoneSignature<T>;
  }
}
