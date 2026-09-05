# Vorasion - Agent Instructions

## Overview

Vorasion is a Discord bot that is meant to be a love letter to the vore community. It is mainly an economy bot that moved from Seyfert to Sapphire. The bot is strictly TypeScript only in terms of the project. This document is meant to provide instructions for AI agents who are helping to maintain and improve Vorasion.

## Folder Structure

The top level overview of the folder structure is as follows:

```
Vorasion/
├── apps/
├── packages/
├── package.json
├── bun.lock
├── docker-compose.yml
```

Any apps (like the bot or the website) go into `apps/`, shared packages (like the database or common utilities) go into `packages/`, and the root folder contains the shared files that are mainly used for development and deployment (like Commitlint, Husky, etc.).

## Coding Conventions

### TypeScript

Only use TypeScript in this project, JavaScript is too type weak and could result in runtime errors that TS could've solved. All code should be written in TypeScript, and any new packages or apps should be created with TypeScript in mind.

Prefer using `async/await` over `.then()` for handling promises, only resorting back when needed. Use `const` and `let` instead of `var`. Use arrow functions where appropriate.

Prefer using `import` and `export` statements over `require()` and `module.exports`. Use ESM modules instead of CommonJS.

Prefer using explicit and strong types for function parameters and return values. Avoid using the `any` type unless absolutely necessary (like whenever a package actually asks for it, or the compiler will complain otherwise and there's no other options, e.g. `Constructor<any>`).

This project has some already existing abstractions in place, so avoid modifying them unless absolutely necessary. If you do need to modify them, make sure to understand the implications of your changes and how they might affect other parts of the codebase, also make sure you understand the **existing abstractions** and how they work before making any changes. For example, the `CommandInteraction<T>` abstraction in `packages/bot-subcommands/types.ts` is used to handle command interactions in a type-safe way, and modifying it without understanding its purpose could lead to unexpected behavior. And do not modify the abstractions for the sole reason of making them simpler without understanding the implications of your changes (e.g. the purpose, type safety, maintainability, etc.).

Sometimes `as` is used for type assertions and `any` is used when a strong type doesn't work, like `value as Type` or `Constructor<any>`. This should be preserved within the existing code unless there's a good reason to change it, like if the type assertion is incorrect or if there's a better way to handle the type. Avoid using `as` for type assertions or `any` unless absolutely necessary.

## Formatting and Linting

This project uses Oxlint for linting and Oxfmt for formatting. Make sure to run the linter and formatter before committing any changes. The linter and formatter are configured to run automatically on pre-commit hooks, but it's still a good idea to run them manually to catch any issues early.

## Frameworks and Libraries

This project uses multiple different frameworks and libraries, including but not limited to:

- [Bun](https://bun.sh/) - The JavaScript runtime, package manager, bundler, and test runner used for this project.
- [Discord.js](https://discord.js.org/) - The library used to interact with the Discord API.
- [Sapphire Framework](https://www.sapphirejs.dev/) - The framework used to build the bot, providing a solid foundation for building Discord bots with TypeScript.
- [Discord UI Kit](https://npmx.dev/package/@vorasion-dev/discord-ui-kit) - A custom package that provides a set of UI components for building Discord bots, used for building custom UI components like buttons with a higher level of abstraction and less boilerplate.
- [MikroORM](https://mikro-orm.io/) - The ORM used for database interactions, providing a type-safe and efficient way to interact with the database.

For all of these, use the relevant skill available for documentation and information. If you need to use a library that does not have a skill, you can use the Context7 MCP to get the latest documentation if needed (use the skill first, and only use the MCP when absolutely necessary (e.g. a library that doesn't have a relevant skill available)) instead of hallucinating. Avoid hallucinating information about libraries, frameworks, or APIs, as it can lead to incorrect or outdated information. Always refer to the official documentation or the relevant skill for accurate information.

Here's what the flow should look like when using a library or framework:

- Try to use the relevant skill for documentation and information.
- If the skill does not have the information you need (or doesn't exist), use the `find-skills` skill to try to find a relevant skill for the library or framework (while checking on the safety of said skill). To check the safety, inspect the contents of the skill and make sure it is relevant to the library or framework you are trying to use, and that it is not outdated or incorrect as well as the security information the `skills` CLI shows. If the skill is safe, use it for documentation and information, install it then use it. If the skill is not safe, do not use it and move on to the next step.
- If you still can't find the information you need, use the Context7 MCP to get the latest documentation.

### Bun

Use bun for running the project and installing dependencies. Make sure to use the version installed in the project, and not the global version. Use `bun install` to install dependencies, and `bun run` to run scripts, etc.

### Discord.js

Use discord.js for most low-level Discord API interactions.

### Sapphire Framework

Use sapphire for building the bot and handling commands, events, and other bot-related functionality. This should be prioritized over discord.js for most bot-related functionality, as it provides a higher-level abstraction and better type safety, but you can fall back to discord.js for low-level interactions if needed.

### Discord UI Kit

The package `@vorasion-dev/discord-ui-kit` is a custom package that provides a set of UI components for building Discord bots. The documentation will be available in the `packages/discord-ui-kit` package, and you can use it to build custom UI components for the bot (like buttons). Prioritize it over discord.js for building UI components, as it provides a higher-level abstraction and better type safety. But fall back if absolutely needed.

### MikroORM

Use mikro-orm for database interactions. It provides a type-safe and efficient way to interact with the database, and should be prioritized over raw SQL queries or other ORMs. Use the documentation available in the `packages/orm` package for information on how to use it.

All entities (excluding abstracts) should be two separate files. An example would be a user entity. Here's what it should be like for a user entity.

- `user.entity-schema.ts` - This file contains the schema definition for the user entity, including the fields, types, and any validation rules. It defines the structure of the user entity in the database. This uses the `defineEntity` function from MikroORM to define the entity schema.
- `user.entity.ts` - The actual entity class that has all the business methods and stuff, it will extends `[SCHEMA].class` and have business logic only, TypeScript will infer the properties from the schema file. This is where you would put any methods that operate on the user entity, like `getFullName()` or `isAdmin()`. This class should not contain any schema definitions or validation rules, as those should be in the schema file.

All entities (excluding abstracts) should use separate folders as well, try to put relations together like this:

```plaintext
user/
  balance/
    balance.entity-schema.ts
    balance.entity.ts
  user.entity-schema.ts
  user.entity.ts
```

In addition, all entities should be in the `packages/orm/src/entities` folder. For example, if you have a user entity, it should be in `packages/orm/src/entities/user/user.entity.ts`.

The MikroORM CLI should be used for most MikroORM-related tasks, like generating and running migrations. It can be accessed from the root via the `orm` script. For example, to debug the CLI, run `bun orm debug`. To generate a migration, run `bun orm migration:generate`. To run migrations, run `bun orm migration:up`. To revert migrations, run `bun orm migration:down`. Make sure to use the CLI for these tasks, as it will ensure that the migrations are generated and run correctly.

## The Database

The database in development is handled via Docker, before running anything database related, check that the database is online. If it is not, run `docker compose up -d` in the root and wait for it to finish starting up. The database is a PostgreSQL database, and the connection details can be found in the `.env.local` file.

## Database Migrations

All database changes should be done through migrations. Use the MikroORM CLI to generate and run migrations. Make sure to test your migrations locally before committing them, and make sure they work as expected. Do not modify existing migrations, as this can cause issues with the database schema. If you need to make changes to an existing migration, create a new migration that modifies the schema instead.

## Committing Changes

Before committing any changes, make sure to run the linter and formatter to ensure that your code follows the coding conventions and is properly formatted. Make sure to test your changes locally before committing them, and make sure they work as expected. Also make sure to typecheck the codebase before committing, as this will catch any type errors that might have been introduced.

You can use the `format`, `lint`, and `typecheck` scripts in the root to run the formatter, linter, and typechecker respectively. You can also use the `check` script to run all three at the same time.

When committing changes, make sure to follow the commit message conventions. Use the following format for commit messages:

```plaintext
<type>(<scope>): <subject>
```

View the `commitlint.config.ts` to know what the main enum types are for the `<type>` field, and the `scope` should be the package or app that the changes are related to. The `subject` should be a short description of the changes made.

You can also put a longer description of the changes in the body of the commit message, and you can also include a footer with any relevant information, like issue numbers or breaking changes.

A script is available at the root, `bun commit` which runs `cz` to help you create a commit message that follows the conventions. It will prompt you for the type, scope, subject, body, and footer of the commit message, and it will generate a commit message that follows the conventions.
