
const menuBtn=document.querySelector('.menu-btn'), nav=document.querySelector('.navlinks');
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('main section').forEach((el,i)=>{if(i<4)el.classList.add('fade-up');});
const svg=document.querySelector('#toothGame');
if(svg){
 const spots=[...svg.querySelectorAll('.plaque')], scoreEl=document.querySelector('#cleanScore'), timeEl=document.querySelector('#timeLeft'), meter=document.querySelector('#cleanMeter'), message=document.querySelector('#gameMessage'), overlay=document.querySelector('#resultOverlay'), resultTitle=document.querySelector('#resultTitle'), resultCopy=document.querySelector('#resultCopy'), startBtn=document.querySelector('#startGame'), resetBtn=document.querySelector('#resetGame'), restartBtn=document.querySelector('#restartGame');
 let cleaned=0,time=30,timer=null,playing=false,lastClean=0;
 function update(){scoreEl.textContent=`${cleaned}/${spots.length}`;meter.style.width=`${Math.round(cleaned/spots.length*100)}%`;timeEl.textContent=`00:${String(time).padStart(2,'0')}`;}
 function stop(){playing=false;clearInterval(timer);timer=null;overlay.classList.add('show');resultTitle.textContent=cleaned===spots.length?'A brighter smile!':cleaned>=spots.length*.65?'Looking much cleaner!':'Every little try counts.';resultCopy.textContent=`You cleaned ${cleaned} of ${spots.length} spots. ${cleaned===spots.length?'You found every last spot. Lovely work.':'Give it another go and sweep across the spots you missed.'}`;}
 function begin(){clearInterval(timer);spots.forEach(s=>s.classList.remove('cleaned'));cleaned=0;time=30;playing=true;overlay.classList.remove('show');message.textContent='Brush gently across the golden spots. You’ve got this.';update();timer=setInterval(()=>{time--;update();if(time<=0)stop();},1000);}
 function point(evt){if(!playing)return;const pt=svg.createSVGPoint();pt.x=evt.clientX;pt.y=evt.clientY;const p=pt.matrixTransform(svg.getScreenCTM().inverse());const brush=svg.querySelector('#brush');brush.setAttribute('transform',`translate(${p.x-10} ${p.y-10}) rotate(-24)`);if(Date.now()-lastClean<40)return;const target=spots.find(s=>!s.classList.contains('cleaned')&&Math.hypot(Number(s.getAttribute('cx'))-p.x,Number(s.getAttribute('cy'))-p.y)<25);if(target){target.classList.add('cleaned');cleaned++;lastClean=Date.now();message.textContent=cleaned===spots.length?'Every spot is clean. Little victory unlocked!':'Keep sweeping across the tooth.';update();if(cleaned===spots.length)stop();}}
 svg.addEventListener('pointermove',point);svg.addEventListener('pointerdown',point);startBtn?.addEventListener('click',begin);resetBtn?.addEventListener('click',begin);restartBtn?.addEventListener('click',begin);update();
}
const secret=document.querySelector('#secretFlower'), note=document.querySelector('#secretNote');
if(secret&&note){secret.addEventListener('click',()=>{const open=note.hidden;note.hidden=!open;secret.setAttribute('aria-expanded',String(open));secret.textContent=open?'✿ Close the secret note':'✿ Open the secret note';});}
