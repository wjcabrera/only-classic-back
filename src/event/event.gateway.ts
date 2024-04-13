import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Notification } from 'src/notifications/entities/notification.entity';

@WebSocketGateway()
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log('New client connected', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected', client.id);
    }

    // @SubscribeMessage('notification')
    // handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    //     console.log(data);
    // }

    sendNotificationToClient(notification: Notification) {
        this.server.emit('notification', notification);
    }
}
