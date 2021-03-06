import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {}

  transform(value: string): string {
    return this._sanitizer.sanitize(SecurityContext.HTML, value);
  }
}
