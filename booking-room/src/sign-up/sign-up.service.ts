/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { HttpException, HttpStatus } from '@nestjs/common';

import { hash } from 'utilities/bcrypt';
import { validate } from 'class-validator';

@Injectable()
export class SignUpService {
  constructor(private prisma: PrismaService) { }

  async signUp(createSignUpDto: CreateSignUpDto) {
    const errors = await validate(createSignUpDto);
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
        email: createSignUpDto.email,
      },
    })
      .then(founded_user => {
        if (founded_user) {
          throw new HttpException(
            `User with email ${createSignUpDto.email} is already exist!`,
            HttpStatus.BAD_REQUEST,
          );
        }

        createSignUpDto.password = hash(createSignUpDto.password);

        return this.prisma.users.create({
          data: createSignUpDto
        })
          .then(() => {
            return {
              message: `SingUp complated successfull!`
            }
          })
          .catch(error => {
            throw new HttpException(
              {
                message: `Error while created user!`,
                error: error
              },
              HttpStatus.BAD_REQUEST,
            );
          });
      })
      .catch(error => {
        throw new HttpException(
          {
            message: `Error while getting user with email ${createSignUpDto.email}`,
            error: error
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
