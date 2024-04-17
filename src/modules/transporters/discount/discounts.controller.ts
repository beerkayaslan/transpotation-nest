import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserResponseDto } from '../../../auth/dto/login-response.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('transporters - discounts')
@Controller('transporters/discounts')
export class DiscountsController {
    constructor(private readonly discountService: DiscountsService) { }

    @Get()
    @Roles(Role.TRANSPORTER)
    async getDiscounts(@CurrentUser() user: UserResponseDto) {
        return this.discountService.getDiscounts(user);
    }

    @Post()
    @Roles(Role.TRANSPORTER)
    async createDiscount(@CurrentUser() user: UserResponseDto, @Body() createDiscountDto: CreateDiscountDto) {
        return this.discountService.createDiscount(user, createDiscountDto);
    }

    @Delete(":id")
    @Roles(Role.TRANSPORTER)
    async deleteDiscount(@Param('id') id: string, @CurrentUser() user: UserResponseDto) {
        return this.discountService.deleteDiscount(user, id);
    }

}
