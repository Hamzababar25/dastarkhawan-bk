import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "./services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name); // Logger instance

  constructor(private authService: AuthService) {
    super();
    this.logger.log('LocalStrategy initialized');
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.log(`Attempting to validate user: ${username}`); // Log incoming username
    
    const user = await this.authService.validateUser(username, password);
    
    if (!user) {
      this.logger.error(`Authentication failed for user: ${username}`); // Log failure
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User validated successfully: ${username}`); // Log success
    return user;
  }
}
