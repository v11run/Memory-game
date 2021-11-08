const cards=document.querySelectorAll('.memory-card');

let hasflippedcard=false;
let lockboard=false;
let firstcard, secondcard;
let paircount=0;
function flipcard(){
    if(lockboard)return;
    if(this===firstcard)return;
    this.classList.toggle('flip');

if(!hasflippedcard){
    hasflippedcard=true;
    firstcard=this;
    console.log({hasflippedcard,firstcard});
}else{
    hasflippedcard=false;
    secondcard=this;
    checkformatch();
}
}
function checkformatch(){
    if(firstcard.dataset.framework===secondcard.dataset.framework){
        disablecards();
    }
    else{
      unflipcards();  

}
}

function disablecards(){
    paircount++;
    firstcard.removeEventListener('click',flipcard);
    secondcard.removeEventListener('click',flipcard);

    resetboard();
    if(paircount===6){
        console.log("You won");
        document.querySelector(".winner-message").style.display = 'block';
        document.querySelector("#blurred").style.display = 'block';
    }
}
function unflipcards(){
    lockboard=true;
    setTimeout(()=>{
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');
        resetboard();
    },1500);
}
function resetboard(){
    [hasflippedcard,lockboard]=[false,false];
    [firstcard,secondcard]=[null,null];
}
(function shuffle(){
    cards.forEach(card=>{
        let randompos=Math.floor(Math.random()*12);
        card.style.order= randompos;
    });
})();
cards.forEach(card => card.addEventListener('click',flipcard))
