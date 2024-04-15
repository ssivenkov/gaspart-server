import {ApiProperty} from "@nestjs/swagger";

class ShoppingCartItem {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 14 })
  partId: number;

  @ApiProperty({ example: 9133 })
  price: number;

  @ApiProperty({ example: 3 })
  in_stock: number;

  @ApiProperty({ example: 0 })
  count: number;

  @ApiProperty({ example: 9133 })
  total_price: number;

  @ApiProperty({ example: 4 })
  id: number;

  @ApiProperty({ example: "Baxi" })
  boiler_manufacturer: string;

  @ApiProperty({ example: "Gasoline" })
  parts_manufacturer: string;

  @ApiProperty({ example: "https://loremflickr.com/640/480/technics?random=208741313809697994333882989031" })
  image: string;

  @ApiProperty({ example: "Blanditiis labore." })
  name: string;

  @ApiProperty({ example: "2024-04-15T14:18:31.254Z" })
  updatedAt: string;

  @ApiProperty({ example: "2024-04-15T14:18:31.254Z" })
  createdAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}

export class AddToCartResponse extends ShoppingCartItem {}

export class UpdateCountResponse {
  @ApiProperty({ example: 1 })
  count: number;
}
export class UpdateCountRequest {
  @ApiProperty({ example: 1 })
  count: number;
}

export class UpdateTotalPriceResponse {
  @ApiProperty({ example: 1 })
  total_price: number;
}
export class UpdateTotalPriceRequest {
  @ApiProperty({ example: 1000 })
  total_price: number;
}
