import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Task } from "src/app/models/task.interface";
import { WebSocketService } from "src/app/services/websocket.service";

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
    public taskForm!: FormGroup;
    public isEditing = false;

    constructor(private fb: FormBuilder,
        private webSocketService: WebSocketService,
        private dialogRef: MatDialogRef<TaskFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { task: Task }) {
        this.isEditing = !!data?.task;
    }

    ngOnInit(): void {
        this.taskForm = this.fb.group({
            title: [this.data?.task?.title || '', Validators.required],
            description: [this.data?.task?.description || '', Validators.required]
        });
    }

    public onSubmit(): void {
        if (this.isEditing) {
            const updatedTask: Task = {
                ...this.data.task,
                title: this.taskForm.value.title,
                description: this.taskForm.value.description
            };

            this.webSocketService.updateTask(updatedTask);
        } else {
            this.webSocketService.createTask(this.taskForm.value);
        }

        this.taskForm.reset();
        this.dialogRef.close();
    }
}