import {ApiProperty} from "@nestjs/swagger";

export interface IBoilerPartsQuery {
  limit: string;
  offset: number;
}

class BoilerParts {
  @ApiProperty({ example: 43 })
  id: number

  @ApiProperty({ example: "Ariston" })
  boiler_manufacturer: string

  @ApiProperty({ example: 9101 })
  price: number

  @ApiProperty({ example: "Radian" })
  parts_manufacturer: string

  @ApiProperty({ example: "HnXLUrqTY8Ly2yA" })
  vendor_code: string

  @ApiProperty({ example: "Provident ad." })
  name: string

  @ApiProperty({ example: "Suscipit occaecati aliquam cum deserunt in rem ducimus unde eos." })
  description: string

  @ApiProperty({ example: "[\"https://loremflickr.com/640/480/technics?random=865685184568990257054931234192\",\"https://loremflickr.com/640/480/technics?random=809795853237556455259165912621\",\"https://loremflickr.com/640/480/technics?random=101300868552708130380000348997\",\"https://loremflickr.com/640/480/technics?random=526619209936106390496673425663\",\"https://loremflickr.com/640/480/technics?random=961067831289366840567064230455\",\"https://loremflickr.com/640/480/technics?random=668863792474189160443021166652\",\"https://loremflickr.com/640/480/technics?random=503585043237208280458475928964\"]" })
  images: string

  @ApiProperty({ example: 8 })
  in_stock: number

  @ApiProperty({ example: true })
  bestseller: boolean

  @ApiProperty({ example: true })
  new: boolean

  @ApiProperty({ example: 548 })
  popularity: number

  @ApiProperty({ example: "Adipisci id ea dolore hic repellendus consequuntur." })
  compatibility: string

  @ApiProperty({ example: "2024-04-12T12:19:06.000Z" })
  createdAt: string

  @ApiProperty({ example: "2024-04-12T12:19:06.000Z" })
  updatedAt: string
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: BoilerParts, isArray: true })
  rows: BoilerParts[];
}

class Bestsellers extends BoilerParts {
  @ApiProperty({ example: true })
  bestseller: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: BoilerParts, isArray: true })
  rows: Bestsellers[];
}

class NewParts extends BoilerParts {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: BoilerParts, isArray: true })
  rows: NewParts[];
}

export class SearchByLetterResponse extends BoilerParts {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse[];
}

export class SearchRequest {
  @ApiProperty({ example: 'r' })
  search: string;
}

export class SearchByNameResponse extends BoilerParts {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class SearchByNameRequest {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class FindOneResponse extends BoilerParts {}
