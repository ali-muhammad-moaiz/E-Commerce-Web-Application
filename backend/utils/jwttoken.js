const dotenv = require('dotenv');
dotenv.config({path:'backend/config/.env'});

const sendToken = async (userPayload) => {
    if(userPayload){
        const token = await userPayload.getJWTToken();
        const options = {
            expiress: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000     //to convert days into milliseconds
            ),
            httpOnly: true
        }

        var token_options = [];
        token_options.push(token);
        token_options.push(options);
        return token_options;
    }
}

module.exports.getToken = sendToken;