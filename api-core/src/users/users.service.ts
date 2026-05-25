import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: { name: string; email: string }) {
    // Acesso direto ao modelo 'user'
    const emailExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (emailExists) {
      throw new ConflictException('Este e-mail já está a ser utilizado.');
    }

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
      },
    });
  }

  async findAll() {
    // Acesso direto ao modelo 'user'
    return this.prisma.user.findMany();
  }
}