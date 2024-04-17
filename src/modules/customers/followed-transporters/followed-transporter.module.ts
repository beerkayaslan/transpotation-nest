import { Module } from '@nestjs/common';
import { FollowedTransporterService } from './followed-transporter.service';
import { DiscountsController } from './followed-transporter.controller';
import { FollowedTransporter, FollowedTransporterSchema } from './entities/followedt-transporter.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FollowedTransporter.name,
        schema: FollowedTransporterSchema,
      },
    ]),
  ],
  providers: [FollowedTransporterService],
  controllers: [DiscountsController]
})
export class FollowedTransporterModule {}
