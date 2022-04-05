"use strict";

var express = require('express');

var app = express();

var fs = require('fs');

var formidable = require('formidable');

var _require = require('js-sha256'),
    sha256 = _require.sha256;

var bs58 = require('bs58');

var _require2 = require('@lto-network/lto-transactions'),
    anchor = _require2.anchor,
    broadcast = _require2.broadcast;

var _require3 = require('lto-api'),
    LTO = _require3.LTO; // Account


var lto = new LTO('T'); // 'T' for testnet, 'L' for mainnet

var account = lto.createAccount();
var seedPass = account.seed;
var seed = "mixture rival torch buzz squirel warrior magnet library gate panda room area latin govern action";

exports.fileAnchoring = function _callee2(req, res) {
  var form;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //console.log(req.body.file)
          form = formidable({
            multiples: true
          });
          form.parse(req, function _callee(err, fields, files) {
            var filePath, fileData, fileHash, fileBase58Hash, fileAnchorTx, nodeUrl, resultText;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!err) {
                      _context.next = 3;
                      break;
                    }

                    console.log(err);
                    return _context.abrupt("return");

                  case 3:
                    filePath = files.file.filepath; // file stored in local temp file and load from there

                    fileData = fs.readFileSync(filePath);
                    fileHash = sha256.digest(fileData); //sha256 to array in able to use bs58

                    console.log(fileHash); // This hash needs to be encoded in base58 to be placed on the blockchain

                    fileBase58Hash = bs58.encode(fileHash);
                    console.log(fileBase58Hash);
                    fileAnchorTx = anchor({
                      type: 'ChainpointSHA256v2',
                      anchors: [fileBase58Hash],
                      senderPublicKey: '3Mxs56RDWMLBaoXd5fmZsGPGM7Q1qfmLMEf'
                    }, seed);
                    console.log(fileAnchorTx); // anchor hash: 5SXRH3aqJLTWqgUXMGGzzup16DE3daSNFPnrfwvrr29R

                    nodeUrl = 'http://94.66.5.210:3339/'; // Post req to nodeUrl 
                    //const nodeUrl     = 'https://testnet.lto.network/'
                    //const nodeUrl     = 'https://nodes.lto.network/'

                    _context.next = 14;
                    return regeneratorRuntime.awrap(broadcast(fileAnchorTx, nodeUrl));

                  case 14:
                    resultText = _context.sent;
                    // broadcast anchor to blockchain
                    console.log('Text transaction: ', resultText);

                  case 16:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};