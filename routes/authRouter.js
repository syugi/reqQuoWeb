const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const adminUser = require('../models/adminUser');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { userId, userName, password } = req.body;
    try {
        const exUser = await adminUser.findOne({ where: { userId } });
        if (exUser) {
            return res.redirect('/admin/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await adminUser.create({
            userId,
            userName,
            password: hash,
        });
        return res.redirect('/admin');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/admin?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/admin');
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/admin');
});


module.exports = router;
