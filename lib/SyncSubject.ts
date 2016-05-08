import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic, ISubscription } from 'rxjs/Subscription';
import { throwError } from 'rxjs/util/throwError';
import { ObjectUnsubscribedError } from 'rxjs/util/ObjectUnsubscribedError';


export class SyncSubject<T> extends Subject<T> {

  constructor(private _value: T) {
    super();
  }

  protected _subscribe(subscriber: Subscriber<T>): TeardownLogic {
    const subscription = super._subscribe(subscriber);
    if (subscription && !(<ISubscription> subscription).isUnsubscribed) {
      subscriber.next(this._value);
    }
    return subscription;
  }

  protected _next(value: T): void {
    super._next(this._value = value);
  }

  protected _error(err: any): void {
    this.hasErrored = true;
    super._error(this.errorValue = err);
  }
}
