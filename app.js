
document.addEventListener("DOMContentLoaded",(event)=>{
    let messageArray=['test','1234','2345','RETESTE']
    for (let index = 0; index < messageArray.length; index++) {
        const msg = messageArray[index];
        msgQueu=[...msgQueu,msg];
        bandeauMessage(msg)
    }
})

let msgQueu = []
let inQueu = async ()=>{
    console.log(msgQueu)
    if(msgQueu.length>0){
        
        setTimeout(() => {
            return new Promise(resolve=>resolve(inQueu()));
        }, 3000);
    }
    
    return new Promise((resolve)=>{
        resolve(true)
    })
}

let bandeauMessage = async (message,type=1,duration=2500) =>{
    if(message===null){
        message='Demande en cours de traitement'
    }
    let check = await inQueu();
   console.log(check)
    if(check){
        msgQueu=[...msgQueu,message];
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
        let bandeauMessage = `<div class="bandeauMessage" style="${style}">${message}</div>` 
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
