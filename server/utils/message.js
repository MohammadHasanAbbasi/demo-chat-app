var generateMessage= (name,text)=>{

    return {

        name,
        text:text,
        createdAt: new Date().getTime()
    }


};

module.exports={generateMessage}