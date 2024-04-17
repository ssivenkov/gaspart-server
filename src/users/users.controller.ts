import {Controller, Header, HttpCode, HttpStatus, Get, Post, Body, Request, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LocalAuthGuard} from "../auth/local.auth.guard";
import {AuthenticatedGuard} from "../auth/authenticated.guard";
import {ApiBody, ApiOkResponse} from "@nestjs/swagger";
import {LoginCheckResponse, LoginUserRequest, LoginUserResponse, LogoutUserResponse, SignUpResponse} from "./types";

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) {}

  @ApiOkResponse({ type: SignUpResponse }) // for Swagger
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiBody({ type: LoginUserRequest }) // for Swagger
  @ApiOkResponse({ type: LoginUserResponse }) // for Swagger
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() request) {
    return { user: request.user, msg: 'Logged in' }
  }

  @ApiOkResponse({ type: LoginCheckResponse }) // for Swagger
  @Get('login-check')
  @UseGuards(AuthenticatedGuard)
  loginCheck(@Request() request) {
    return request.user
  }

  @ApiOkResponse({ type: LogoutUserResponse }) // for Swagger
  @Get('logout')
  logout(@Request() request) {
    request.session.destroy();
    return { msg: 'Session has ended' }
  }
}
