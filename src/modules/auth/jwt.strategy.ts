import { validate } from 'class-validator';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./services/auth.service";
import { Strategy,ExtractJwt } from "passport-jwt";
import { UserService } from '../user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService,private userService:UserService) {
    super({
        secretOrKey:"SECRET",// move it to env ,protect it 
        ignoreExpiration: false,
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    console.log('JwtStrategy initialized'); // Debugging log
  
}
// async validate(payload:any){
//     return{
//         id:payload.sub,
//         name:payload.name,
//     }
// }
// }
async validate(payload: any) {
    const user = await this.userService.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user; // Exclude password from the result
    return result;// Return the full user object
  }
}