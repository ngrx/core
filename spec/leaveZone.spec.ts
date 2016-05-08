import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { createNgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import '../lib/add/operator/leaveZone';

declare var Zone;

describe('leaveZone Operator', function() {
  it('should cause an observable stream to leave the ng zone', function(done) {
    const zone = createNgZone();

    zone.run(() => Observable.of(1)
      .leaveZone(zone)
      .map(() => Zone.current.name)
      .subscribe({
        next(name) {
          expect(name).not.toEqual('angular');
          done();
        },
        error(err) {
          done(err);
        }
      }));
  });
});
