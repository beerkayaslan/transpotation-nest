import { Module } from '@nestjs/common';
import { FollowedTransporterService } from './create-cargo.service';
import { DiscountsController } from './create-cargo.controller';
import { FollowedTransporter, FollowedTransporterSchema } from './entities/create-cargo.entity';
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
