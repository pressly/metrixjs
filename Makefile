.PHONY: all
all:
	@echo "See Makefile contents for usage"

.PHONY: run
run:
	@npm run start

.PHONY: dist
dist:
	@npm run dist

.PHONY: flow
flow:
	@npm run flow
