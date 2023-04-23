

import JSEncrypt from 'jsencrypt';

const publicKeyPEM = "-----BEGIN PUBLIC KEY-----"+
"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDITCJV8xZid6BL2L900HSuECp2"+
"Wn7KhEWtJdi9e5AQLOPSHF01q9Xgja1Q8NhQIcaYnBU+JOgOVP/7fcuEQtioxdQQ"+
"jcbpeUxwRkIgOkX8und4mmZ5nbEzIXBFOEeerDoy8SKRMZWrysUtmqC/Nfe33Xe2"+
"0U3o6lMgovuzFAs5+wIDAQAB"+
"-----END PUBLIC KEY-----"

var encrypt = new JSEncrypt();
encrypt.setPublicKey(publicKeyPEM);

// 加密数据
export function encryt(str){
    return encrypt.encrypt(str);
}

