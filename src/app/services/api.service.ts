import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn:'root'
})
export class ApiService{

api='http://localhost/todo-api/public/index.php/api';

constructor(private http:HttpClient){}

login(data:any){
return this.http.post(this.api+'/login',data);
}

register(data:any){
return this.http.post(this.api+'/register',data);
}

tasks(token:string){
return this.http.get(this.api+'/tasks',{
headers:{Authorization:'Bearer '+token}
});
}

}