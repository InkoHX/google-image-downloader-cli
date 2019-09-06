# google-image-downloader-cli

## Install

### NPM

```bash
npm install google-image-downloader-cli -g
```

### Yarn

```bash
yarn global add google-image-downloader-cli
```

## Usage

### default

```bash
google-image-downloader <keyword>

or

gidl <keyword>
```

### Size option

You can specify either large, medium, or icon.

```bash
google-image-downloader <keyword> --size 'large'
google-image-downloader <keyword> --size 'medium'
google-image-downloader <keyword> --size 'icon'

or

gidl <keyword> -s 'large'
gidl <keyword> -s 'medium'
gidl <keyword> -s 'icon'
```

### Parallel

```bash
google-image-downloader <keyword> --parallel 5 # max
google-image-downloader <keyword> --parallel 1 # min
google-image-downloader <keyword> --parallel 6 # error

or

gidl <keyword> -p 5 # max
gidl <keyword> -p 1 # min
gidl <keyword> -p 6 # error
```

### SafeMode

```bash
google-image-downloader <keyword> --safe

or

gidl <keyword> --safe
```

## Video

[v1.0.0](https://youtu.be/9kImZbHJFxM)