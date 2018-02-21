# usage to start the server:
	cd backend
	pip3 install virtualenv
	virtualenv djangoEnv
	source djangoEnv/bin/activate 
	# on windows :
	#	cd djangoEnv/Scripts
	#	activate
	#	cd ../..
	pip3 install -r requirements.txt
	python manage.py runserver || python3 manage.py runserver
	###########if you want to start without the database ##############
	# rm db.mysql
	# rm api/migrations/00*
	# python manage.py makemigrations api
	# python manage.py migrate
	# python manage.py createsuperuser
	##	Username (leave blank to use 'merlin'): admin
	##	Email address: admin@localhost
	##	Password:p4ssw0rd

# urls :
## admin : ( admin / p4ssw0rd )
	http://localhost:8000/admin
## API : all articles :
	http://localhost:8000/api/articles
## API : second article:
	http://localhost:8000/api/articles/2
## API : all categories :
	http://localhost:8000/api/categories
## API : second category :
	http://localhost:8000/api/categories/2 :
## API : all articles of the second category :
	http://localhost:8000/api/categories/1/articles :
	
