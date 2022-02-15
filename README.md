# @the-devoyage/graphql-starter-microservice

Use this repo as an easy way to get a Federated Graphql Subgraph up and running quickly.

## Features

### Context Generation From Incoming Headers + Custom Context PreBuilt

This repo is pre-integrated with the package `@the-devoyage/micro-auth-helpers` to enable standardized context between micro services, including auth context. [Read More](https://github.com/The-Devoyage/micro-auth-helpers). Here is how it works:

1. When properly installed behind a Gateway Service ([Buy Instant Gateway](https://basetools.io/checkout/XGUVNNGr)), the micro-service will receive requests.

2. Each request delivered to this microservice should contain a `context` header. The value of the `context` key should be stringified json.

3. All context passed to the server within the `context` header is automatically converted to Context, available within all resolvers of this service.

4. Read the docs for the micro-auth-helpers package to learn more about context injection, and more.

### Find, Filter, and Paginate features Pre-Installed

This repo is pre-integrated with the package `@the-devoyage/mongo-filter-generator` to enable standardized finding, filtering, and pagination throughout your api. [Read More](https://github.com/The-Devoyage/mongo-filter-generator/packages/1228449).

### Codegen Included

This repo is pre-integrated with the `graphql-codegen` to generate typescript types for resolvers, models, and context.

## It's a Starter Template

Hey, poke around and enjoy. It's a starter template! Most things should be pretty self explanatory.
