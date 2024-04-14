const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { signup, login, logout,  remove } = require('../controllers/user/user.controller');

router.post('/signup', signup);
router.get('/login', login);
router.get('/logout', logout);
router.delete('/remove', remove);
router.get('/testing', function(req, res){
    const hmac = crypto.createHmac('sha256','hello');
    hmac.update('true')
    const a = hmac.digest('hex');
    console.log({success:a});
})


// function performEncryption(data, secret) {
//     try {
//         // Check if secret key is of appropriate length
//         if (secret.length < 32) {
//             throw new Error("Secret key must be at least 32 characters long for AES-256 encryption.");
//         }

//         const iv = crypto.randomBytes(16); // IV length is 16 bytes for AES-256-CBC
//         const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret), iv);
//         let encrypted = cipher.update(data, 'utf8', 'hex');
//         encrypted += cipher.final('hex');
//         return iv.toString('hex') + ':' + encrypted;
//     } catch (error) {
//         console.error("Encryption error:", error.message);
//         return null;
//     }
// }
// //
// const a = '67e9f700b894d1a4e065a68aa204acc5:af1266bad1054e7484d1be4a701bfa47';
// router.get('/test', function (req, res) {
//     try {
//         const data = 'hello';

//         const iv = crypto.randomBytes(16); 
//         const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.CIPHER_KEY, 'hex'), iv);

//         let encrypted = cipher.update(data, 'utf8', 'hex');
//         encrypted += cipher.final('hex');

//         const encryptedData = iv.toString('hex') + ':' + encrypted;
//         console.log("Encrypted Data:", encryptedData);
//         res.send("Encrypted Data: " + encryptedData);
//     } catch (error) {
//         console.error("Encryption error:", error.message);
//         res.status(500).send("Encryption failed");
//     }
// });

// router.get('/d',function(req, res){
//         try {
//           const [ivString, ciphertext] = a.split(':');
//           const iv = Buffer.from(ivString, 'hex');
//           const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.CIPHER_KEY, 'hex'), iv);
      
//           let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
//           decrypted += decipher.final('utf8'); 
//           res.send('hello')
//         //   console.log(decrypted)
      
//         } catch (error) {
//           console.error("Decryption error:", error.message);
//           return null; // Or handle the error differently
//         }
// })



module.exports = router;
