import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            email: "info@cruekn.ru",
            password: 'changeme',
            firstName: 'John',
            lastName: 'Black',

        },
        {
            userId: 2,
            email: "info2@cruekn.ru",
            password: 'mypass2',
            firstName: 'Kris',
            lastName: 'Gamilton',
        },
    ];

    async findOne(id: number): Promise<User | undefined> {
        return this.users.find(user => user.userId === id);
    }
}