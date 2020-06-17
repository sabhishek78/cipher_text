function cipher(msg,keyword){
let message=msg.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g,"").toLowerCase();
if(message.length%keyword.length!==0){
    let messageArray=message.split('');
    for(let i=0;i<keyword.length-message.length%keyword.length;i++){
        messageArray.push('x');
    }
    message=messageArray.join('');
}
let chunkArray=[];
for(let i=0;i<message.length;){
    let temp=message.substring(i,i+keyword.length);
    chunkArray.push(temp);
    i=i+keyword.length;
}
let indexOfKeywordArray=new Array(keyword.length).fill(0);
let alphabets='abcdefghijklmnopqrstuvwxyz';
let count=1;
for(let i=0;i<alphabets.length;i++){
    if(keyword.includes(alphabets[i])){
        let temp=keyword.indexOf(alphabets[i]);
        indexOfKeywordArray[temp]=count;
        count++;
    }
}
let output='';
for(let i=1;i<=keyword.length;i++){
    let temp=indexOfKeywordArray.indexOf(i);
    for(let j=0;j<chunkArray.length;j++){
       output=output+chunkArray[j][temp];
    }
}
return output;
}
console.log(cipher("Meet me by the lake at midnight. Bring shovel.", "python")==="thaiivelmhglmetgnembaitsetenroeykdbh");
console.log(cipher("Mission Delta Kilo Sierra has been compromised. Kill Steve. Evacuate", "cake")==="ioliiabcrsiteuxmieksrsnpiksecesdaoraemmdlvatxsntleheooelevax");