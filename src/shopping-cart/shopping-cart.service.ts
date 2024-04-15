import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ShoppingCart} from "./shopping-cart.model";
import {UsersService} from "../users/users.service";
import {BoilerPartsService} from "../boiler-parts/boiler-parts.service";
import {AddToCartDto} from "./dto/add-to-cart.dto";

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart)
    private readonly shoppingCartModel: typeof ShoppingCart,
    private readonly userService: UsersService,
    private readonly boilerPartsService: BoilerPartsService,
  ) {}

  async findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.findAll({ where: { userId} });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = await this.userService.findOne({ where: { username: addToCartDto.username } });
    const cartPart = await this.boilerPartsService.findOne(addToCartDto.partId);

    cart.userId = user.id;
    cart.partId = cartPart.id;
    cart.boiler_manufacturer = cartPart.boiler_manufacturer;
    cart.parts_manufacturer = cartPart.parts_manufacturer;
    cart.price = cartPart.price;
    cart.in_stock = cartPart.in_stock;
    cart.image = JSON.parse(cartPart.images)[0];
    cart.name = cartPart.name;
    cart.total_price = cartPart.price;

    return cart.save();
  }

  async updateCount(count: number, partId: number | string): Promise<{ count: number }> {
    await this.shoppingCartModel.update({ count }, { where: { partId} });
    const part = await this.shoppingCartModel.findOne({ where: { partId } });

    return { count: part.count }
  }

  async updateTotalPrice(total_price: number, partId: number | string): Promise<{ total_price: number }> {
    await this.shoppingCartModel.update({ total_price }, { where: { partId} });
    const part = await this.shoppingCartModel.findOne({ where: { partId } });

    return { total_price: part.total_price }
  }

  async remove(partId: number | string): Promise<void> {
    const part = await this.shoppingCartModel.findOne({ where: { partId } });

    await part.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.shoppingCartModel.destroy({ where: { userId } });
  }
}
