# Idoticon

[![Build Status](https://travis-ci.org/popodidi/idoticon.svg?branch=master)](https://travis-ci.org/popodidi/idoticon)

Idoticon provides cli to build identicon, which takes utf8 data of identifier string as inputs and leverages [Snap.svg](http://snapsvg.io) and [mustache](http://mustache.github.io) to render output `.html`.

## install
```bash
$ npm i -g idoticon
```

## usage

```
$ idoticon myIdentifier
```

### more options
```bash
$ idoticon -h
```
```
  Usage: idoticon [options] [identifier]

  Options:

    -h, --help                 output usage information
    -s, --size [size]          size, default to 500
    -m, --margin [margin]      margin, default to 20
    -o, --output [outputPath]  Output destination, default to ./report/
    -f, --file [fileName]      Output file name, default to YYYYMMDD-{identifier}
```

## example
```shell
$ idoticon idoticon
```
![](example/idoticon.png)

```shell
$ idoticon -s 300 -m 10 hello
```
![](example/hello.png)