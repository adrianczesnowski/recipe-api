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

  @Put(':fruitId')
  updateFruit(
    @Body() fruit: { name: string },
    @Param('fruitId') fruitId: string,
  ) {
    return { message: `Fruit ${fruitId} updated.` };
  }

  @Delete(':fruitId')
  deleteFruit(@Param('fruitId') fruitId: string) {
    return { message: `Fruit ${fruitId} deleted.` };
  }
}
