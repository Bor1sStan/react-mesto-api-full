const router = require('express').Router();
const userController = require('../controllers/usersController');
const { validateLoginData, validateRegisterData } = require('../utils/validators/userValidators');
const cardsRoute = require('./cardsRoute');
const usersRoute = require('./usersRoute');
const auth = require('../middlewares/authMiddleware');
const NotFoundCode = require('../errors/notFoundCode');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateLoginData, userController.login);
router.post('/signup', validateRegisterData, userController.createUser);

router.use(auth);
router.use('/users', usersRoute);
router.use('/cards', cardsRoute);
router.get('/signout', userController.logout);
router.use(() => {
  throw new NotFoundCode('Ресурс не найдет. Проверьте адрес');
});

module.exports = router;
