import jsEncrypt from "jsencrypt"

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0qLBf3OkjYLfRmA+CRLf
8rAwGfBgSAsvsG+DHa0Vnj7Bo9kxLkF/SUPD6KL+dFHVWeMlB3JX5OPqtyTclGzu
11MSy7m/Q6M/jPdFLOFJhX9jhYW1JSbCbxOzfDCB0BqPHKjPzDm6qruK989b5Lvc
fnMJNamtSuzoH/wYlrmutsxffalY2yW9ZwyBxqx7lFg1NNJhUBBuePuX6g5NzaDm
cK4kR+kCTGKNd+vYr7o6cMbizAj/UfPNkPNyZik8bw/WIhybMevRcOqK28INHnQZ
u/WSvNlhoZz0qfcheYJIWMoZZwhV5jxvzDv7SYFWM5wPwdY/S3Ffv/K4id5KVM0j
EwIDAQAB
-----END PUBLIC KEY-----
`

export function encrypted(text)
{
    const encrypter = new jsEncrypt();
    encrypter.setPublicKey(publicKey);
    const rsaText = encrypter.encrypt(text)
    return rsaText;
}

export function decrypted(text)
{
    const decrypter = new jsEncrypt();
    decrypter.setPrivateKey(privateKey);
    const decryptedText = decrypter.decrypt(text);
    return decryptedText;
}

