import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { CaseModel, CasesService, CaseType } from './shared/services/cases.service';
import { map } from 'rxjs/operators';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends RxState<{ cases: CaseModel[], loading: boolean}>{

  preloadCasesHandler$ = this.casesService.getCases(CaseType.official, undefined, {
    orderBy: 'createdAt',
    orderDir: 'desc',
  }, '').pipe(
    map(d => d.data.data),
    map(cases => cases.map(c => ({...c, color: this.casesService.generateColor()}))),
    map(cases => ({cases, loading : false})),
    startWith({cases: [], loading: true}),
  )

  cases$ = this.select('cases');
  loading$ = this.select('loading');

  placeholders = new Array(40).fill(0).map(() => 1);

  constructor(private casesService: CasesService) {
    super();

    this.connect(this.preloadCasesHandler$);
    this.$.subscribe(d => console.log(d))

    // this.set('cases', this.casesService.getCases(CaseType.all, ))
  }
}
