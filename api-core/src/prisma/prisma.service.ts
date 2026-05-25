import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Garante o carregamento das variáveis antes da criação do Pool
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // No Prisma 7, passamos o Driver Adapter oficial configurado com a sua DATABASE_URL
    super({
      adapter: new PrismaPg(
        new Pool({
          connectionString: process.env.DATABASE_URL,
        }),
      ),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}