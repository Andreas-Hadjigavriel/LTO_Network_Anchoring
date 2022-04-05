const express               = require('express');
const app                   = express() 
const fs                    = require('fs')
const formidable            = require('formidable');
const { sha256 }            = require('js-sha256');
const bs58                  = require('bs58');
const { anchor, broadcast}  = require('@lto-network/lto-transactions');
const { LTO }               = require('lto-api');
// Account
const lto                   = new LTO('T'); // 'T' for testnet, 'L' for mainnet
const account               = lto.createAccount();
const seedPass              = account.seed;

const seed = "mixture rival torch buzz squirel warrior magnet library gate panda room area latin govern action"

exports.fileAnchoring = async(req,res) => {
    //console.log(req.body.file)

    const form = formidable({ multiples: true})

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err)
            return
        }
        const filePath = files.file.filepath    // file stored in local temp file and load from there
        
        const fileData    = fs.readFileSync(filePath)
        const fileHash    = sha256.digest(fileData) //sha256 to array in able to use bs58
        console.log(fileHash)

        // This hash needs to be encoded in base58 to be placed on the blockchain
        const fileBase58Hash = bs58.encode(fileHash);
        console.log(fileBase58Hash)
     
        const fileAnchorTx = anchor({ 
            type: 'ChainpointSHA256v2',
            anchors: [fileBase58Hash],
            senderPublicKey: '3Mxs56RDWMLBaoXd5fmZsGPGM7Q1qfmLMEf',
        }, seed)
        console.log(fileAnchorTx) // anchor hash: 5SXRH3aqJLTWqgUXMGGzzup16DE3daSNFPnrfwvrr29R
        
        const nodeUrl     = 'http://94.66.5.210:3339/' // Post req to nodeUrl 
        //const nodeUrl     = 'https://testnet.lto.network/'
        //const nodeUrl     = 'https://nodes.lto.network/'
        
        const resultText  = await broadcast(fileAnchorTx, nodeUrl) // broadcast anchor to blockchain
        console.log('Text transaction: ', resultText);
        
    })
}

