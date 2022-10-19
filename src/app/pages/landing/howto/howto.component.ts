import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-howto',
  templateUrl: './howto.component.html',
  styleUrls: ['./howto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowtoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
