import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { ArticlesModule } from './articles/articles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from './questions/questions.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { AttachmentsModule } from './attachments/attachments.module';

@Module({
    imports: [
        UsersModule,
        SalesModule,
        ArticlesModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'database',
            port: 5432,
            username: 'only_classics',
            password: 'S3cret',
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true,
        }),
        QuestionsModule,
        CategoriesModule,
        AuthModule,
        AttachmentsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
