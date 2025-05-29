import { Router } from 'express';
import { generatePet, generateUsers } from '../utils/mocking.js';
import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';
const router = Router();

router.get('/mockingpets', (req, res) => {
    const pets = [];

    for (let i = 0; i < 100; i++) {
    pets.push(generatePet());
    }

    res.status(200).send({ status: 'success', pets });
});

router.get('/mockingusers', (req, res) => {
    const users = generateUsers(50);


    const response = users.map((user, index) => ({
        _id: `mockid_${index}`,
        ...user,
        __v: 0,
    }));

    res.status(200).json({ status: 'success', users: response });
});

router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;

    try {
        const usersToInsert = generateUsers(users);
        const petsToInsert = [];

        for (let i = 0; i < pets; i++) {
            petsToInsert.push(generatePet());
    }

    const insertedUsers = await UserModel.insertMany(usersToInsert);
    const insertedPets = await PetModel.insertMany(petsToInsert);

    res.status(201).json({
        status: 'success',
        message: `Inserted ${insertedUsers.length} users and ${insertedPets.length} pets.`,
        users: insertedUsers,
        pets: insertedPets,
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Error inserting data' });
    }
});

export default router;
