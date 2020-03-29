# Contributing to My JIRA

The following is a set of guidelines for contributing to My JIRA project and its packages, which are hosted on Github.
These are mostly guidelines, not rules.
Use your best judgment, and feel free to propose changes to this document in a pull request.

## What should I know before I get started ?

The My JIRA project handle every packages in a single repository managed by [Lerna](https://github.com/lerna/lerna) and [NPM](https://www.npmjs.com/).
The basic commands you may need have aliases in the root [`package.json`](./package.json) file.

## How can I contribute ?

### Development cycle
See [development_cycle.md](./docs/contributing/development_cycle.md)

### Models
The application models are mostly defined using `io-ts` to avoid
[pretending really hard](https://www.reaktor.com/blog/fear-trust-and-javascript/)
that a type system will save us from incorrect data format.
Those models can be used to verify input data inside our application.

### Tests
The differents flows developped during this project are most of the time implemented along with unit and/or integration tests.
You should always run those tests, at least for the flow you're touching.

To run integration tests, you will need to have environment variables set to connect to the services you test on.
The easiest way to do so is by copying the `.env.example` file content into a `.env` file at the same folder level to connect to the Docker resources.
Then you can run your tests this way: `npx lerna run --stream test:int --scope @jira/server` (example for server tests).

### Project cycle
TODO

## How do I create a release ?
TODO


## Best Practices

To keep code clear, readable and consistent, good practices must be followed by developers. These practices are detailed in several books and articles including [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882):

- **Single Responsibility Principle**: Each part of the code must deal with only one thing
- **Duplication, Refactoring**: Avoid duplicating the code, take advantage of it to refactor the common parts
- **Pure Functions**: Organize the code using pure functions, without side-effect
- **Avoid comments on how the code works** (it should be clear enough by itself) but do comment on why you made non obvious choices
- **Test the code**: use of automatic unit tests, integration tests...

The priority of the code must remain readability and ease of understanding by other developers.

### Coding convention

We use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to analyze and format code.
Those can be called manually like this:
```
$ npx prettier --write '**/*.{ts,json}'
$ npx eslint --fix './**/*.{ts}'
```
and they are automatically called as a commit hook.

- Code and comments in English
- 2 space indentation (enforced by Prettier)
- Avoid lines with more than 100 characters (enforced by Prettier)

### Git Best Practices
[Link](./docs/git.md)

## Common workflows

### Deployment on Nexus
To deploy the different packages on the Nexus, you can simply use Lerna publish feature.
Follow those steps:
1. Upgrade the version of the packages you want to publish using [Lerna version command](https://github.com/lerna/lerna/tree/master/commands/version)
2. Push those changes into a commit: "Bump module X to version X.X.X"
3. Publish the changes to the Nexus using [Lerna publish command](https://github.com/lerna/lerna/tree/master/commands/publish)
```
npx lerna publish from-git
```
The publication will necessit credentials that you should add in a .npmrc file:
```
always-auth=true
_auth=****
```
with the auth value equal to `echo -n "${REGISTRY_USERNAME}:${REGISTRY_PASSWORD}" | openssl base64`
