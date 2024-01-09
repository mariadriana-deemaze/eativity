import { Test, TestingModule } from '@nestjs/testing';
import { FatSecretController } from './fat-secret.controller';

describe('FatSecretController', () => {
  let controller: FatSecretController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FatSecretController],
    }).compile();

    controller = module.get<FatSecretController>(FatSecretController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
