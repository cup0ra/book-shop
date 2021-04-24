import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICardInfo } from '@app/pages/electronic-textbook/word';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogSettingsComponent {
  formGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ICardInfo, formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({ ...data });
  }


  onFormSubmit() {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }
}
