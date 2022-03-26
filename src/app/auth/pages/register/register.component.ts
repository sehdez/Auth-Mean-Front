import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  constructor( private fb: FormBuilder,
               private router:Router,
               private authService: AuthService ) { }

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  miFormulario: FormGroup = this.fb.group({
    name     : ['Ejemplo', Validators.required],
    email    : ['ejemplo@ejemplo.com', [Validators.required, Validators.pattern( this.emailPattern )]],
    password : ['vfr45tgb', [Validators.required, Validators.minLength(6)]],
    password2: ['vfr45tgb', [Validators.required, Validators.minLength(6)]]
  })



  registro(){
    Swal.showLoading();
    const { name, email, password, password2 } = this.miFormulario.value

    //Validar si las contraseñas hacen match
    if ( password != password2 ){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no hacen match'
      })
      return
    }
    this.authService.registro(email, name, password)
        .subscribe( ok =>{
          if ( ok === true ){
            this.router.navigateByUrl('/dashboard');
            Swal.close();
          }else{
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: ok,
              
            });
          }
        });
    // this.router.navigateByUrl('/dashboard');
  }

}
