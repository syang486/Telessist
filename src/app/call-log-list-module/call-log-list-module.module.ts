import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallLogListComponent } from './call-log-list/call-log-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CallLogListAdminComponent } from './call-log-list-admin/call-log-list-admin.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CallLogListDialogComponent } from './call-log-list-dialog/call-log-list-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ]
})
export class CallLogListModuleModule { }
