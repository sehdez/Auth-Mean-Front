import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  

  constructor( private fb     : FormBuilder,
               private router : Router,
               private service: AuthService
               ) { }

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  miFormulario: FormGroup = this.fb.group({
    // Poner expresiones regulares para el correo
    email   :['ejemplo@ejemplo.com', [Validators.required, Validators.pattern( this.emailPattern )]],
    password:['vfr45tgb', [Validators.required, ,Validators.minLength(6)]]
  })

  login(){

    // this.service.validarToken()
    //   .subscribe( resp => console.log(resp) );

    Swal.showLoading();
    const { email, password } = this.miFormulario.value;
    this.service.login( email, password )
        .subscribe(ok => {
          
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
    

  }

}
