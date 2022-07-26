import { checkSchema } from "express-validator"


export  const UserValidator = {
  editAction: checkSchema({
    token: {
      notEmpty: true
    },
    name:{
      optional: true,
      trim: true,
      isLength: {
        options: { min: 2 }
      },
      errorMessage: 'Minimum 2 Characters Is Required'
    },
    email: {
      optional: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Invalid Email'
    },
    password: {
      optional: true,
      isLength: {
        options: { min: 8 }
      },
      errorMessage: 'Minimum 8 Characters Is Required To Password'
    },
    state: {
      optional: true,
      notEmpty: true,
      errorMessage: 'The State Has Not Been Filled'
    }
  })
}

