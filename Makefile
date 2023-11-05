default: help

.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

django-tests: # Run backend tests
	docker-compose up -d db backend
	if [ $(shell  curl -s -o /dev/null -I -w "%{http_code}" http://127.0.0.1:3000) -ne 200 ]; then \
		echo Test existence failed && exit 1; \
	fi

