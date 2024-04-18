import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FollowedTransporterService } from './create-cargo.service';
import { CreateFollowedTransporterDto } from './dto/create-cargo.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { GetDto } from './dto/get.dto';

@ApiTags('customer - transporters')
@Controller('customers/transporters')
export class DiscountsController {
    constructor(private readonly followedTransporterService: FollowedTransporterService) { }

    @Get()
    @Roles(Role.CUSTOMER)
    async getFollowedTransporters(@CurrentUser() user, @Query() getDto: GetDto) {
        return this.followedTransporterService.getFollowedTransporters(user._id, getDto);
    }

    @Post()
    @Roles(Role.CUSTOMER)
    async createFollowTransporter(@CurrentUser() user, @Body() createFollowedTransporterDto: CreateFollowedTransporterDto) {
        return this.followedTransporterService.createFollowedTransporter(user._id, createFollowedTransporterDto.transporterId);
    }

    @Delete(":id")
    @Roles(Role.CUSTOMER)
    async deleteFollowTransporter(@Param('id') id: string, @CurrentUser() user) {
        return this.followedTransporterService.deleteFollowedTransporter(user._id, id);
    }

}
