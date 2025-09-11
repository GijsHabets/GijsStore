import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";

@Injectable()
export class LoginService {



  constructor(private router: Router, private http: HttpClient){}

  private adminKey: boolean = false;

  getAdminKey(): boolean{
    this.adminAuth()
    return this.adminKey;
  }

  setAdminKey(value: boolean){
    this.adminKey = value;
  }
  private key: boolean = false;
  getkey(): boolean {
    this.auth()
    return this.key;
  }

  setkey(value: boolean) {
    this.key = value;
  }





  login(username: string, password: string) {

    const headers = { 'Content-Type': 'application/json' };
    this.http.post<{message: string}>(`${environment.apiBase}/auth/signin`,
      {
        "username": username,
        "password": password
      },
      {headers}
    ).subscribe((responseData) => {


      sessionStorage.setItem('JWT',responseData.message);
      sessionStorage.setItem("key",String(true));
      this.router.navigate(['']);
      this.adminAuth();
    })
  }

  auth(){
    const headers = { 'Authorization': 'Bearer '+sessionStorage.getItem('JWT') };
    let url =  `${environment.apiBase}/test/user`
    // @ts-ignore
    this.http.get<string>(url, {headers, responseType: 'text'}).subscribe((response) =>{
      if(String(response) == "User Content."){
        this.setkey(true)
      }
      else{
        sessionStorage.setItem('key',String(false));
        this.router.navigate(['login']);
        this.setkey(false)
      }
    })

  }

  adminAuth(){
    const headers = { 'Authorization': 'Bearer '+sessionStorage.getItem('JWT') };
    let url = `${environment.apiBase}/test/admin`
    // @ts-ignore
    this.http.get<string>(url, {headers, responseType: 'text'}).subscribe((response) =>{
      if(String(response) == "Admin Board."){
        sessionStorage.setItem("adminKey",String(true));
        this.setAdminKey(true)
      }
      else{
        this.router.navigate(['home']);
        sessionStorage.setItem("adminKey",String(false));
        this.setAdminKey(false)
      }
    })
  }



}
