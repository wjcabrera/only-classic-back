import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { EventGateway } from 'src/event/event.gateway';

@Module({
    controllers: [NotificationsController],
    providers: [NotificationsService, UsersService, EventGateway],
    imports: [TypeOrmModule.forFeature([Notification, User])],
})
export class NotificationsModule {}
