import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class CreateCargo {

    @Prop({ type: String, required: true })
    userId: Types.ObjectId;

    @Prop({ type: String, required: true })
    transporterId: string;

    @Prop({ type: String, required: true })
    desi: string;

    @Prop({ type: Number, required: true })
    km: number;

    @Prop({ type: String, required: true })
    city1: string;

    @Prop({ type: String, required: true })
    city2: string;

    @Prop({ type: Number, required: true })
    price: number;
}

export const CreateCargoSchema = SchemaFactory.createForClass(CreateCargo);