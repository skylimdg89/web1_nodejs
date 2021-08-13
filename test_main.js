var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
	return `
		<!doctype html>
<html>
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- Bootstrap CSS -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

		<title>Welcome - ${title}</title>
	</head>
	<body>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="/">Home</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="/">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/write">Write</a>
						</li>


						<li class="nav-item">
							<a class="nav-link" href="/about">About</a>
						</li>
					</ul>
					<form class="d-flex">
						<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
						<button class="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
		<div class="jumbotron">
			<h1 class="display-4">Dongqoo</h1>
			<p class="lead">Testing Node.js</p>
			${list}

			<hr class="my-4">
			${body}
			<a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
		</div>

		<!-- Optional JavaScript; choose one of the two! -->

		<!-- Option 1: Bootstrap Bundle with Popper -->
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>

		<!-- Option 2: Separate Popper and Bootstrap JS -->
		<!--
			<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js" integrity="sha384-eMNCOe7tC1doHpGoWe/6oMVemdAVTMs2xqW4mwXrXsW0L84Iytr2wi5v2QjrP/xp" crossorigin="anonymous"></script>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>
			-->
	</body>
</html>
	`;

}

function templateList(filelist){
	var list = '<ul class=list-group>';
	var i = 0;
	while(i < filelist.length){	
		list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
		i ++;
	}
	list += '</ul>';
	return list;

}

var app = http.createServer(function(request,response){
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;
	/*
	if(_url == '/'){
		title = 'Welcome';
	}
	if(_url == '/favicon.ico'){
		return response.writeHead(404);
	}
	console.log("-------------------");
	console.log("host = " + url.parse(_url, true).host);
	console.log("pathname = " + url.parse(_url, true).pathname);
	console.log("search = " + url.parse(_url, true).search);
	console.log("_url = " + _url);
	console.log("title = " + title);
	*/
	console.log(url.parse(_url, true));
	console.log(url.parse(_url, true).pathname);
	/*
	fs.readFile('index.html', 'utf8', function(err, data){
	//console.log(data);

		response.end(data);
	});
	*/
	if(pathname === '/'){
		if(queryData.id === undefined){
			fs.readdir('./data', function(error, filelist){
				var title = "Home";
				var description = "This is main";

				var list = templateList(filelist);
				var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);


				response.writeHead(200);
				response.end(template);
			})
		}else{
			fs.readdir('./data', function(error, filelist){
				console.log(filelist);


				fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
					var title = queryData.id;
					var list = templateList(filelist);
					var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
					response.writeHead(200);
					response.end(template);
				});
			});
		}
	}else{
		response.writeHead(404);
		response.end('Not Found 404');
	}
});
app.listen(3000);
