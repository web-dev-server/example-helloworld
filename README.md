# Example - Hello World

[![Latest Stable Version](https://img.shields.io/badge/Stable-v1.2.0-brightgreen.svg?style=plastic)](https://github.com/web-dev-server/example-helloworld/releases)
[![License](https://img.shields.io/badge/Licence-BSD-brightgreen.svg?style=plastic)](https://github.com/web-dev-server/example-helloworld/blob/master/LICENCE.md)

Hallo world example with static and dynamic content.

## Instalation
```shell
git clone https://github.com/web-dev-server/example-helloworld.git example-helloworld
cd ./example-helloworld
npm update
```

## Usage
```shell
node run-server.js
```
- open your web browser and enjoy browsing on:
	- http://localhost:8000/
	- http://localhost:8000/static-content/
	- http://localhost:8000/dynamic-content/
	- http://localhost:8000/dynamic-content/?something=in&query=string
	- http://localhost:8000/dynamic-content/anything-else
