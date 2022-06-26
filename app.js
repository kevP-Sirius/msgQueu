
document.addEventListener("DOMContentLoaded",(event)=>{
    if(sessionStorage.getItem('msgQueu')!==undefined){
        let registeredMsgQueu=JSON.parse(sessionStorage.getItem('msgQueu'))
        if(registeredMsgQueu.length){
            for (let index = 0; index < registeredMsgQueu.length; index++) {
                const msg = registeredMsgQueu[index];
                bandeauMessage(msg.text)
            }
        }
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
let bandeauMessage = async (message,type=1,duration=2500) =>{
    if(message===undefined){
        message='Demande en cours de traitement'
    }
    let msgCreatead = await generateNewMessage({text:message,type:type,duration:duration})
    if(msgCreatead){
        __subBandeauMessage({...msgCreatead})
    }
   
    
}

let generateNewMessage=async (messageContent)=>{
    let now = new Date().getTime()
    check = msgQueu.filter(element=>element.createdAt==now);
    if(check.length>0){
        return new Promise(resolve=>resolve(generateNewMessage({text:messageContent.text,type:messageContent.type,duration:messageContent.duration}))) 
    }else{
        message= {...messageContent,createdAt:now}
        msgQueu.push(message);
        sessionStorage.setItem('msgQueu',JSON.stringify([...msgQueu]))
        return new Promise(resolve=>resolve(message))
    } 
}

let __subBandeauMessage=async(message)=>{
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
            return __subBandeauMessage(message,message.type,message.duration)
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
            switch (message.type) {
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
                sessionStorage.setItem('msgQueu',JSON.stringify([...msgQueu]))
                
            },message.duration)
        }
        
         
    }
}
