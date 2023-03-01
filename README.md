migrate:
	rm -rf build && yarn build && yarn typeorm migration:generate ./src/migrations/added-active -d ./src/utils/data-source.ts
db-push:
	yarn build && yarn typeorm migrate:run