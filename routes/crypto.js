const crypto     = require('crypto');

/* 암호화 */
exports.cipher = (key,input) => {
  
    input = JSON.stringify(input);
    const cipher = crypto.createCipher('aes192', key); 
    cipher.update(input, 'utf8', 'base64');
    const cipheredOutput = cipher.final('base64');
    // console.log("암호화 : "+input+" -> "+cipheredOutput);
  
    return cipheredOutput;
}

/* 복호화 */
exports.decipher = (key,input) => {

    input = JSON.stringify(input);
    const decipher = crypto.createDecipher('aes192', 'reqid');
    decipher.update(input, 'base64', 'utf8');
    const decipheredOutput = decipher.final('utf8');
    // console.log("복호화 : "+input+" -> "+decipheredOutput);
  
    return decipheredOutput; 
}