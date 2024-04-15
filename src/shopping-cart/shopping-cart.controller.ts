import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ShoppingCartService} from "./shopping-cart.service";
import {AuthenticatedGuard} from "../auth/authenticated.guard";
import {AddToCartDto} from "./dto/add-to-cart.dto";
import {ApiBody, ApiOkResponse} from "@nestjs/swagger";
import {
  GetAllResponse,
  UpdateCountRequest,
  UpdateCountResponse,
  UpdateTotalPriceRequest,
  UpdateTotalPriceResponse
} from "./types";

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiOkResponse({ type: [GetAllResponse] }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Get(':id') // user id
  getAll(@Param('id') userId: string) {
    return this.shoppingCartService.findAll(userId);
  }

  @ApiOkResponse({ type: GetAllResponse }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Post('/add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.shoppingCartService.add(addToCartDto);
  }

  @ApiOkResponse({ type: UpdateCountResponse }) // for Swagger
  @ApiBody({ type: UpdateCountRequest }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Patch('/count/:id') // part id
  updateCount(
    @Body() { count }: { count: number },
    @Param('id') partId: string,
  ) {
    return this.shoppingCartService.updateCount(count, partId);
  }

  @ApiOkResponse({ type: UpdateTotalPriceResponse }) // for Swagger
  @ApiBody({ type: UpdateTotalPriceRequest }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Patch('/total-price/:id') // part id
  updateTotalPrice(
    @Body() { total_price }: { total_price: number },
    @Param('id') partId: string,
  ) {
    return this.shoppingCartService.updateTotalPrice(total_price, partId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/one/:id') // part id
  removeOne(@Param('id') partId: string) {
    return this.shoppingCartService.remove(partId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/all/:id') // user id
  removeAll(@Param('id') userId: string) {
    return this.shoppingCartService.removeAll(userId);
  }
}
