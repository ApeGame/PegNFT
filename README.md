celer pegnft contract
---


###  set .env
```
POLYGON_TEST_URL=https://rpc-mumbai.maticvigil.com/v1/a4d198d312fd18757f50b9768a6e8d97589ebb05
POLYGON_MAIN_URL=https://rpc.ankr.com/polygon
PRIVATE_KEY=0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1
PRIVATE_KEY_TEST=0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1
```

### change arguments
```
module.exports = [
    "Meta Apes Fighter",
    "MAF",
    "0x0000000000000000000000000000000000000000",
];
```

### deploy
```
yarn deploy polygon
```

### verify:contract
```
yarn verify:contract polygon <address>
```

