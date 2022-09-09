const { check } = require('express-validator')
const db = require('../db')

const {compare} = require('bcryptjs')

const password = check('password')
    .isLength( {min: 6, max: 32} )
    .withMessage('Password must be 2 to 32 characters long.')

//const username = check('username').isUsername().withMessage('')

const userExists = check('username').custom(async (value) => {
    const { rows } = await db.query('SELECT * FROM active_ninjas WHERE username = $1',[
        value,
    ])

    if (rows.length) {
        throw new Error('Username already taken.')
    }
})


const loginFieldsCheck = check('username').custom(async (value, { req }) => {
    const ninja = await db.query('SELECT * FROM active_ninjas WHERE username = $1',[ value])

    if(!ninja.rows.length) {
        throw new Error('User does not exist')
    }

    const validPass = await compare(req.body.password, ninja.rows[0].password)

    if(!validPass) {
        throw new Error("Incorrect Password")
    }

    req.user = ninja.rows[0]


    //return console.log(req.body)
})


module.exports = {
    registerValidation: [password, userExists],
    loginValidation: [loginFieldsCheck],
}

