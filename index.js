function cipher(msg, keyword) {
    let message = msg.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, "").toLowerCase();
    message = (message.length % keyword.length !== 0)? message.padEnd(message.length+keyword.length - (message.length % keyword.length),'x'):message;
    let chunkArray = divideIntoChunks(message, keyword);
    return getEncipheredMessage(keyword, chunkArray);
}
function getEncipheredMessage(keyword, chunkArray) {
     let charCodeArray=[];
    for(let i=0;i<keyword.length;i++){
        charCodeArray.push(keyword.charCodeAt(i));
    }
    charCodeArray.sort(function(a, b){return a-b});
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
