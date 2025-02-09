const router = require('express').Router();
const {handleCreateUser,handleLoginUser} = require("../controllers/user")

router.post('/signup', handleCreateUser);
router.post('/signin', handleLoginUser);

module.exports = router;