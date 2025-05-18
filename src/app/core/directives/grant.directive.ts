import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { GrantService } from '../services/grant.service';

@Directive({
  selector: '[appGrant]'
})
export class GrantDirective implements OnInit {
  @Input() moduleName!: string;
  @Input() action!: string;  // Now expects full action name like "Reports.GetReports"
  @Input() mode: 'hide' | 'disable' = 'hide';

  constructor(
    private elementRef: ElementRef,
    private grantService: GrantService
  ) {}

  ngOnInit() {
    this.updateView();
  }

  private updateView() {
    const hasGrant = this.grantService.hasGrant(this.moduleName, this.action);

    if (this.mode === 'hide') {
      this.elementRef.nativeElement.style.display = hasGrant ? '' : 'none';
    } else if (this.mode === 'disable') {
      if (hasGrant) {
        this.elementRef.nativeElement.removeAttribute('disabled');
      } else {
        this.elementRef.nativeElement.setAttribute('disabled', 'true');
      }
    }
  }
} 