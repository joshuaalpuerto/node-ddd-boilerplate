# Folder Structure

This boilerplate uses a folder structure and logical architecture focused on separation of concerns based in [Domain-driven design](http://dddcommunity.org/) and [Clean architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html). Instead of the classical `controllers`/`models`/`services` folders, we now have [layers](http://wiki.c2.com/?FourLayerArchitecture) inside the `src` folder. Each of the folder layers is scoped by a namespace regarding the concern it is about (like `user`, `errors`, `logging` and so on):

## Application layer (`app` folder)

The application layer is responsible to mediate between your input interfaces and your business domain. In this layer we'll have the use cases of your application and your application services (like a `MailService` that communicates with a `MailchimpService` from the infrastructure layer).

## Domain layer (`domain` folder)

Here you'll define your business domain classes, functions and services that compose your [domain model](https://martinfowler.com/eaaCatalog/domainModel.html). All your business rules should be declared in this layer so the application layer can use it to compose your use cases.

## Infrastructure layer (`infra` folder)

This is the lowest of the layers. In the infra layer you'll have the communication with what is outside your application, like the database (check the repository pattern section on [[Patterns recommendations and operations]]), mail services and direct communication with frameworks.

## Input interfaces layer (`interfaces` folder)

This folder contains all the entry points for your application. From the beginning here's where your Express controllers will be (inside the `interfaces/http` folder).
