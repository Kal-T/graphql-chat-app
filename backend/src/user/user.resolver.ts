import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.type';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as GraphQlUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService){}

    @UseGuards(GraphQlUpload)
    @Mutation(() => User)
    async updateProfile(
        @Args('fullname') fullname: string,
        @Args('file', { type: () => GraphQlUpload, nullable: true})
        file: GraphQlUpload.FileUpload,
        @Context() context: { req: Request},
    ){
        const imageUrl = file ? await this.storeImageAndGetUrl(file) : null;
        const userId = context.req.user.sub;
        return this.userService.updateProfile(userId, fullname, imageUrl);
    }

    private async storeImageAndGetUrl(file: GraphQlUpload){
        const { createReadStream, filename } = await file;
        const uniqueFilename = `${uuidv4()}_${filename}`;
        const imagePath = join(process.cwd(), 'public', uniqueFilename);
        const imageUrl = `${process.env.APP_URL}/${uniqueFilename}`;
        const readStream = createReadStream();
        readStream.pipe(createWriteStream(imagePath));
    }
}
