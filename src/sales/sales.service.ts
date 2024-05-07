import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/createSale.dto';
import { UpdateSaleDto } from './dto/updateSale.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale)
        private salesRepository: Repository<Sale>,
        private readonly articlesService: ArticlesService,
    ) {}

    async create(createSaleDto: CreateSaleDto, user: User) {
        const article = await this.articlesService.findOne(
            createSaleDto.article_id,
        );
        await this.articlesService.remove(createSaleDto.article_id);
        return this.salesRepository.save({
            ...createSaleDto,
            buyer: user,
            article,
        });
    }

    async findAll(userID: number) {
        console.log(userID);
        return await this.salesRepository
            .createQueryBuilder('sale')
            .where('sale.user_id = :userID', { userID })
            .getMany();
    }

    async findOne(id: number) {
        try {
            return await this.salesRepository.findOneByOrFail({ id });
        } catch (error) {
            throw new BadRequestException('Sale not found');
        }
    }

    update(id: number, updateSaleDto: UpdateSaleDto) {
        return `This action updates a #${id} sale`;
    }

    remove(id: number) {
        return `This action removes a #${id} sale`;
    }

    async clear() {
        return await this.salesRepository.delete({});
    }
}
