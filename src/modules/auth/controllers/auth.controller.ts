import { UserService } from './../../user/services/user.service';
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Post, Res, UsePipes } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { InvalidRequestValidator } from 'src/common/pipes/invalid-request-validator';

import * as nodemailer from 'nodemailer';
let testAccount =  nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.ethereal.email",
    port: 465,
    // true for 465, false for other ports
    auth: {
      user: 'hamzabava70@gmail.com', // generated ethereal user
      pass: 'nesetaiixtudqiyu', // generated ethereal password
    }})
@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService,private readonly userService:UserService) {}
  protected readonly logger = new Logger(this.constructor.name);
 
  @Post('forgot-password')
  async sendForgotPasswordEmail(
    @Body('email') email: any, 
  ) {
    try {
    if (!email) {
      return {
        message: 'Email is required',
      };

    }
    let mail = await this.userService.findOneUserByMail(email);
    if (!mail) {
      throw new HttpException(`Mail Not Found`, HttpStatus.NOT_FOUND);
    }
    console.log(mail,"show33")
    // Construct the password reset link (you need to replace this with your actual frontend URL)
    const resetLink = `http://localhost:3000/auth/resetPassword?email=${email}`;

    // Define the message with the reset link
    const message = `Forgot your password? If you didn't forget your password, please ignore this email. Otherwise, click the link below to reset your password: \n\n ${resetLink}`;

    // Call mail service to send the email
    let info = await transporter.sendMail({
      from: 'hamzabava70@gmail.com', // sender address
      to: email, // list of receivers
      subject: "APP PASSWORD", // Subject line
      text: message, // plain text body
     // html: "<b>Hello world?</b>"
     })

    return {
      message: 'Password reset email  successfully',info,
    };
  }
  catch (e) {
    this.logger.error(e);
    console.log(e)
    throw e;
  }
}
}