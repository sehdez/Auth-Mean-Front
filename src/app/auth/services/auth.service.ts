import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario (){
    return {...  this._usuario }
  }

  constructor( private http: HttpClient ) { }

  login( email: string, password: string ) {
    email = email.toLowerCase();
    const url  = `${this.baseUrl}/auth`;
    const body = { email, password };  

    return this.http.post<AuthResponse>( url, body)
      .pipe(
        tap( ({ token, ok }) => {
          if ( ok ){
            localStorage.setItem('token', token!);
            // this._usuario = {
            //   uid: resp.uid!,
            //   nombre: resp.name!,
            //   email: resp.email!
            // }
          }
        }),
        map( resp => resp.ok ),
        catchError ( err => of(err.error.msg))
      )

  }

  validarToken(  ){
    const url  = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token')|| '');

    return this.http.get<AuthResponse>( url, { headers } )
            .pipe( 
              tap( resp => {
                if ( resp.ok ){
                  localStorage.setItem('token', resp.token!);
                  this._usuario = {
                    uid: resp.uid!,
                    nombre: resp.name!,
                    email: resp.email!
                  }
                }
              }),
              map(resp => {
                return resp.ok;
              }),
              catchError( err => of(false) )
            )


  }

  logout(){
    localStorage.clear();
  }

  registro( email:string, name: string, password: string ){
    const url = `${this.baseUrl}/auth/new`;
    email = email.toLowerCase();
    const body = { email, name, password };

    return this.http.post<AuthResponse>(url,body)
          .pipe(
            tap( resp => {
              if( resp.ok ){
                localStorage.setItem('token', resp.token!);
                // this._usuario = {
                //   uid: resp.uid!,
                //   nombre: resp.name!,
                //   email: resp.email!
                // }
              };
            }),
            map( resp => resp.ok ),
            catchError( err => of (err.error.msg) )
          )
  }



}
