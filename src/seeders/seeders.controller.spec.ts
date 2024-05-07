import { Test, TestingModule } from '@nestjs/testing';
import { SeedersController } from './seeders.controller';
import { SeedersService } from './seeders.service';

describe('SeedersController', () => {
    let controller: SeedersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SeedersController],
            providers: [SeedersService],
        }).compile();

        controller = module.get<SeedersController>(SeedersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
