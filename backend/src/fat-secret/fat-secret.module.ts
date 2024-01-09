import { Module } from '@nestjs/common';
import { FatSecretService } from './fat-secret.service';
import { FatSecretController } from './fat-secret.controller';

@Module({
  providers: [FatSecretService],
  controllers: [FatSecretController]
})
export class FatSecretModule {}
