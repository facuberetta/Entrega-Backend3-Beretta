import { faker } from '@faker-js/faker';

export const generateMockPets = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.animal.cat(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
        adopted: false,
        owner: null,
    };
};
