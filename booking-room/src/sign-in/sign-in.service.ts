import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSignInDto } from './dto/create-sign-in.dto';
import { validate } from 'class-validator';

import { PrismaService } from 'src/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import config from 'config';
import { getEndTime } from 'utilities/token';

const jwtSecret = config.jwt.JWT_USER_SECRET;

@Injectable()
export class SignInService {
  constructor(private prisma: PrismaService) { }

  async sign_in(createSignInDto: CreateSignInDto) {
    const errors = await validate(createSignInDto);
    if (errors.length > 0) {
      throw new HttpException(
        {
          message: `Validation error`,
          errors: errors
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.users.findUnique({
      where: {
        email: createSignInDto.email,
      },
    })
      .then(founded_user => {
        if (!founded_user) {
          return new HttpException(
            `User with email ${createSignInDto.email} is not found!`,
            HttpStatus.BAD_REQUEST,
          );
        }

        const isPasswordValid = bcrypt.compareSync(createSignInDto.password, founded_user.password);

        if (!isPasswordValid) {
          return new HttpException(
            `Email or password is incorrect!`,
            HttpStatus.BAD_REQUEST,
          );
        }

        const access_token = jwt.sign({ ...founded_user }, jwtSecret, { expiresIn: '2d' });
        return {
          access_token: access_token,
          expire: getEndTime()
        };
      })
      .catch(error => {
        throw new HttpException(
          {
            message: `Error while getting user with email '${createSignInDto.email}'`,
            error: error
          },
          HttpStatus.BAD_REQUEST,
        );
      })
  }
}
