/**@type {MessageBox} */
var mess=document.createElement("div-message");
var p=new Page();
path={
    "開場":{
        ctx:["看著媽祖聖像，把想問的問題默念一遍。","然後念出來「如果媽祖願意指點迷經，請賜弟子一個聖杯。念完之後按一下」"],
        title:["迷之聲","迷之聲"],
        lambda:function(){
            Animate.left.style.display="block";
            Animate.right.style.display="block";
            Animate.p.style.display="none";
            p.back.style.display="flex";
            var bt=Animate.playToss();
            switch (bt) {
                case 2:
                    ClassAPI.stage="開場-n";
                    break;
                case 1:
                    ClassAPI.stage="開場-y";
                    break;
                case 0:
                    ClassAPI.stage="開場-s";
                    break;
                default:
                    break;
            }
        }
    },
    "開場-y":{
        ctx:["聖杯!媽祖願意指點迷經。抽籤。"],
        title:["迷之聲"],
        lambda:()=>{
            ClassAPI.stage="抽籤";
        }
    },
    "開場-n":{
        ctx:["陰杯!媽祖生氣了!不要再問!"],
        title:["迷之聲"],
        lambda:()=>{
            
        }
    },
    "開場-s":{
        ctx:["笑杯!媽祖認為這問題不用問。"],
        title:["迷之聲"],
        lambda:()=>{
            ClassAPI.stage="開場";
        }
    },
    "抽籤":{
        ctx:["抽得第?首籤詩","看著媽祖聖像，念出來「稟告媽祖，弟子抽得第?首籤詩。請賜三聖杯確認。」"],
        title:["迷之聲","迷之聲"],
        n:0,
        lambda:()=>{
            /**@type {string[]} */
            var ctxx=path[ClassAPI.stage].ctx.slice();
            path[ClassAPI.stage].n=rand(101);
            ctxx.forEach((e,i)=> ctxx[i]=e.replace("?",path[ClassAPI.stage].n));
             ClassAPI.mess.init(ctxx,{title:path[ClassAPI.stage].title,stagefun:()=>{
                ClassAPI.stage="擲杯";
                ClassAPI.set();
             }}
             )
        },
        type:1
    },
    "擲杯":{
        ctx:["聖杯!念出來「媽祖請再賜?聖杯確認。」"],
        title:["迷之聲"],
        time:2,
        lambda:()=>{
            p.back.style.display="flex";
            var bt=Animate.playToss();
            if(bt==1){
                /**@type {string} */
                var ctx=(path[ClassAPI.stage].ctx.slice());
                switch (path[ClassAPI.stage].time) {
                    case 2:
                        ctx[0]=ctx[0].replace("?","二");
                    case 1:
                        ctx[0]=ctx[0].replace("?","一");
                        path[ClassAPI.stage].time--;
                        ClassAPI.mess.init(ctx,{title:path[ClassAPI.stage].title,stagefun:()=>{
                            ClassAPI.set();
                        }})
                        break;
                    case 0:
                        path[ClassAPI.stage].time=2;
                        ClassAPI.stage="擲杯-e";
                        ClassAPI.set();
                        break;
                    default:
                        break;
                }
                
             
            }
            else{
                path[ClassAPI.stage].time=2;
                ClassAPI.stage="擲杯-n";
                ClassAPI.set();
            }
        },
        type:1
    },
    "擲杯-n":{
        ctx:["不是聖杯!念出來「稟告媽祖，弟子重新抽籤」然後去重抽。"],
        title:["迷之聲"],
        lambda:()=>{
            ClassAPI.stage="抽籤";
            ClassAPI.set();
        }
    },
    "擲杯-e":{
        ctx:["聖杯!念出來「感謝媽祖賜籤」然後去取籤詩。"],
        title:["迷之聲"],
        lambda:()=>{
            p.back.style.display="flex";
            var str="00000"+path["抽籤"].n;
            Animate.playPoem("resource/image/"+str.substring(str.length-3,str.length)+".jpg");
            ClassAPI.stage="開場";
        }
    },
    "next":"resource/effect/next.wav"
};
/**
 * @param {string} pathName 
 * @returns {string} css url string
 */
function url(pathName){
    return "url("+path[pathName]+")";
}
/**
 * @param {number} r 0~255
 * @param {number} g 0~255
 * @param {number} b 0~255
 * @param {string} pos 所在位置
 * @returns {string} css rgb string
 */
function rgb(r,g,b,pos=""){
    return `rgb(${r},${g},${b}) ${pos}`;
}
/**
 * @param {number} r 0~255
 * @param {number} g 0~255
 * @param {number} b 0~255
 * @param {number} a 0.0~1.0
 * @param {string} pos 所在位置
 * @returns {string} css rgba string
 */
function rgba(r,g,b,a,pos=""){
    return `rgba(${r},${g},${b},${a}) ${pos}`;
}
/**
 * @param {HTMLElement} e 
 * @param {string} dir 
 * @param  {string[]} color rgb()
 */
function gradient(e,dir,...color){
    var str="linear-gradient(to "+dir;
    color.forEach(el=>str=str+","+el);
    e.style.backgroundImage=str;
}
/**
 * @param {HTMLElement} contain 
 * @param  {...HTMLElement} element 
 */
function addHtmlChildren(contain,...element){
    element.forEach(e=>contain.appendChild(e));
}

