// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmailService {
  private readonly brevoApiKey = process.env.BREVO_API_KEY;

  async sendEmail(to: string, subject: string, text: string) {
    const url = 'https://api.brevo.com/v3/smtp/email';
    const headers = {
      'Content-Type': 'application/json',
      'api-key': this.brevoApiKey,
    };
    const data = {
      sender: { email: 'no-reply@uzi-express.com', name: 'UZI Express' },
      to: [{ email: to }],
      subject: subject,
      textContent: text,
    };

    try {
      let res = await axios.post(url, data, { headers });
      console.log('Email sent successfully:', res.data);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
