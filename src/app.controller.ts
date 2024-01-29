import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller()
export class AppController {
  fruits = [{ name: 'Apple' }, { name: 'Banana' }];
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('/fruits')
  getFruit() {
    return this.fruits;
  }

  @Post('')
  createFruit(@Body() fruit: { name: string }) {
    this.fruits.push(fruit);
    return { message: 'Fruit created.' };
  }
}
