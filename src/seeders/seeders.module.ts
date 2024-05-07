import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { SeedersController } from './seeders.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Article } from 'src/articles/entities/article.entity';
import { ArticlesService } from 'src/articles/articles.service';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { SalesService } from 'src/sales/sales.service';
import { Sale } from 'src/sales/entities/sale.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { Question } from 'src/questions/entities/question.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Notification } from 'src/notifications/entities/notification.entity';
import { EventGateway } from 'src/event/event.gateway';

@Module({
    controllers: [SeedersController],
    providers: [
        SeedersService,
        UsersService,
        ArticlesService,
        CategoriesService,
        AttachmentsService,
        SalesService,
        QuestionsService,
        NotificationsService,
        EventGateway,
    ],
    imports: [
        TypeOrmModule.forFeature([
            User,
            Article,
            Category,
            Attachment,
            Sale,
            Question,
            Notification,
        ]),
    ],
})
export class SeedersModule {}
