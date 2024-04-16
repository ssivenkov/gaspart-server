import {ForbiddenException, Injectable} from '@nestjs/common';
import {MakePaymentDto} from "./dto/make-payment.dto";
import axios from "axios";
import * as process from "process";

@Injectable()
export class PaymentService {
  async makePayment(makePaymentDto: MakePaymentDto) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: 'https://api.yookassa.ru/v3/payments',
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': Date.now(),
        },
        auth: {
          username: process.env.UMONEY_USER_ID,
          password: process.env.UMONEY_SECRET_KEY,
        },
        data: {
          amount: {
            value: makePaymentDto.amount,
            currency: 'RUB'
          },
          capture: true,
          confirmation: {
            type: 'redirect',
            return_url: 'http://localhost:3001/order'
          },
          description: 'Заказ №1'
        }
      });

      return data;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
