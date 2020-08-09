# Bitfinex Dashboard

Thanks to the Bitfinex public WebSocket API, I've created a real-time dashboard that shows Ticker, Trade and Orders Book.
The application is also able to recover after the connection has been lost.

The tech stack is:

- React
- Redux
- Redux Saga
- Typescript
- Styled Component
- Jest

## To do

- Custom Styling
- CI/CD
- Depth Bars in Order Book
- Code splitting for Reducers/Sagas

## Environment

Node v12 or above. We recommend using a version manager like [nodenv](https://github.com/nodenv/nodenv) or [NVM](https://github.com/creationix/nvm)

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

## Git Commit Guidelines

Commit format should follow these conventional [rules](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)
