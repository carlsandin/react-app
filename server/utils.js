import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        username: user.username,
        name: user.name
    }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}