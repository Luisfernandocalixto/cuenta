const z = require("zod");

const user = z.object({
    name: z.string({ message: 'name invalid!' }).trim({}).min(1, { message: 'name empty!' }),
    email: z.string('email invalid!').trim().min(1, { message: 'email empty!' }).email({ message: 'email invalid!' }),
    password: z.string({ message: 'password  invalid!' }).trim({}).min(1, { message: 'password empty!' }),

});


function validateUserSignup(input) {
    return user.safeParse(input);
}

function validateUserSignIn(input) {
    return user.partial().safeParse(input);
}

module.exports = {
    validateUserSignup,
    validateUserSignIn 
};

