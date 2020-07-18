docker_run_app=docker-compose run --rm app

help: ## Shows this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' -e 's/:.*#/ #/'

build: ## Builds docker image
	docker-compose build

install: ## Installs application dependencies
	$(docker_run_app) bundle install

migrate-db: ## Migrates database
	$(docker_run_app) bash -c "rake db:create && rake db:migrate"

up: ## Starts docker-compose
	@rm -f tmp/pids/server.pid
	docker-compose up --build

upd: ## Starts docker-compose in daemon mode
	@rm -f tmp/pids/server.pid
	docker-compose up -d --build

stop: ## Stops docker-compose
	docker-compose stop

down: ## Destroys service containers
	docker-compose down

sh: ## Connects into container
	$(docker_run_app) bash

ssh: ## Connects into container
	docker-compose exec app bash

logs: ## Shows logs
	docker-compose logs -f
