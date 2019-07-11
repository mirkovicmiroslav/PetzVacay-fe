import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, FormsModule, ShellRoutingModule]
})
export class ShellModule {}
