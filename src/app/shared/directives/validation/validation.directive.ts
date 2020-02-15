import { Directive, Input, OnInit, ElementRef, HostListener } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appValidation]'
})
export class ValidationDirective implements OnInit {
  
  private readonly element: HTMLInputElement;
  private abstractController: AbstractControl; 

  @Input() public length: number = 50;
  @Input() public group: FormGroup;
  @Input() public valueMasked: string = '';
  public carret: any;

  private allowedKeys: number[] = [8,9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46]; 

  public constructor(
    public ref: ElementRef
  ) {
    this.element = ref.nativeElement;
  }

  public ngOnInit() {
    console.log('holi');
    this.element.autocomplete = 'off';
    this.element.autofocus = false;
    this.abstractController = this.group.controls[this.element.name];
  }

  public validateAllowedKeys(event): boolean {
    let isAllowedKey = false;
    this.allowedKeys.forEach(value => {
        if (event.keyCode === value) {
            isAllowedKey = true;
        }
    });
    return isAllowedKey;
  }

  public validateLength(event): void {
    /*const length = event.target.value.replace(/[^0-9]/g, '').length;*/
    const length = event.target.value.length;
    if (length >= this.length) {
        event.preventDefault();
    }
  }

  public validateBackspace(event): void {
    if (event.keyCode === 8) {
        const deletedChar = event.target.value.substring(event.target.selectionStart - 1, event.target.selectionStart);
    }
  }

  @HostListener('keydown', ['$event']) public validations(event: any): void {
    if (!this.validateAllowedKeys(event)) {
      this.validateLength(event);
    } else {
      this.validateBackspace(event);
    }
  }

  @HostListener('keyup', ['$event']) public ontextInput(event: any): void {
    this.carret = event.target.selectionStart;
    this.valueMasked = event.target.value.replace(/[^0-9]/g, '');
    this.abstractController.setValue(this.valueMasked, { emitEvent: true });
    event.target.setSelectionRange(this.carret, this.carret);
  }

  @HostListener('textInput', ['$event']) public textInput(event: any): void {
    const data = event.data;
    event.keyCode = data.charCodeAt(0);
    event.key = data;
    this.validations(event);  
  }

  @HostListener('paste', ['$event']) public  blockPaste(e: KeyboardEvent): void {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) public  blockCopy(e: KeyboardEvent): void {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) public blockCut(e: KeyboardEvent): void {
    e.preventDefault();
  }
}