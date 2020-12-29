import User from '../models/users.js';
import Users from '../models/users.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

export const getUsers = async (req, res) => {
    try {
        const allUsers = await Users.find();

        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const insertUser = async (req, res) => {
   // const user = req.body;
    const newUser = new Users({username: req.body.username, name: req.body.name, password: bcrypt.hashSync(req.body.password, 8)});
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const currentUser = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                user: user._id,
                username: user.username,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({message: 'Invalid user or password'});
}
