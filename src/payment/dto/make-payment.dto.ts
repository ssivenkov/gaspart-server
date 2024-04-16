import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class MakePaymentDto {
  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  readonly amount: number;
}
