import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {PaymentService} from "./payment.service";
import {MakePaymentDto} from "./dto/make-payment.dto";
import {AuthenticatedGuard} from "../auth/authenticated.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {MakePaymentResponse} from "./types";

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiOkResponse({ type: MakePaymentResponse }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Post()
  makePayment(@Body() makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }
}
