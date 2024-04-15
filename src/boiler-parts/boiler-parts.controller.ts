import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {BoilerPartsService} from "./boiler-parts.service";
import {AuthenticatedGuard} from "../auth/authenticated.guard";
import {ApiBody, ApiOkResponse} from "@nestjs/swagger";
import {
  FindOneResponse,
  GetBestsellersResponse,
  GetNewResponse,
  PaginateAndFilterResponse, SearchByNameRequest, SearchByNameResponse, SearchRequest,
  SearchResponse
} from "./types";

@Controller('boiler-parts')
export class BoilerPartsController {
  constructor(private readonly boilerPartsService: BoilerPartsService) {}

  @ApiOkResponse({ type: PaginateAndFilterResponse }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.boilerPartsService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: FindOneResponse }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Get('find/:id') // boiler part id
  getOne(@Param('id') boilerPartId:string) {
    return this.boilerPartsService.findOne(boilerPartId);
  }

  @ApiOkResponse({ type: GetBestsellersResponse }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Get('bestsellers')
  getBestsellers() {
    return this.boilerPartsService.bestsellers();
  }

  @ApiOkResponse({ type: GetNewResponse }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Get('new')
  getNew() {
    return this.boilerPartsService.new();
  }

  @ApiOkResponse({ type: SearchResponse }) // for Swagger
  @ApiBody({ type: SearchRequest }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.boilerPartsService.findOneByString(search);
  }

  @ApiOkResponse({ type: SearchByNameResponse }) // for Swagger
  @ApiBody({ type: SearchByNameRequest }) // for Swagger
  @UseGuards(AuthenticatedGuard)
  @Post('name')
  searchByName(@Body() { name }: { name: string }) {
    return this.boilerPartsService.findOneByName(name);
  }
}
