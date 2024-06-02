import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../core/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private service: RegisterService,
    private route: ActivatedRoute) { }

    registerTherapistForm = this.fb.group({
      name: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      password: [''],
      confirmPassword: [''],
      documentNumber: [''],
      medicalLicense: [''],
    });

    hide = true;

  register(){
    if(this.registerTherapistForm.value.password !== this.registerTherapistForm.value.confirmPassword){
      alert('Password and Confirm Password must be the same');
      return;
    } else {
      this.service.register(this.registerTherapistForm.value).subscribe((response)=>{
        console.log(response);
        alert(response === true ? 'Register Success' : 'Register Failed');
      },(error)=>{
        console.log(error);
      });
    }

  }

}
