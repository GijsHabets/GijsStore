import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";



@Injectable()
export class RegisterService{



  constructor(private router: Router, private http: HttpClient){}


  selectRole: string = '';
  radioChangeHandler (event: any){
    this.selectRole = event.target.value;
  }

  Registreer(username: string,email: string, password: string) {

    var role = this.selectRole;

    const headers = { 'Content-Type': 'application/json' };
    let url =  `${environment.apiBase}/auth/signup`
    this.http.post<{message: string}>(url,
      {
        "username": username,
        "email": email,
        "password": password
      },
      {headers}
    ).subscribe((responseData) => {
      this.router.navigate(['auth']);
    })

  }

}
