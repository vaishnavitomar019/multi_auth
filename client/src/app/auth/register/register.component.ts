import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormioModule } from '@formio/angular';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormioModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = {
    "components": [
      {
        "label": "Username",
        "placeholder": "Enter Username",
        "applyMaskOn": "change",
        "tableView": true,
        "validate": {
          "required": true,
          "minLength": 6
        },
        "validateWhenHidden": false,
        "key": "username",
        "type": "textfield",
        "input": true
      },
      {
        "label": "Email",
        "placeholder": "Enter Email",
        "applyMaskOn": "change",
        "tableView": true,
        "validate": {
          "required": true
        },
        "validateWhenHidden": false,
        "key": "email",
        "type": "email",
        "input": true
      },
      {
        "label": "Password",
        "placeholder": "Enter Password",
        "applyMaskOn": "change",
        "tableView": false,
        "validate": {
          "required": true
        },
        "validateWhenHidden": false,
        "key": "password",
        "type": "password",
        "input": true,
        "protected": true
      },
      // {
      //   "label": "Confirm Password",
      //   "placeholder": "Re-Enter Password",
      //   "applyMaskOn": "change",
      //   "tableView": false,
      //   "validate": {
      //     "required": true
      //   },
      //   "validateWhenHidden": false,
      //   "key": "confirmPassword",
      //   "type": "password",
      //   "input": true,
      //   "protected": true
      // },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
      }
    ]
  }
  
  constructor(private authService: AuthService) { }

  onSubmit(submission: any) {
    const formData = submission.data;
    console.log('Form Submitted!', formData);

    this.authService.register(formData).subscribe({
      next: (res) => {
        console.log('Registration successful', res);

      },
      error: (err) => {
        console.error('Registration failed', err);

      }
    });
  }

}
