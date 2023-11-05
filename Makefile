default: help

.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

django-tests: # Run backend tests
	docker-compose up -d db backend
	for iter in 1 2 3 4 5 6 7 8 9 10; \
	do \
		if [ "$$iter" -eq 10 ]; then \
			echo Test existence failed && exit 1; \
		fi; \
		if [ $(shell curl -s -o /dev/null -I -w "%{http_code}" http://localhost:8000) -eq 200 ]; then \
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