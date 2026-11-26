'use strict';
// Insira somente os canais oficiais. Deixe vazio enquanto não estiverem disponíveis.
const CONTATOS = { instagram: '', whatsapp: '' };
const estudos = [
  {src:'imagens/modelo-3d.jpg',label:'Modelo 3D preliminar',alt:'Modelo 3D de um chalé triangular sobre terreno inclinado'},
  {src:'imagens/croqui.jpg',label:'Croqui ilustrativo',alt:'Prancha de estudos ilustrativos do chalé'},
  {src:'imagens/chale-ilustrativo.jpg',label:'Imagem ilustrativa gerada por IA',alt:'Inspiração diurna de um chalé com varanda nas montanhas'},
  {src:'imagens/chale-noturno.jpg',label:'Imagem ilustrativa gerada por IA',alt:'Inspiração de um chalé iluminado ao anoitecer'},
  {src:'imagens/inspiracao.jpg',label:'Estudo visual / inspiração',alt:'Inspiração de um chalé de vidro e madeira'}
];
const paisagens = [
  {src:'imagens/novembro-2026/montanhas.webp',label:'As montanhas · Fotografia real',alt:'Montanhas e colinas verdes'},
  {src:'imagens/novembro-2026/borboleta.webp',label:'Os pequenos encontros · Fotografia real',alt:'Borboleta sobre uma flor'},
  {src:'imagens/novembro-2026/frutos.webp',label:'Os detalhes do lugar · Fotografia real',alt:'Frutos na árvore'},
  {src:'imagens/Paiagem 1.jpg',label:'A serra na neblina · Fotografia real',alt:'Paisagem da serra com neblina'},
  ...[2,3,4,5,6,7].map(n=>({src:`imagens/paisagem-galeria-0${n}.jpg`,label:'Paisagem de Minas · Fotografia real',alt:`Vista das montanhas e da natureza, fotografia ${n}`}))
];
const obra = [
  {src:'imagens/novembro-2026/acesso-paisagem.webp',label:'Terraplanagem do acesso interno · Novembro de 2026',alt:'Serviço de terraplanagem com montanhas ao fundo'},
  {src:'imagens/novembro-2026/acesso-execucao.webp',label:'Execução do acesso interno · Novembro de 2026',alt:'Retroescavadeira movimentando terra no acesso'},
  {src:'imagens/novembro-2026/acesso-terreno.webp',label:'Área terraplanada do acesso interno · Novembro de 2026',alt:'Área de terra movimentada diante do vale'}
];
const $ = s=>document.querySelector(s);
const menu=$('.menu-toggle'),nav=$('.nav');
function fecharMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',fecharMenu));
document.addEventListener('click',e=>{if(!e.target.closest('.header'))fecharMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){fecharMenu();menu.focus()}});
window.matchMedia('(min-width: 801px)').addEventListener('change',fecharMenu);
let estudoAtual=0;
const dots=$('.dots');
estudos.forEach((item,i)=>{const b=document.createElement('button');b.type='button';b.className='dot';b.setAttribute('aria-label',`Ver estudo ${i+1}: ${item.label}`);b.addEventListener('click',()=>mostrarEstudo(i));dots.append(b)});
function mostrarEstudo(i){estudoAtual=(i+estudos.length)%estudos.length;const item=estudos[estudoAtual];$('#study-img').src=item.src;$('#study-img').alt=item.alt;$('#study-label').textContent=item.label;$('#study-position').textContent=`${estudoAtual+1} de ${estudos.length} · Toque para ampliar`;$('.study-image').setAttribute('aria-label',`Ampliar estudo ${estudoAtual+1}: ${item.label}`);[...dots.children].forEach((b,n)=>b.setAttribute('aria-current',String(n===estudoAtual)))}
$('.carousel .prev').addEventListener('click',()=>mostrarEstudo(estudoAtual-1));$('.carousel .next').addEventListener('click',()=>mostrarEstudo(estudoAtual+1));
$('.carousel').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();mostrarEstudo(estudoAtual+(e.key==='ArrowLeft'?-1:1))}});
const modal=$('.lightbox');let itens=[],atual=0,ultimoFoco,swipeUntil=0;
function mostrarAmpliada(i){atual=(i+itens.length)%itens.length;const item=itens[atual];$('#lightbox-img').src=item.src;$('#lightbox-img').alt=item.alt;$('#lightbox-count').textContent=`${atual+1} / ${itens.length}`;$('#lightbox-caption').textContent=item.label+(itens===estudos?' · Estudo ou inspiração, sem definição final':'')}
function abrirGaleria(lista,i){if(Date.now()<swipeUntil)return;ultimoFoco=document.activeElement;itens=lista;mostrarAmpliada(i);modal.showModal();document.body.classList.add('modal-open');$('.close').focus()}
$('.study-image').addEventListener('click',()=>abrirGaleria(estudos,estudoAtual));$('.all-photos').addEventListener('click',()=>abrirGaleria(paisagens,0));
document.querySelectorAll('[data-gallery]').forEach(b=>b.addEventListener('click',()=>abrirGaleria(b.dataset.gallery==='obra'?obra:paisagens,Number(b.dataset.index))));
$('.close').addEventListener('click',()=>modal.close());modal.addEventListener('close',()=>{document.body.classList.remove('modal-open');ultimoFoco?.focus()});
modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close()}});
$('.lightbox-prev').addEventListener('click',()=>mostrarAmpliada(atual-1));$('.lightbox-next').addEventListener('click',()=>mostrarAmpliada(atual+1));modal.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();mostrarAmpliada(atual+(e.key==='ArrowLeft'?-1:1))}});
function permitirDeslizar(el,anterior,proximo){let inicio;el.addEventListener('touchstart',e=>{inicio=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null},{passive:true});el.addEventListener('touchend',e=>{if(!inicio)return;const dx=e.changedTouches[0].clientX-inicio.x,dy=e.changedTouches[0].clientY-inicio.y;inicio=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){swipeUntil=Date.now()+400;dx>0?anterior():proximo()}},{passive:true});el.addEventListener('touchcancel',()=>inicio=null,{passive:true})}
permitirDeslizar($('.study-image'),()=>mostrarEstudo(estudoAtual-1),()=>mostrarEstudo(estudoAtual+1));permitirDeslizar($('#lightbox-img'),()=>mostrarAmpliada(atual-1),()=>mostrarAmpliada(atual+1));
Object.entries(CONTATOS).forEach(([canal,url])=>{if(!url)return;try{if(new URL(url).protocol!=='https:')return}catch{return}const a=document.createElement('a');a.className='button';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=canal==='instagram'?'Acompanhe no Instagram':'Converse pelo WhatsApp';$('#contact-links').append(a)});
if($('#contact-links').children.length)$('.contact-pending').hidden=true;
$('#year').textContent=new Date().getFullYear();mostrarEstudo(0);
