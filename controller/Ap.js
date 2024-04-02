const fs = require("fs");


const getAn = async(req, res) => {
    try{

        let output = await  parseTemplate("form");
        res.send(output);

    }catch(err){

        console.log(err);
        res.status(500).send("Internal server error");
        
    }
}


const postAn = async(req, res) => {
const { txt } = req.body;

if (txt ===""){

    return res.send("Bad request");

}
console.log(txt);

    let numChar = txt.length;
    let words = txt.split(/\s+|\.|,|!|\?/).filter(word => word.trim() !=="");
    console.log(words);
    let wordsLessThan5;
    wordsLessThan5 = words.filter(n => n.length < 5).length;
    let wordsMoreThan5 = words.filter(n => n.length > 5).length;
    let words5Char = words.filter(num => num.length === 5).length;
    let numSentenc = txt.split(/\.|\?|\!/).length;
    let numWords = words.length;

try {

    let result = await parseTemplate("An", {numChar:numChar,wordsMoreThan5:wordsMoreThan5,
        wordsWithLessThan5char:wordsWithLessThan5char,
        words5Char:words5Char,
        numSentenc:numSentenc,
        numWords:numWords});
    res.send(result);

       } 
catch (err){
        console.log(err);
        res.status(500).send("Internal server error");
       }     

}


const parseTemplate= async (template , data = null)=>{


    return new Promise((success , fail)=>{
    
        fs.readFile(
    
            `${__dirname}/../views/${template}.html`,
            "utf-8", (err, content) =>{

                if(err){
                    return fail(err);
                }if (data){
                    for (d in data){
                        content = content.replaceAll(`{{${d}}}`,data[d]);
                    }
                }
                return success(content);

            }
        )
    })
}
module.exports = {
    getAn,
    postAn
}