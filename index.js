function cipher(msg, keyword) {
    let message = msg.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, "").toLowerCase();
    message = fillXs(message, keyword);
    let chunkArray = divideIntoChunks(message, keyword);
    return getEncipheredMessage(keyword, chunkArray);
}
function getEncipheredMessage(keyword, chunkArray) {
     let charCodeArray=[];
    for(let i=0;i<keyword.length;i++){
        charCodeArray.push(keyword.charCodeAt(i));
    }
    // console.log("charCodeArray=");
    // console.log(charCodeArray);
    charCodeArray.sort(function(a, b){return a-b});
    // console.log(charCodeArray);
    // let indexOfKeywordArray = new Array(keyword.length).fill(0);
    // let alphabets = "abcdefghijklmnopqrstuvwxyz";
    // let count = 1;
    // for (let i = 0; i < alphabets.length; i++) {
    //     if (keyword.includes(alphabets[i])) {
    //         let temp = keyword.indexOf(alphabets[i]);
    //         indexOfKeywordArray[temp] = count;
    //         count++;
    //     }
    // }
    let output = "";
    for (let i = 0; i < charCodeArray.length; i++) {
        let temp = keyword.indexOf(String.fromCharCode(charCodeArray[i]));
        for (let j = 0; j < chunkArray.length; j++) {
            output = output + chunkArray[j][temp];
        }
    }
    return output;
}
function divideIntoChunks(message, keyword) {
    let chunkArray = [];
    for (let i = 0; i < message.length; ) {
        let temp = message.substring(i, i + keyword.length);
        chunkArray.push(temp);
        i = i + keyword.length;
    }
    return chunkArray;
}
function fillXs(message, keyword) {
    if (message.length % keyword.length !== 0) {
        let messageArray = message.split("");
        for (
            let i = 0;
            i < keyword.length - (message.length % keyword.length);
            i++
        ) {
            messageArray.push("x");
        }
        message = messageArray.join("");
    }
    return message;
}
console.log(
    cipher("Meet me by the lake at midnight. Bring shovel.", "python") ===
    "thaiivelmhglmetgnembaitsetenroeykdbh"
);
console.log(
    cipher(
        "Mission Delta Kilo Sierra has been compromised. Kill Steve. Evacuate",
        "cake"
    ) === "ioliiabcrsiteuxmieksrsnpiksecesdaoraemmdlvatxsntleheooelevax"
);
