import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log("show", username, password);
    console.log("plz", this.userService); // Check if this logs correctly

    const user = await this.userService.findOneUserByUsername(username);
    console.log("showbitch", user);

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return { user };
  }
}
