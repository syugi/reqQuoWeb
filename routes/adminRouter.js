const express = require('express');
const smsSend = require('./smsSend.js');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { AtchFile, ReqQuo, SendMsg } = require('../models');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.render('login', { title: "로그인 - " + process.env.COMPANY_NAME });
    } else {
        try {
            const reqQuos = await ReqQuo.findAll({
                include: {
                    model: SendMsg,
                    attributes: ['id', 'sendYn'],
                },
                order: [['createdAt', 'DESC'],[{model: SendMsg}, 'sendYn' ,'DESC']],
            });
            res.render('admin', {
                title: "관리자페이지 - " + process.env.COMPANY_NAME,
                reqQuos,
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
});

//router.get('/detail', isLoggedIn, async (req, res, next) => {
router.get('/detail', async (req, res, next) => {
    const reqId = req.query.id;

    try {
        const reqQuo = await ReqQuo.findOne({
            where: {
                id: reqId
            },
            include: {
                model: SendMsg,
                attributes: ['sendYn'],
            },
            order: [[{model: SendMsg}, 'sendYn' ,'DESC']],
        });
        const files = await AtchFile.findAll({ where: { ReqQuoId: reqId } });
        res.render('detail', {
            title: "상세페이지 - " + process.env.COMPANY_NAME,
            reqQuo,
            files,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }

});

//router.get('/join', isNotLoggedIn, (req, res, next) => {
router.get('/join', (req, res, next) => {
    res.render('join', { title: "회원가입 - " + process.env.COMPANY_NAME });
});

router.get('/msgReSend', async (req, res, next) => {
    try {
        const reqId = req.query.id;

        //문자발송 
        await smsSend.sendToCompany(reqId);
    
        res.redirect('/admin/detail?id='+ reqId);

    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = router;
