import { checkSchema } from "express-validator"


export  const authValidator = {
  signUp: checkSchema({
    name:{
      trim: true,
      isLength: {
        options: { min: 2 }
      },
      errorMessage: 'Minimum 2 Characters Is Required'
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Invalid Email'
    },
    password: {
      isLength: {
        options: { min: 8 }
      },
      errorMessage: 'Minimum 2 Characters Is Required To Password'
    },
    state: {
      notEmpty: true,
      errorMessage: 'The State Has Not Been Filled'
    }
  })
}

