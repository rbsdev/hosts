.DEFAULT_GOAL:=help

.PHONY: help \
				install

.SILENT:

# show some help
help:
	tasks/help

# install project dependencies
install:
	tasks/install
