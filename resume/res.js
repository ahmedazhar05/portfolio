fetch('https://api.github.com/users/ahmedazhar05/repos')
.then(response => response.json())
.then(data => {
  const section = document.querySelector('section:nth-of-type(3) dl');
  for(var i of data){
    if(i.fork)
      continue;
    const name = i.name;
    const link = i.html_url;
    var description = i.description;
    if(description == null)
      description = 'No description';
    section.innerHTML += '<dt>'+name+'</dt><dd>'+description+'</dd><dd><b>Github link: </b><a href="'+link+'">'+link+'</a></dd>';
  }
});
