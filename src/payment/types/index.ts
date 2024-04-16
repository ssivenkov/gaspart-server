import {ApiProperty} from "@nestjs/swagger";

export class MakePaymentResponse {
  @ApiProperty({ example: '2db04dc2-000f-5000-8000-1105666ca32c' })
  id: string;

  @ApiProperty({ example: 'pending' })
  status: string;

  @ApiProperty({ example: { value: '100.00', currency: 'RUB' } })
  amount: {
    value: string;
    currency: string;
  }

  @ApiProperty({ example: 'Заказ №1' })
  description: string;

  @ApiProperty({
    example: {
      account_id: '370085',
      gateway_id: '2226992',
    },
  })
  recipient: {
    account_id: string;
    gateway_id: string;
  }

  @ApiProperty({ example: '2024-04-16T08:42:42.690Z' })
  created_at: string;

  @ApiProperty({
    example: {
      type: 'redirect',
      confirmation_url: 'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2db04dc2-000f-5000-8000-1105666ca32c',
    },
  })
  confirmation: {
    type: string;
    confirmation_url: string;
  }

  @ApiProperty({ example: true })
  test: boolean;

  @ApiProperty({ example: false })
  paid: boolean;

  @ApiProperty({ example: false })
  refundable: boolean;

  @ApiProperty({ example: {} })
  metadata: object;
}
