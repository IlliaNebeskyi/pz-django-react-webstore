default: help

.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

django-tests: docker-rm # Run backend tests
	docker-compose up -d db backend

	#
	# Verify backend service response
	#
	for iter in 1 2 3 4 5 6 7 8 9 10; \
	do \
		if [ "$$iter" -eq 10 ]; then \
			echo Test existence failed && exit 1; \
		fi; \
		if [ `curl -s -o /dev/null -I -w "%{http_code}" http://localhost:8000` -eq 200 ]; then \
			break; \
		fi; \
		echo "sleeping 2 seconds..."; \
		sleep 2; \
	done

docker-rm: # Remove running containers
	if [ $(shell docker ps -a -q -f name=frontend | wc -l ) -gt 0 ]; then \
		docker rm frontend -f; \
	fi
	if [ $(shell docker ps -a -q -f name=db | wc -l ) -gt 0 ]; then \
		docker rm db -f; \
	fi
	if [ $(shell docker ps -a -q -f name=backend | wc -l ) -gt 0 ]; then \
		docker rm backend -f; \
	fi
	docker volume prune -f

init: docker-rm
	#
	# Run django server
	#
	docker-compose up -d db backend
	#
	# make db migrations
	#
	docker exec backend python manage.py makemigrations app
	docker exec backend python manage.py migrate
	#
	# create super user
	#
	# docker exec backend python manage.py createsuperuser --noinput # http://localhost:8000/admin/

	docker-compose up -d frontend
	docker-compose up -d nginx