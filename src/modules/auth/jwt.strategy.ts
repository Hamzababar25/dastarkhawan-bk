import { validate } from 'class-validator';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./services/auth.service";
import { Strategy,ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        secretOrKey:"SECRET",// move it to env ,protect it 
        ignoreExpiration: false,
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    console.log('JwtStrategy initialized'); // Debugging log
  
}
async validate(payload:any){
    return{
        id:payload.sub,
        name:payload.name,
    }
}
}