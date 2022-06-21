
document.addEventListener("DOMContentLoaded",(event)=>{
   
    for (let index = 0; index < messageArray.length; index++) {
        const msg = messageArray[index];
        bandeauMessage(msg)
    }
    
    
})
let messageArray=['test','1234','2345','RETESTE','test']
let msgQueu = []
let testLoop=()=>{
    for (let index = 0; index < messageArray.length; index++) {
        const msg = messageArray[index];
        
        bandeauMessage(msg)
    }
}
let bandeauMessage = async (message,recursive,type=1,duration=2500) =>{
    if(message===null){
        message='Demande en cours de traitement'
    }
   
    if(recursive===undefined){
       let msgCreatead = await generateNewMessage(message)
       if(msgCreatead){
        __subBandeauMessage(msgCreatead,type,duration)
       }
    }else{

        __subBandeauMessage(message,type,duration)
    }
   
    
}

let generateNewMessage=async (message)=>{
    let now = new Date().getTime()
    check = msgQueu.filter(element=>element.createdAt==now);
    if(check.length>0){
        return new Promise(resolve=>resolve(generateNewMessage(message))) 
    }else{
        message= {createdAt:now,text:message}
        msgQueu.push(message);
        return new Promise(resolve=>resolve(message))
    } 
}

let __subBandeauMessage=async(message,type,duration)=>{
    let dateList = []
    msgQueu.map((msgObject,index)=>{
       return dateList.push(msgObject.createdAt)
    })
    let lowestTimestamp= Math.min(...dateList)
    let elementToUse = msgQueu.filter((messageSearch)=>{
      return  messageSearch.createdAt==lowestTimestamp
    })
    if(elementToUse[0].createdAt!==message.createdAt){
          setTimeout(()=>{
            return __subBandeauMessage(message,type,duration)
        },3500)
    }else{
        let destroyBandeauChecking = async()=>{
            if($(".bandeauMessage").length){
                return new Promise(resolve=>resolve(destroyBandeauChecking()))
            }
            return new Promise(resolve=>resolve(true))
        }
        let check = await destroyBandeauChecking()
        if(check){
            
    
            let style=''
            switch (type) {
            case 1:
                //Information
                style = "display:none;border-radius: 5px;color: #fff!important;padding: 1rem!important;margin-bottom: 0.5rem!important;background-color: #007bff!important;text-align: center!important;font-size:18px;position: sticky;top:0;width: 100%;z-index: 10000;opacity:77%;"
                break;
            case 2:
                //Validation
                style = "display:none;border-radius: 5px;color: #fff!important;padding: 1rem!important;margin-bottom: 0.5rem!important;background-color: #28a745!important;text-align: center!important;font-size:18px;position: sticky;top:0;width: 100%;z-index: 10000;opacity:77%;"
                break;
            default:
                style = "display:none;border-radius: 5px;color: #fff!important;padding: 1rem!important;margin-bottom: 0.5rem!important;background-color: #007bff!important;text-align: center!important;font-size:18px;position: sticky;top:0;width: 100%;z-index: 10000;opacity:77%;"
                break;
            }
            let bandeauMessage = `<div class="bandeauMessage" style="${style}">${elementToUse[0].text}</div>` 
            $('.bandeauMessage').remove()
            $("body").prepend(bandeauMessage);
            $('.bandeauMessage').show()
            setTimeout(()=>{
                $('.bandeauMessage').css('transition','all 2s ease-out')
                $('.bandeauMessage').remove();
                msgQueu.shift()
                
            },duration)
        }
        
         
    }
}
