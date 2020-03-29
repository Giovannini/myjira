# My JIRA

This project goal is to create a project management system that could fit my
need more than what JIRA is currently doing.

```
├── docker               → docker-related scripts and configuration
├── docs                 → READMEs and documentations related to the project
├── packages             → Source code of the application
│   ├── client           → Client code for the application
│   ├── models           → Shared model for the application
│   └── server           → Server code for the application
├── CONTRIBUTING.md      → Set of guidelines to contribute to the project
├── lerna.json           → Configuration file for the monorepo
├── package.json         → File holding various metadata relevant to the project
├── README.md            → This instructions file
└── tsconfig.json        → Common configuration for Typescript build
```

## Installing

### Prerequisite
 - [Git](https://git-scm.com/) is installed
 - [Docker](https://docs.docker.com/install/) (> 17) is installed
 - [Node](https://nodejs.org/) (10.x.x) is installed
 - [NPM](https://www.npmjs.com/get-npm) (> 5.6.0) is installed

## Building

To build the project, you can run the following commands:
```shell
$ npm install # install dev dependencies (eg Lerna and Typescript)
$ npm run build # build the Typescript sources
```

## Running

### Docker
TODO

### Client and server application
Then, to run the project, you can run:
```shell
$ npm run dev # Run client and server in parallel while watching sources
```

If you want to run only the client or the server, you can use this command:
```shell
$ npm run dev:client
$ npm run dev:server
```
