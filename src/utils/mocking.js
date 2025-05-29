import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generatePet = () => {
    return {
        name: faker.person.firstName(),
        species: faker.animal.type(),
        age: faker.number.int({ min: 1, max: 15 }),
        breed: faker.animal.dog(),
        description: faker.lorem.sentence(),
        adopted: false,
    };
};

const roles = ['user', 'admin'];

export const generateUser = () => {
    const passwordPlain = 'coder123';
    const passwordHash = bcrypt.hashSync(passwordPlain, 10);

    return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: passwordHash,
    role: roles[Math.floor(Math.random() * roles.length)],
    pets: [],
    };
};

export const generateUsers = (count = 50) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(generateUser());
    }
    return users;
};
