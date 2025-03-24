/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { HttpException, HttpStatus } from '@nestjs/common';

import { hash } from 'utilities/bcrypt';

@Injectable()
export class SignUpService {
  constructor(private prisma: PrismaService) { }

  signUp(createSignUpDto: CreateSignUpDto) {
    this.prisma.users.findUnique({
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

        this.prisma.users.create({
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
