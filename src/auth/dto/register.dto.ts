import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Role } from "../role.enum";

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(150)
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    @IsStrongPassword({ minUppercase: 1, minSymbols: 1, minLength: 8, minLowercase: 1, minNumbers: 1 })
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    readonly role: string;
}