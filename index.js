function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + '<strong> ' + (commit.author ? commit.author.login : 'unknown') + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name +'</strong>' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const owner = repos[0].owner.login
  const repoList = `<ul>${repos.map(r => '<li>' + owner + ' <strong>' + r.name + '</strong> - ' + r.html_url +
  ' - <a href="#" data-username="' + owner + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' +
  ' - <a href="#" data-username="' + owner + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a>' + '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories(data) {
  const req = new XMLHttpRequest()
  req.addEventListener('load',displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + data.username.value + '/repos')
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repository
  const owner = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + owner + '/' + name + '/commits')
  req.send()
}

function getBranches(el) {
  const name = el.dataset.repository
  const owner = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + owner + '/' + name + '/branches')
  req.send()
}
