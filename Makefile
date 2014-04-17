BIN = `npm bin`

test:
	${BIN}/mocha --reporter spec

watch:
	${BIN}/nodemon -x 'make test'

.PHONY: test watch
