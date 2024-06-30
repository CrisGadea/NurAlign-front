import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[CommonModule, ReactiveFormsModule],
  standalone:true
})
export class HeaderComponent {

  constructor(private fb: FormBuilder,private service: RegisterService)
  { }

  registerForm = this.fb.group({
    name: [''],
    email: [''],
    lastName: [''],
    phoneNumber: [''],
    password: [''],
    registeredFlag: "Y",
    isSuscribed: false
  });


  register(){
    if(this.registerForm?.valid){ 
    this.service.register(this.registerForm.value).subscribe(
      (data: any)=>{
        alert("El usuario " + data.name + ", con email: " + data.email + " ha sido registrado con éxito");
        console.log(data);
      },
      (error)=>{
        alert("Error al registrar usuario. Validar los datos ingresados.");
        console.log(error);
      }
    );
    }
    else{
      alert("Faltan datos para completar el registro.");
    }
  }


}
