import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateCreateCargoDto {

    @IsString()
    @IsNotEmpty()
    transporterId: string;

    @IsString()
    @IsNotEmpty()
    desi: string;

    @IsString()
    @IsNotEmpty()
    km: string;

    @IsString()
    @IsNotEmpty()
    city1: string;
    
    @IsString()
    @IsNotEmpty()
    city2: string;

    @IsString()
    @IsOptional()
    code?: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;    

}