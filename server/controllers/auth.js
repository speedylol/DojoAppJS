
const db = require('../db')
const {hash} = require('bcryptjs');
const {sign} = require('jsonwebtoken')


exports.getNinjas = async (req, res) => {
    try {
        const {rows} = await db.query('select name, belt from active_ninjas')
        
        return res.status(200).json({
            success: true,
            ninjas: rows
        })
        
    } catch(err) {
        console.log(err.message)
    }
}

exports.register = async (req, res) => {

    const {username, password} = req.body

    try {
        const hashedPass =  await hash(password, 10)

        await db.query('INSERT INTO active_ninjas(username,password) VALUES ($1, $2)', [username, hashedPass])

        return res.status(201).json({
            success: true,
            message: 'Successful Registration'
        })

    } catch(err) {
        console.log(err.message)
        return res.status(500).json({
            error: err.message
        })
    }
}


exports.login = async (req, res) => {

    let user = req.user
    let payload = {
        id: user.user_id,
        username: user.username,
    }
    try {
        const token = await sign(payload, process.env.SECRET)

        return res.status(200).cookie('token', token, {httpOnly: true}).json({
            success: true,
            message: 'Logged in successfully'
        })

        return res.status(200).json({
            payload,
        })
    } catch(err) {
        console.log(err.message)
    }
}

