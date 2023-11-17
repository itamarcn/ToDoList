import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:pi0qoWVCJ1dPHJXk@cluster0.5pz8zz4.mongodb.net/ToDoDB?retryWrites=true&w=majority'),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
