import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { TasksModule } from './modules/task/tasks.module';
import { TasksGateway } from './tasks.gateway';

@Module({
  imports: [
    DatabaseModule,
    TasksModule
  ],
  controllers: [],
  providers: [TasksGateway],
})
export class AppModule {}
