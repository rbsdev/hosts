.DEFAULT_GOAL:=help

.PHONY: build \
				clean \
				help \
				icons \
				install \
				run

.SILENT:

# generate builds
build: clean
	tasks/build

# remove builds
clean:
	tasks/clean

# show some help
help:
	tasks/help

# pack the icons
icons:
	tasks/icons

# install dependencies
install:
	tasks/install

# run the app
run:
	tasks/run
