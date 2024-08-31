import { UserService } from "src/modules/user/services/user.service";

export class AuthService{
    constructor(private userService: UserService){}

    async validateUser(username:string, password:string):Promise<any>{
const user=await this.userService.findOneUserByUsername(username)
if(user && user.password===password){
   const {password,username,...rest}=user
   return rest
}
return null
    }
}
