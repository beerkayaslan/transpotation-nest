import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FollowedTransporterService } from './followed-transporter.service';
import { CreateFollowedTransporterDto } from './dto/create-followed-transporter.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserResponseDto } from '../../../auth/dto/login-response.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('customer - followed transporters')
@Controller('customers/followed-transporters')
export class DiscountsController {
    constructor(private readonly followedTransporterService: FollowedTransporterService) { }

    @Get()
    @Roles(Role.CUSTOMER)
    async getFollowedTransporters(@CurrentUser() user) {
        return this.followedTransporterService.getFollowedTransporters(user._id);
    }

    @Post()
    @Roles(Role.CUSTOMER)
    async createFollowTransporter(@CurrentUser() user, @Body() createFollowedTransporterDto: CreateFollowedTransporterDto) {
        return this.followedTransporterService.createFollowedTransporter(user.user._id, createFollowedTransporterDto.transporterId);
    }

    @Delete(":id")
    @Roles(Role.CUSTOMER)
    async deleteFollowTransporter(@Param('id') id: string, @CurrentUser() user: UserResponseDto) {
        return this.followedTransporterService.deleteFollowedTransporter(user.user._id, id);
    }

}
