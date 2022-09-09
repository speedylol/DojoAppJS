const {Router} = require('express')
const { getNinjas, register, login } = require('../controllers/auth')
const { registerValidation, loginValidation } = require('../validators/auth')
const { validationMiddleware } = require('../middlewares/validations-middleware')

const router = Router()

router.get('/get-ninjas', getNinjas)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)

module.exports = router