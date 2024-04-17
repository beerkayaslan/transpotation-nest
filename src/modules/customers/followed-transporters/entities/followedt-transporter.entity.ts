import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true, })
export class FollowedTransporter {
    @Prop({ required: true })
    transporterId: string[];

    @Prop({ required: true })
    customerId: string;

}

export const FollowedTransporterSchema = SchemaFactory.createForClass(FollowedTransporter);