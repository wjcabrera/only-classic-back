import { Injectable } from '@nestjs/common';
import { CreateSeederDto } from './dto/create-seeder.dto';
import { UsersService } from 'src/users/users.service';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { ArticlesService } from 'src/articles/articles.service';
import { CurrencyEnum } from 'src/shared/enums/currency.enum';
import { CategoriesService } from 'src/categories/categories.service';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { SalesService } from 'src/sales/sales.service';
import { QuestionsService } from 'src/questions/questions.service';
import { NotificationsService } from 'src/notifications/notifications.service';
const { v4: uuidv4 } = require('uuid');

interface CustomMulterFile extends Express.Multer.File {
    stream: any; // Tipo específico del stream, puedes ajustarlo según tus necesidades
    buffer: Buffer; // Buffer del archivo, puedes ajustarlo según tus necesidades
}

@Injectable()
export class SeedersService {
    constructor(
        private readonly usersService: UsersService,
        private readonly articlesService: ArticlesService,
        private readonly categoriesService: CategoriesService,
        private readonly attachmentsService: AttachmentsService,
        private readonly salesService: SalesService,
        private readonly questionsService: QuestionsService,
        private readonly notificationsService: NotificationsService,
    ) {}
    async create(createSeederDto: CreateSeederDto) {
        if (createSeederDto.keySecret !== 'superSSSecret') {
            return 'Method not allowed';
        }

        await this.attachmentsService.clear();
        await this.salesService.clear();
        await this.questionsService.clear();
        await this.articlesService.clear();
        await this.categoriesService.clear();
        await this.notificationsService.clear();
        await this.usersService.clear();

        const user = await this.usersService.create({
            first_name: 'User',
            last_name: 'Admin',
            password: 'admin123',
            email: 'admin@gmail.com',
            role: RoleEnum.ADMIN,
            address: 'Calle 123',
            phone: '123456789',
            country: 'Argentina',
            identification: '123456789',
        });

        await this.usersService.confirm(user.id);

        const classics = await this.categoriesService.create({
            name: 'Cars',
        });

        const antiques = await this.categoriesService.create({
            name: 'Antiques',
        });

        const article = await this.articlesService.create(
            {
                title: 'Ford Mustang',
                description: 'Ford Mustang 1965',
                category_id: classics.id,
                location: 'Buenos Aires',
                price: 10000,
                year: 1965,
                brand: 'Ford',
                model: 'Mustang',
                currency: CurrencyEnum.USD,
            },
            user,
        );

        const otherArticle = await this.articlesService.create(
            {
                title: 'Toca discos',
                description: 'Toca discos antiguo',
                category_id: antiques.id,
                location: 'Buenos Aires',
                price: 100,
                year: 1980,
                brand: '',
                model: 'Toca discos',
                currency: CurrencyEnum.USD,
            },
            user,
        );

        const treeArticle = await this.articlesService.create(
            {
                title: 'Ford Falcon',
                description: 'Ford Falcon 1970',
                category_id: classics.id,
                location: 'Buenos Aires',
                price: 10000,
                year: 1970,
                brand: 'Ford',
                model: 'Falcon',
                currency: CurrencyEnum.USD,
            },
            user,
        );

        const fourArticle = await this.articlesService.create(
            {
                title: 'Chevrolet Camaro',
                description: 'Chevrolet Camaro 1969',
                category_id: classics.id,
                location: 'Buenos Aires',
                price: 10000,
                year: 1969,
                brand: 'Chevrolet',
                model: 'Camaro',
                currency: CurrencyEnum.USD,
            },
            user,
        );

        const fiveArticle = await this.articlesService.create(
            {
                title: 'Mercedes Benz 300 SL',
                description: 'Mercedes Benz 300 SL 1955',
                category_id: classics.id,
                location: 'Buenos Aires',
                price: 10000,
                year: 1955,
                brand: 'Mercedes Benz',
                model: '300 SL',
                currency: CurrencyEnum.USD,
            },
            user,
        );

        await this.attachmentsService.uploadSeeder(
            [
                'src/seeders/files/Mustang/0.jpg',
                'src/seeders/files/Mustang/1.jpg',
            ],
            {
                article_id: article.id,
            },
        );

        await this.attachmentsService.uploadSeeder(
            [
                'src/seeders/files/TocaDiscos/0.jpg',
                'src/seeders/files/TocaDiscos/1.jpg',
            ],
            {
                article_id: otherArticle.id,
            },
        );

        await this.attachmentsService.uploadSeeder(
            [
                'src/seeders/files/Falcon/0.jpg',
                'src/seeders/files/Falcon/1.jpg',
            ],
            {
                article_id: treeArticle.id,
            },
        );

        await this.attachmentsService.uploadSeeder(
            [
                'src/seeders/files/Camaro/0.jpg',
                'src/seeders/files/Camaro/1.jpg',
            ],
            {
                article_id: fourArticle.id,
            },
        );

        await this.attachmentsService.uploadSeeder(
            [
                'src/seeders/files/Mercedes/0.jpg',
                'src/seeders/files/Mercedes/1.jpg',
            ],
            {
                article_id: fiveArticle.id,
            },
        );

        return 'This action adds a new seeder';
    }
}
