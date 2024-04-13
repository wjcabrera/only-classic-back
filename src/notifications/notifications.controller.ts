import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    Sse,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { UpdateNotificationDto } from './dto/updateNotification.dto';
import { UsersService } from 'src/users/users.service';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly usersService: UsersService,
    ) {}

    @Sse('sse')
    sse() {
        return this.notificationsService.subscribe();
    }

    @Post('read/:id')
    async read(@Param('id') id: string) {
        return await this.notificationsService.read(+id);
    }

    @Post()
    async create(
        @Body() createNotificationDto: CreateNotificationDto,
        @Request() req: any,
    ) {
        const user = await this.usersService.findOne(req.user.id);
        return await this.notificationsService.create(
            createNotificationDto,
            user,
        );
    }

    @Get()
    async findAll(@Request() req: any) {
        return await this.notificationsService.findAll(req.user.sub);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.notificationsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateNotificationDto: UpdateNotificationDto,
    ) {
        return this.notificationsService.update(+id, updateNotificationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.notificationsService.remove(+id);
    }
}
