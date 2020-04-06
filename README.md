# test_tasks
This is a project created for a test task. Protractor test framework was used to create a project.

## Installation

Use npm to install Protractor globally with:

```bash
npm install -g protractor
```

This will install two command line tools, protractor and webdriver-manager.
The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. 

```bash
webdriver-manager update
```

Now start up a server with:

```bash
webdriver-manager start
```

## Usage

Run tests

```bash
protractor .\conf\conf.js
```
