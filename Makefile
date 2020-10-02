docker_run_app=docker-compose run --rm app

help: ## Shows this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' -e 's/:.*#/ #/'

build: ## Builds docker image
	docker-compose build

install: env ## Installs application dependencies
	$(docker_run_app) bundle install

env: ## Create config/application.yml
	$(docker_run_app) bash -c "bundle exec figaro install && chmod 777 config/application.yml"

migrate-db: ## Migrates database
	$(docker_run_app) bash -c "rake db:create && rake db:migrate"

up: ## Starts docker-compose
	-$(docker_run_app) rm -f tmp/pids/server.pid
	docker-compose up --build

upd: ## Starts docker-compose in daemon mode
	-$(docker_run_app) rm -f tmp/pids/server.pid
	docker-compose up -d --build

stop: ## Stops docker-compose
	docker-compose stop

down: ## Destroys service containers
	docker-compose down

restart: down upd ## Destroys and starts the service containers

sh: ## Connects into container
	$(docker_run_app) bash

ssh: ## Connects into container
	docker-compose exec app bash

logs: ## Shows logs
	docker-compose logs -f
