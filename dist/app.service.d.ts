import { MailerService } from '@nestjs-modules/mailer';
export declare class AppService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    getHello(): string;
    sendMail(to: string, codeOtp: string): Promise<void>;
}
