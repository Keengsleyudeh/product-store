import crypto from 'crypto';

// Generate a random string of 64 bytes and convert to base64
 export const generateSecret = () => {
    return crypto.randomBytes(64).toString('base64');
};

console.log('Your JWT Secret:', generateSecret());