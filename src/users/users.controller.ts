import {Controller, Header, HttpCode, HttpStatus, Get, Post, Body, Request, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LocalAuthGuard} from "../auth/local.auth.guard";
import {AuthenticatedGuard} from "../auth/authenticated.guard";

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() request) {
    return { user: request.user, msg: 'Logged in' }
  }

  @Get('login-check')
  @UseGuards(AuthenticatedGuard)
  loginCheck(@Request() request) {
    return request.user
  }

  @Get('logout')
  logout(@Request() request) {
    request.session.destroy();
    return { mgs: 'Session has ended' }
  }
}
