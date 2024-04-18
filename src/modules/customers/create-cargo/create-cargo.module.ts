import { Module } from '@nestjs/common';
import { FollowedTransporterService } from './create-cargo.service';
import { DiscountsController } from './create-cargo.controller';
import { CreateCargo, CreateCargoSchema } from './entities/create-cargo.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CreateCargo.name,
        schema: CreateCargoSchema,
      },
    ]),
  ],
  providers: [FollowedTransporterService],
  controllers: [DiscountsController]
})
export class CreateCargoModule {}
