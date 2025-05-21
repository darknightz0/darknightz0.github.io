

class Music{
    /**@type {HTMLAudioElement} */
    static effectPlayer=document.createElement("audio");
    /**@type {HTMLAudioElement} */
    static musicPlayer=document.createElement("audio");
    
    static effectPlay(name="effect-default"){
        Music.effectPlayer.pause();
        Music.effectPlayer.src=path[name];
        Music.effectPlayer.play();
    }
    static musicPlay(name){
        Music.musicPlayer.pause();
        Music.musicPlayer.src=path[name];
        Music.musicPlayer.play();
    }
}
Music.musicPlayer.loop=true;
class MessageBox extends HTMLElement{
    
    constructor() {
        super();
        this.speed=50;
        this.#paragraph=0;
        this.#ind=0;
        this.#str="";
        this.#icon=document.createElement("img");
        this.#icon.src="resource/image/arrow_icon.png";
        this.context=document.createElement("p");
        this.contextTitle=document.createElement("p");
        this.contextTitleDiv=document.createElement("div");
        this.contextTitleDiv.className="divtit";
        this.contextDiv=document.createElement("div");
        this.contextDiv.className="divcon";
        this.onclick=()=>{
            if(this.#bt){
                if(this.#ind==0){
                    Music.effectPlay("next");
                    this.play();
                }
                 else
                    this.paragraphEnd();
            }
            else{
                this.#stagefun();
                this.#bt=true;
            }
            
        }
    }
    connectedCallback(){
        this.contextTitleDiv.appendChild(this.contextTitle);
        this.appendChild(this.contextTitleDiv);
        this.contextDiv.appendChild(this.context);
        this.appendChild(this.contextDiv);
        this.contextDiv.appendChild(this.#icon);
    }
    /**
     * 初始化文檔 輸入劇情
     * @param {string[]} context 
     * @param {Object} [param2={}] 
     * @param {() => void} [param2.stagefun=()=>{}] stage end 觸發
     * @param {boolean} [param2.auto=true] 自動觸發 stagefun
     * @param {string[]} [param2.title=[""]] 
     * 
     */
    init(context,{stagefun=()=>{},auto=true,title=[]}={}){
        this.#title=title;
        this.#auto=auto;
        this.#stagefun=stagefun;
        this.#context=context;
        
    }
    /**@type {string} 段落*/
    stage=null;
    /**@type {number} 每個字元/msec */
    speed;
    /**@type {HTMLParagraphElement} 內文*/
    context;
    /**@type {HTMLDivElement} 內文區塊*/
    contextDiv;
    /**@type {HTMLParagraphElement} 段落標題*/
    contextTitle;
    /**@type {HTMLDivElement} 段落標題區塊*/
    contextTitleDiv;
    /**@type {number} 目前段落*/
    #paragraph;
    /**@type {number} 目前字元*/
    #ind;
   
    /**@type {Object} #id.value*/
    #id;
    /**@type {HTMLImageElement} 段落完結圖示*/
    #icon;
    /**@type {string} */
    #str;
    /**@type {boolean} */
    #bt=true;
    /**@type {string[]} */
    #title;
    /**@type {boolean} */
    #auto;
    /**@type {() => void} */
    #stagefun;
    /**@type {string[]} */
    #context;
    
    paragraphEnd(){
        this.#ind=this.#context[this.#paragraph].length;
    }
    pause(){
        clearTimeout(this.#id.value);
    }
    close(){
        this.style.display="none";
    }
    play(){
        this.style.display="inline";
        this.#icon.style.display="none";
        
        this.#str=this.#context[this.#paragraph];
        this.#id=timer(()=>{
            this.contextTitle.textContent=this.#title[this.#paragraph];
            if(this.#ind<=this.#str.length){
                this.context.textContent=this.#str.substring(0,this.#ind).padEnd(this.#str.length);
                this.#ind++;
                return true;
            }
            this.#icon.style.display="flex";
            this.#ind=0;
            this.#paragraph++;
            if(this.#paragraph==this.#context.length){
                this.#paragraph=0;
                this.#bt=this.#auto;
                if(this.#bt){
                    this.#stagefun();
                }
                   
            }    
            return false;
        },this.speed);
    }
    /**物件資料查看 ?!*/
    stageChange(nextStage){
        this.paragraphEnd();
        this.play();
    }
}
customElements.define('div-message', MessageBox);

