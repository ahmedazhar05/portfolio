var cards = document.querySelectorAll('.card, .repo-card');
var scroll = window.requestAnimationFrame || function(callback){setTimeout(callback, 1000/60);};
const form = document.querySelector('#contact form');
const sk = document.querySelector('#skills .lang-container');
const sl = document.querySelector('#social-links');
const socials = {
  facebook: 'https://facebook.com/',
  twitter: 'https://twitter.com/',
  github: 'https://github.com/',
  instagram: 'https://instagram.com/',
  linkedin: 'https://linkedin.com/in/',
  //linkedin: 'https://linkedin.com/in/mohammed-azhar-ahmed-4006601b2/',
};
const languages = [
  'HTML5', 
  'JavaScript', 
  'CSS3', 
  'jQuery', 
  'nodejs', 
  'MySQL', 
  'AngularJS', 
  'php', 
  'Python', 
  'Java', 
  'C', 
  'Android'
];
window.onload = window.onresize = () => {
  const div = document.querySelector('#contact > div');
  if(Array.from(document.querySelectorAll('#contact > div > div')).reduce((t, e) => t + e.clientWidth, 0) > div.clientWidth)
    div.classList.add('centered');
  else 
    div.classList.remove('centered');
};
fetch('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json')
.then(response => response.json())
.then(data => {
  for(var i in socials){
    const t = document.createElement('A');
    t.style.setProperty('--color', '#' + data.icons.find(v => v.title.toLowerCase() == i).hex);
    //t.dataset.color = '#' + data.icons.find(v => v.title.toLowerCase() == i).hex;
    t.className = 'fab fa-2x fa-fw fa-'+i;
    t.href = socials[i]+'ahmedazhar05';
    t.target = '_blank';
    sl.appendChild(t);
  }
});
fetch('https://api.github.com/users/ahmedazhar05/repos')
.then(response => response.json())
.then(data => {
  const owned = document.querySelector('#projects article:nth-of-type(1)');
  const contributed = document.querySelector('#projects article:nth-of-type(2)');
  for(var i of data){
    const repo = i.html_url;
    const name = i.full_name.replace(/\//g, '/<wbr>');
    var description = i.description;
    if(description == null)
      description = 'no description';
    var link = i.homepage;
    if(link == null)
      link = '';
    const stars = i.stargazers_count;
    const forks = i.forks_count;
    const watch = i.watchers_count;
    const div = document.createElement('DIV');
    div.innerHTML = '<div class="repo-card"><img src="data:image/svg+xml;utf8,<svg xmlns=\'http:\/\/www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' version=\'1.1\' width=\'50\' height=\'67\' aria-hidden=\'true\'><path fill-rule=\'evenodd\' d=\'M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z\'></path></svg>" alt="Repository Icon"><h2 class="repo-name"><a href="'+repo+'" target="_blank">'+name+'</a></h2><span class="repo-desc">'+description+'</span><a href="'+i.homepage+'" target="_blank" class="repo-link">'+link+'</a><div><span class="stars">'+stars+'</span><span class="forks">'+forks+'</span><span class="watchers">'+watch+'</span></div></div>';
    if(i.fork)
      contributed.appendChild(div.firstElementChild);
    else
      owned.appendChild(div.firstElementChild);
  }
  cards = document.querySelectorAll('.card, .repo-card');
});
for(var l of languages){
  const elm = document.createElement('DIV');
  elm.className = 'lang-icon';
  elm.dataset.name = l;
  elm.style.backgroundImage = 'url(https://raw.githubusercontent.com/devicons/devicon/master/icons/'+l.toLowerCase()+'/'+l.toLowerCase()+'-original.svg)';
  sk.appendChild(elm);
}
form.onsubmit = () => {
  const name = document.querySelector('form #username');
  const email = document.querySelector('form #email');
  const message = document.querySelector('form #message');
  const s = document.querySelector('#contact span.response.sending');
  s.classList.add('visible');
  document.querySelector('#contact h4').scrollIntoView();
  fetch('https://script.google.com/macros/s/AKfycbwgfwaT8OLRwGtl71o5okvTa-c8KK6sq6db64Gg5hHbaxvDozg/exec?name='+name.value+'&email='+email.value+'&message='+message.value)
  .then(response => response.json())
  .then(data => {
    s.classList.remove('visible');
    document.querySelector('#contact span.response.'+(data.success ? 'success': 'failure')).classList.add('visible');
    name.value = email.value = message.value = '';
    setTimeout(() => {
      document.querySelectorAll('#contact span.response').forEach(e => {e.classList.remove('visible');});
    }, 4000);
  })
    .catch(error => {
    s.classList.remove('visible');
    document.querySelector('#contact span.response.failure').classList.add('visible');
    name.value = email.value = message.value = '';
    setTimeout(() => {
      document.querySelectorAll('#contact span.response').forEach(e => {e.classList.remove('visible');});
    }, 4000);
  });
};
var loop = () => {
  cards.forEach(c => {
    const b = c.getBoundingClientRect();
    if((b.x + b.width > 0 && b.x < window.innerWidth) && (b.y + b.height > 0 && b.y < window.innerHeight))
      c.classList.add('visible');
    else if(!c.classList.contains('repo-card'))
      c.classList.remove('visible');
  });
  scroll(loop);
};
loop();
