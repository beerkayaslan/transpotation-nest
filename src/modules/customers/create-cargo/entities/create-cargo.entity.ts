import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'users'})
export class FollowedTransporter {
    @Prop({ required: false})
    followers?: string[];
}

export const FollowedTransporterSchema = SchemaFactory.createForClass(FollowedTransporter);