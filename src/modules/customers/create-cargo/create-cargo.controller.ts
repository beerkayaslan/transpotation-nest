import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCargoService } from './create-cargo.service';
import { CreateCreateCargoDto } from './dto/create-cargo.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { GetDto } from './dto/get.dto';

@ApiTags('customer - create-cargo')
@Controller('customers/create-cargo')
export class DiscountsController {
    constructor(private readonly createCargoService: CreateCargoService) { }

    @Get()
    @Roles(Role.CUSTOMER)
    async getCreateCargos(@CurrentUser() user, @Query() getDto: GetDto) {
        return this.createCargoService.getCargos(user._id, getDto);
    }

    @Post()
    @Roles(Role.CUSTOMER)
    async createFollowTransporter(@CurrentUser() user, @Body() createCreateCargoDto: CreateCreateCargoDto) {
        return this.createCargoService.createCargo(user._id, createCreateCargoDto);
    }

    @Delete(":id")
    @Roles(Role.CUSTOMER)
    async deleteFollowTransporter(@Param('id') id: string, @CurrentUser() user) {
        return this.createCargoService.deleteCargo(user._id, id);
    }

}
