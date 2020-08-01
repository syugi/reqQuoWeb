const express    = require('express');
const multer     = require('multer');
const path       = require('path');
const fs         = require('fs');
const dateformat = require('date-format');
const is         = require('is-0')
const smsSend    = require('./smsSend.js');

const { AtchFile, ReqQuo, SendMsg } = require('../models');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { files: 10, fileSize: 1024 * 1024 * 1024, } // fileSize: 5 * 1024 * 1024
});

router.post('/', upload.array('img_file'), async (req, res, next) => {
  try {
    console.log("post --> " + JSON.stringify(req.body));

    const ReqDate = dateformat.asString('yyyyMMdd', new Date()); //요청일자

    const post = await ReqQuo.create({
      custNm: req.body.custNm,
      telNo: req.body.telNo,
      reqDate: ReqDate,
      //emailId: req.body.url,
      //emailDown: req.body.url,
      upjong: req.body.upjong,
      boilerType: req.body.boilerType,
      postCode: req.body.postCode,
      addr: req.body.addr,
      dtlAddr: req.body.dtlAddr,
      extAddr: req.body.extAddr,
      descr: req.body.descr,
      custType: req.body.custType,
    });

    const ReqQuoId = post.id;
    console.log("ReqQuoId --> " + ReqQuoId);

    //첨부파일 저장
    const files = req.files;
    console.log(files);
    if (!is.empty(files)) {

      files.forEach((file, index) => {

        const postAtch = AtchFile.create({
          ReqQuoId: ReqQuoId,
          orgFileNm: file.originalname,
          strFileNm: file.filename,
          filePath: file.path,
          fileSize: file.size,
          fileType: file.mimetype,
          //fileDescr: file.fileDescr,
        });
      });
    }

    //문자발송 
    smsSend.sendToCompany(ReqQuoId);

    res.redirect('/reqQuoteResult');

  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;
