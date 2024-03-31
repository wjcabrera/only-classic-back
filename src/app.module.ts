import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UsersModule,
        SalesModule,
        ArticlesModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],      
            useFactory: (configService: ConfigService) => ({
                type: 'postgres' as 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                entities: ['dist/**/*.entity{.ts,.js}'],
                logging: true,
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        QuestionsModule,
        CategoriesModule,
        AuthModule,
        AttachmentsModule,
        // CorsModule.forRoot({
        //     origin: 'http://localhost:3000', // Cambia esto por el dominio de tu aplicación React
        //     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
        //     allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
        //     credentials: true, // Habilitar credenciales CORS (si necesitas enviar cookies)
        // }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
