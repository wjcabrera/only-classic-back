import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { UpdateNotificationDto } from './dto/updateNotification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from 'src/users/entities/user.entity';
import { EventGateway } from 'src/event/event.gateway';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';

@Injectable()
export class NotificationsService {
    private readonly emitter: EventEmitter;

    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        private readonly eventGateway: EventGateway,
    ) {
        this.emitter = new EventEmitter();
    }

    async create(createNotificationDto: CreateNotificationDto, user: User) {
        const notification = await this.notificationRepository.save({
            ...createNotificationDto,
            user,
        });

        this.emit(notification);

        this.eventGateway.sendNotificationToClient(notification);

        return notification;
    }

    async findAll(userID: number) {
        return await this.notificationRepository
            .createQueryBuilder('notification')
            .where('notification.user_id = :userID', { userID })
            .getMany();
    }

    async findOne(id: number) {
        return await this.notificationRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateNotificationDto: UpdateNotificationDto) {
        return await this.notificationRepository.update(
            id,
            updateNotificationDto,
        );
    }

    remove(id: number) {
        return this.notificationRepository.delete(id);
    }

    read(id: number) {
        return this.notificationRepository.update(id, { read: true });
    }

    subscribe() {
        return fromEvent(this.emitter, 'notification');
    }

    async emit(data: Notification) {
        this.emitter.emit('notification', { data });
    }

    async clear() {
        return await this.notificationRepository.delete({});
    }
}
