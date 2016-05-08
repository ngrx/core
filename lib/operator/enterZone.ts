import { NgZone } from '@angular/core';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';

export interface EnterZoneSignature<T> {
  (zone: NgZone): Observable<T>;
}

export function enterZone<T>(zone: NgZone): Observable<T> {
  return this.lift(new EnterZoneOperator(zone));
}

export class EnterZoneOperator<T> implements Operator<T, T> {
  constructor(private _zone: NgZone) { }

  call(subscriber: Subscriber<T>, source: any): any {
    return source._subscribe(new EnterZoneSubscriber(subscriber, this._zone));
  }
}

class EnterZoneSubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<T>, private _zone: NgZone) {
    super(destination);
  }

  protected _next(value: T) {
    this._zone.run(() => this.destination.next(value));
  }
}
