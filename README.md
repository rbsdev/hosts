![OS X Spotlight](/../gh-pages/assets/spotlight.png?raw=true "OS X Spotlight")

## Installation

Grab the project and run the following command:

```shell
make install build setup
```

It will install dependencies, build the apps and setup them in your `/Applications` folder.
<br>
It will also create the following files in your `~/Documents` folder:

```
~/Documents
├ Hosts Common.txt
├ Hosts Development.txt
├ Hosts Production.txt
└ Hosts Staging.txt
```

You should put your hosts configurations on them.

## Usage

Just launch the app of the environment you want to setup.

## Gotcha

The apps need write privilages to `/private/etc/hosts`, so the best thing to do is to change the file group and write permission:

```shell
sudo chgrp admin /private/etc/hosts
sudo chmod g+w /private/etc/hosts
```