/**
 * @param {()=>boolean} fun
 * @param {number} itvl 
 * @returns {Object}  id.value
 */
function timer(fun,itvl){
    var id=new Object();
    tt(fun,itvl);
    return id;
    function tt(fun,itvl){
        id.value=setTimeout(() => {
            if(fun()){
                tt(fun,itvl);
            }
        }, itvl);
    }
}




class Page{
    constructor(){
        this.back.className="Page back";
        this.main.className="Page main";
        this.back.appendChild(this.main);
        this.main.onclick=(event)=>{
         event.stopPropagation();
        }
        this.back.onclick=()=>{
           this.back.style.display="none";
        }
        addEventListener("load",()=>{
            document.body.appendChild(this.back);
        })
        
    }
    /**@type {HTMLDivElement} 添加UI*/
    main=document.createElement("div");
    /**@type {HTMLDivElement} */
    back=document.createElement("div");
    //樣式選擇可擴充 不同頁面
    
}
class ClassAPI{
    static stage;
    /**@type {MessageBox} */
    static mess;
    static init(mess,str){
        ClassAPI.mess=mess;
        ClassAPI.stage=str;

        ClassAPI.set();
    }
    static set(){
        if(path[ClassAPI.stage].type==null)
        ClassAPI.mess.init(path[ClassAPI.stage].ctx,{title:path[ClassAPI.stage].title,stagefun:()=>{
            path[ClassAPI.stage].lambda();
            ClassAPI.set();
        }})
     else{
        path[ClassAPI.stage].lambda();
        
     }
    }
}
class Animate{
    static left=document.createElement("img");
    static right=document.createElement("img");
    static contain;
    static p=document.createElement("img");
    static init(parent){
        Animate.left.src="resource/image/杯1.png";
        Animate.right.src="resource/image/杯2.png";
        this.left.className="Animate img";
        this.left.style.left="30%";
        this.right.className="Animate img";
        this.right.style.left="70%";
        this.contain=parent;
        this.p.style.display="none";
        addHtmlChildren(this.contain,this.left,this.right,this.p);
    }
    static #dx;
    static #dy;
    static #rz;
    static #c;
    static duration=1;
    static playToss(){
        this.#dx=rand(200)-100;
        this.#dy=rand(200)-100;
        this.#rz=rand(300)-150;
        this.#c=0;
        this.left.style.display="block";
        this.right.style.display="block";
        this.left.src="resource/image/杯1.png";
        this.right.src="resource/image/杯2.png";
        if(rand(2)==2){
            this.#c++;
            gsap.timeline({repeatRefresh:true})
            .set(this.left,{x:0,y:0,rotateZ:0})
            .fromTo(this.left,{rotateY:"0deg"},{rotateY:"90deg",x:this.#dx/4,y:this.#dy/4,rotateZ:()=>this.#rz/4+"deg",duration:this.duration/4,ease:"none"})
            .call(()=>{
                this.left.src="resource/image/杯2.png";
            })
            .fromTo(this.left,{rotateY:"-90deg"},{rotateY:"90deg",duration:this.duration/2,x:this.#dx*3/4,y:this.#dy*3/4,rotateZ:()=>this.#rz*3/4+"deg",ease:"none"})
            .call(()=>{
                this.left.src="resource/image/杯1.png";
            })
            .fromTo(this.left,{rotateY:"90deg"},{rotateY:"0deg",duration:this.duration/4,x:this.#dx,y:this.#dy,rotateZ:()=>this.#rz+"deg",ease:"none"});
        }
        else{
            gsap.timeline({repeatRefresh:true})
            .set(this.left,{x:0,y:0,rotateZ:0})
            .fromTo(this.left,{rotateY:"0deg"},{rotateY:"90deg",x:this.#dx/4,y:this.#dy/4,rotateZ:()=>this.#rz/4+"deg",duration:this.duration/6,ease:"none"})
            .call(()=>{
                this.left.src="resource/image/杯2.png";
            })
            .fromTo(this.left,{rotateY:"-90deg"},{rotateY:"90deg",duration:this.duration/3,x:this.#dx*3/4,y:this.#dy*3/4,rotateZ:()=>this.#rz*3/4+"deg",ease:"none"})
            .call(()=>{
                this.left.src="resource/image/杯1.png";
            })
            .fromTo(this.left,{rotateY:"-90deg"},{rotateY:"90deg",duration:this.duration/3,x:this.#dx,y:this.#dy,rotateZ:()=>this.#rz+"deg",ease:"none"})
            .call(()=>{
                this.left.src="resource/image/杯2.png";
            })
            .fromTo(this.left,{rotateY:"-90deg"},{rotateY:"0deg",duration:this.duration/6,x:this.#dx*3/4,y:this.#dy*3/4,rotateZ:()=>this.#rz*3/4+"deg",ease:"none"});
        }
        this.#dx=rand(200)-100;
        this.#dy=rand(200)-100;
        this.#rz=rand(300)-150;
        if(rand(2)==2){
            gsap.timeline({repeatRefresh:true})
            .set(this.right,{x:0,y:0,rotateZ:0})
            .fromTo(this.right,{rotateY:"0deg"},{rotateY:"90deg",x:this.#dx/4,y:this.#dy/4,rotateZ:()=>this.#rz/4+"deg",duration:this.duration/4,ease:"none"})
            .call(()=>{
                this.right.src="resource/image/杯1.png";
            })
            .fromTo(this.right,{rotateY:"-90deg"},{rotateY:"90deg",duration:this.duration/2,x:this.#dx*3/4,y:this.#dy*3/4,rotateZ:()=>this.#rz*3/4+"deg",ease:"none"})
            .call(()=>{
                this.right.src="resource/image/杯2.png";
            })
            .fromTo(this.right,{rotateY:"90deg"},{rotateY:"0deg",duration:this.duration/4,x:this.#dx,y:this.#dy,rotateZ:()=>this.#rz+"deg",ease:"none"});
        }
        else{
            this.#c++;
            gsap.timeline({repeatRefresh:true})
            .set(this.right,{x:0,y:0,rotateZ:0})
            .fromTo(this.right,{rotateY:"0deg"},{rotateY:"90deg",x:this.#dx/4,y:this.#dy/4,rotateZ:()=>this.#rz/4+"deg",duration:this.duration/6,ease:"none"})
            .call(()=>{
                this.right.src="resource/image/杯1.png";
            })
            .fromTo(this.right,{rotateY:"-90deg"},{rotateY:"90deg",duration:this.duration/3,x:this.#dx*3/4,y:this.#dy*3/4,rotateZ:()=>this.#rz*3/4+"deg",ease:"none"})
            .call(()=>{
                this.right.src="resource/image/杯2.png";
            })
            .fromTo(this.right,{rotateY:"-90deg"},{rotateY:"90deg",duration:this.duration/3,x:this.#dx,y:this.#dy,rotateZ:()=>this.#rz+"deg",ease:"none"})
            .call(()=>{
                this.right.src="resource/image/杯1.png";
            })
            .fromTo(this.right,{rotateY:"-90deg"},{rotateY:"0deg",duration:this.duration/6,x:this.#dx*3/4,y:this.#dy*3/4,rotateZ:()=>this.#rz*3/4+"deg",ease:"none"});
        }
        return this.#c;
    }
    static playPoem(src){
        this.right.style.display="none";
        this.left.style.display="none";
        this.p.src=src;
        gsap.fromTo(this.p,{display:"block",opacity:0,height:"0%"},{opacity:1,duration:2,height:"75%"});
    }
}


/**
 * @returns {number}
 */
function rand(n){
 return Math.floor((Math.random()+Math.random())/2*n)+1;
}
