import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CasesService } from '../../../shared/services/cases.service';
import { RxState } from '@rx-angular/state';
import { delay, endWith, Observable, startWith, tap } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CasesSliderState {
  unboxings: any[];
  landing: boolean;
  loading: boolean;
  isMobile: boolean;
}

export interface ViewModel {
  unboxings: any[];
  landing: boolean;
  loading: boolean;
  isMobile: boolean;
}

@Component({
  selector: 'app-recent-unboxes',
  templateUrl: './recent-unboxes.component.html',
  styleUrls: ['./recent-unboxes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentUnboxesComponent extends RxState<CasesSliderState> implements OnInit {

  // STATE
  vm$: Observable<ViewModel> = this.select();

  // HANDLERS
  loadHandler$ =
    this.caseService.getLatestDrops().pipe(
      map(d => d.data),
      map(unboxings => ({unboxings, loading: false})),
      startWith({loading: true}),
      delay(3000),
      endWith({loading: false}),
    )


  leftNavDisabled = false;
  rightNavDisabled = false;

  placeholders = Array(20).fill(1).map(d => d)

  constructor(
    private caseService: CasesService,
  ) {
    super();
    this.set({loading: true, unboxings: []});
    // this.$.subscribe(d => console.log(d));

    this.connect(this.loadHandler$);
  }

  ngOnInit(): void {
  }


  leftBoundStat(reachesLeftBound: boolean): void {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean): void {
    this.rightNavDisabled = reachesRightBound;
  }

  moveLeft(): void {
    // this.ds.moveLeft();
  }

  moveRight(): void {
    // this.ds.moveRight();
  }

  trackByFn(index: number, unboxing: any) {
    return unboxing.case.id;
  }
}
