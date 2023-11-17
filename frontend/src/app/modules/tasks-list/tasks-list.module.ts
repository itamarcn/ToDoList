import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { TasksListComponent } from './tasks-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form/task-form.component';

@NgModule({
    declarations: [
        TasksListComponent,
        TaskFormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class TasksListModule { }
