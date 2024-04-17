import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowedTransporterDto {
    
    @ApiProperty({
        description: 'Transporter ID',
        type: 'string',
        example: '60f6b1f8f2d7c9001f8b4567',
    })
    @IsString()
    @IsNotEmpty()
    transporterId: string;

    @ApiProperty({
        description: 'Customer ID',
        type: 'string',
        example: '60f6b1f8f2d7c9001f8b4567',
    })
    @IsString()
    @IsNotEmpty()
    customerId: string;
  
}