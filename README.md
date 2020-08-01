## Environment

Node v10 or above. We recommend using a version manager like [nodenv](https://github.com/nodenv/nodenv) or [NVM](https://github.com/creationix/nvm)

If you are using NVM and [ZSH](https://ohmyz.sh/) as a CLI, you can enable automatic switch of the nvm version based on the .nvmrc file in the folder. To do it edit the zshrc file:

```shell
nano ~/.zshrc
```

and adding at the end of the file:

```
autoload -U add-zsh-hook
load-nvmrc() {
  if [[ -f .nvmrc && -r .nvmrc ]]; then
    nvm use
  elif [[ $(nvm version) != $(nvm version default)  ]]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## Install and run locally

```shell
# Install Node dependencies
$ npm install

# Run the application
$ npm run start
```

## Testing

```shell
# Run tests in watch mode
$ npm run test

# Run tests once
$ npm run test:once

# Run tests once with coverage
$ npm run test:once:coverage

# Run tests that match specific path
$ npm run test path/to/my-test/__tests__/
```

## Code Style and linting

The code style and rules are defined in the tsconfig.json and .eslintrc files.

```shell
# Run lint checker
$ npm run lint
```

## Run check-types

```shell
# Check the types of JavaScript values
$ npm run check-types
```

## Run bundle analyzer

```shell
# Create an interactive treemap visualization of the contents of all bundles
$ npm run analyze
```

### Git Commit Guidelines

Commit format should follow these conventional [rules](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)

### Commit Message Format

Each commit message consists of a **type**, a **scope** and a **message**.

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope

A scope may be provided to a commit's type, to provide additional contextual information and is contained **within parenthesis**.

### Message

The message contains a brief description of the change.

Commit message template:

```
[type]([scope]): [message]
```

#### Example:

```
git commit -m 'feat(parser): add ability to parse arrays'
```

### Breaking Changes

Commit message with Breaking Changes template:

```
[type]([scope]): [subject]
>
>
BREAKING CHANGE/S: [message]
```

#### Breaking Changes example:

```
git commit -m 'refactor(authentication): add keycloack
>
>
BREAKING CHANGE: migration to keycloak'
```

### Versions

Each commit will be compared with realease rules and when it matches, the commit will be associated with the release type in the rule's release property. If a commit match multiple rules, the highest release type (major > minor > patch) is associated with the commit.

| Type            | Release   |
| --------------- | --------- |
| chore           | patch     |
| build           | patch     |
| ci              | patch     |
| docs            | patch     |
| feat            | minor     |
| fix             | minor     |
| perf            | minor     |
| refactor        | minor     |
| style           | patch     |
| test            | patch     |
| BREAKING CHANGE | **major** |

For more information, please visit:
https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
