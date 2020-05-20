const crypto     = require('crypto');

/* 암호화 (양방향) */
exports.cipher = (key,input) => {
  
    input = JSON.stringify(input);
    const cipher = crypto.createCipher('aes-256-cbc', key); 
    const cipheredOutput = cipher.update(input, 'utf8', 'base64')
    + cipher.final('base64');
    // console.log("암호화 : "+input+" -> "+cipheredOutput);
  
    return cipheredOutput;
}

/* 복호화 (양방향) */
exports.decipher = (key,input) => {

    input = JSON.stringify(input);
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    const decipheredOutput = decipher.update(input, 'base64', 'utf8')
    + decipher.final('utf8');
    //console.log("복호화 : "+input+" -> "+decipheredOutput);
  
    return decipheredOutput; 
}

// /* 암호화 (단방향) */
// exports.getCrypto = (input) => {

//     let output = "";
//     crypto.pbkdf2(input, 'salt', 100, 64, 'sha512', (err, derivedKey) => {
//       if (err) throw err;
//       console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
//       return derivedKey.toString('hex');
//     });
 
// }
