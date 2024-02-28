.PHONY: *

none:
	@echo "no command specified"

dev:
	docker compose up -d
	docker compose logs website -f

compress:
	rm -f website.tar.gz
	tar -czvf website.tar.gz --exclude=node_modules --exclude=.next website

upload:
	ssh developer@2m2.it "cd app && rm -f website.tar.gz" 
	scp website.tar.gz developer@2m2.it:~/app

# this command needs the docker website container to be stopped
unpack:
	ssh developer@2m2.it "cd app && docker compose down && rm -rf _website && mv website _website && tar -xzvf website.tar.gz"

# this command needs the docker website container to be stopped
release:
	ssh developer@2m2.it "cd app && docker compose build website && docker compose up -d"

all: compress upload unpack release