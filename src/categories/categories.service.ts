import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async create(createCategoryDto: CreateCategoryDto) {
        return await this.categoryRepository.save(createCategoryDto);
    }

    async findAll() {
        return await this.categoryRepository.findBy({ is_active: true });
    }

    async findOne(id: number) {
        return await this.categoryRepository.findOneByOrFail({
            id,
            is_active: true,
        });
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return await this.categoryRepository.update(id, updateCategoryDto);
    }

    async remove(id: number) {
        return await this.categoryRepository.update(id, { is_active: false });
    }
}
