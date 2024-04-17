<html lang="en">
<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="stylesheet" href="/styles/shop.css">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

	<title>Plugin Shop</title>

	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
		<a class="navbar-brand"><span class="logo">Mineditor</span> Admin panel</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarColor01">
    		<ul class="navbar-nav mr-auto">
				<li class="nav-item">
					<a class="nav-link" href="/shop.html">Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/">Editor</a>
				</li>
			</ul>
		</div>
	</nav>

	<div class="container-lg mt-5 pt-5 pb-4">
		<h1><span class="logo">Admin</span></h1>
	</div>


	<div class="container-md">
		<h5>Upload plugin</h5>
		<div class="row">
	    	<div class="col-sm-8 mx-auto p-md-5">
	    		<div class="card card-signin my-5">
	    				<h5 class="rounded-top card-title text-center p-4 bg-dark alert-light">Upload Project</h5>
	    			<div class="card-body">
	    				<form method="POST">
	    					<div class="form-label-group">
	    						<label for="name">Name</label>
	    						<input name="name" type="text" id="name" class="form-control" placeholder="Email address" required autofocus>
	    					</div>
	    					<hr>

    						<label for="price">Price</label>
	    					<div class="input-group ">
	    						<div class="input-group-prepend">
	    							<span class="input-group-text">$</span>
	    						</div>
	    						<input name="price" id="price" type="text" class="form-control">
	    					</div>
	    					<hr>
	    					<div class="form-label-group">
	    						<p>Plugin</p>
	    						<div class="custom-file">
									<label class="custom-file-label" for="file">Choose file</label>
	    							<input name="file" type="file" class="custom-file-input" id="file" accept=".json, .skybox, .gltf">
  								</div>
	    					</div>

	    					<hr>

	    					<div class="form-label-group">
	    						<p>Plugin preview</p>
	    						<div class="custom-file">
									<label class="custom-file-label" for="preview">Choose file</label>
	    							<input name="preview" type="file" class="custom-file-input" id="preview" accept=".jpg, .jpeg, .png">
  								</div>
	    					</div>

	    					<hr>

	    					<div class="input-group ">
	    						<div class="input-group-prepend">
	    							<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Type</button>
	    							<div class="dropdown-menu">
	    								<a class="dropdown-item" onclick="document.getElementById('type').value = 'Plugin'">Plugin</a>
	    								<a class="dropdown-item" onclick="document.getElementById('type').value = 'Building'">Building</a>
	    								<a class="dropdown-item" onclick="document.getElementById('type').value = 'Skybox'">Skybox</a>
	    								<div role="separator" class="dropdown-divider"></div>
	    									<a class="dropdown-item" href="">Separated link</a>
	    								</div>
	    							</div>
	    							<input name="type" type="text" class="form-control" id="type" readonly>
	    						</div>

	    					<!-- <button class="btn btn-lg btn-info btn-block text-uppercase" type="submit">Login</button> -->
	    					<button class="btn btn-lg btn-info btn-block text-uppercase mt-4" type="submit">Upload</button>
	    				</form>
	    			</div>
	    		</div>
	    	</div>
	    </div>
	</div>


	<footer class="page-footer font-small stylish-color-dark pt-4">
		<div class="container text-center text-md-left">
			<div class="row">
				<div class="col-md-4 mx-auto">
					<h5 class="font-weight-bold text-uppercase mt-3 mb-4">Footer Content</h5>
			        <p>
			        	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt tempore nihil nemo quis possimus est velit, delectus, fugiat exercitationem non accusantium hic neque maxime!
			        </p>
				</div>

				<hr class="clearfix w-100 d-md-none">

				<div class="col-md-2 mx-auto">
					<h5 class="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>
					<ul class="list-unstyled">
						<li><a href="">Support</a></li>
						<li><a href="">Donate</a></li>
						<li><a href="">Share world</a></li>
					</ul>
				</div>

				<hr class="clearfix w-100 d-md-none">

			</div>
		</div>

		<hr>

		<div class="footer-copyright text-center py-3">
			© 2020 Copyright:
			<a href="https://robomaster.kz/">Robomaster.kz</a>
		</div>
	</footer>
</body>
<html>