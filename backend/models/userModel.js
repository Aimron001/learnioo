import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: 'string',
            required: true,
        },
        lastname: {
            type: 'string',
            required: true,
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: 'string',
        },
        password: {
            type: 'string',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User',userSchema)

export default User