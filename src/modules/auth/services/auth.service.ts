import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,private readonly jwtService: JwtService,private readonly mailService: MailerService) {}

  async validateUser(username: string, password: string): Promise<any> {
    

    const user = await this.userService.findOneUserByUsername(username);
   

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.fullname, sub: user.id };
   return{ access_token: this.jwtService.sign(payload), 
  }
}


// sendMail(mail:any,message:string) {
//   // const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

//   this.mailService.sendMail({
//     from: 'Hamza Babar <hamzabava70@gmil.com.com>',
//     to: mail,
//     subject: `Reset Password Mail`,
//     text: message,
//   });
// }


}