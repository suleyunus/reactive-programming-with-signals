import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error {}
