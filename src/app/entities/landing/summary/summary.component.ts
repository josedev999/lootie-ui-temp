import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CasesService } from '../../../shared/services/cases.service';
import { RxState, selectSlice } from '@rx-angular/state';
import { map, pluck } from 'rxjs/operators';

export interface SummaryState {
  unboxed: number;
  registered: number;
  online: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent extends RxState<SummaryState> {

  vm$ = this.select(selectSlice(['unboxed', 'registered', 'online']));

  countUpOptions = {
    unboxed: {
      startVal: 0,
      duration: 2,
    },
    registered: {
      startVal: 0,
      duration: 2,
    },
    online: {
      startVal: 0,
      duration: 2,
    },
  };

  constructor(private casesService: CasesService) {
    super();

    this.connect(casesService.getSystemStatistics().pipe(map(d => d.data)));
  }
}
