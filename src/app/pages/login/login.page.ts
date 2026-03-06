import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
selector:'app-login',
standalone:true,
imports:[IonicModule,FormsModule],
templateUrl:'./login.page.html'
})
export class LoginPage{

email='';
password='';

constructor(private api: ApiService, private router: Router, private auth: AuthService) {}

login() {
  this.api.login({ email: this.email, password: this.password }).subscribe((res: any) => {
    this.auth.setToken(res.token);
    this.router.navigate(['/tasks']);
  });
}

}