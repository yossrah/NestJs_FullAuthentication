import { Controller, Post } from '@nestjs/common';
import { SendEmailDto } from 'src/common/interfaces/email.interface';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {
    constructor(private readonly mailService:MailingService){}
    @Post('')     
    async sendMail (){
            const dto:SendEmailDto = {
                from: 'yossrahashassi20@gmail.com',
                to: 'yossrahas@gmail.com',
                subject: 'Activate Email',
                html: `<div>
                    <h1>Activate email</h1>
                    <h2>Good morning</h2>
                    <p>To activate your account, click this link:</p>
                    <a href="http://localhost:${process.env.PORT}/auth/confirm/">Click here!</a>
                </div>`
            }
            return await this.mailService.sendEmail(dto)
        }
}
