# Contribution guide

What you need to start developing FinderJS:

- [npm](http://npmjs.org)
- [grunt](http://gruntjs.com)
- [git](http://git-scm.com)
- A text editor

## Dev environment setup

Install `npm` and run:

```bash
$ npm install -g grunt-cli
```

```bash
$ npm install
```

### Run tests and create builds

To run tests:

```bash
$ npm test
```

To create minified file and generate API docs:

```bash
$ npm run build
```
## Coding style

### Indentation
  
Do:

- 4 spaces indent.

Dont:

- Don't mix tabs and spaces.
- Don't use comma-first coding style.

### Function declarations

Use:

```javascript
var myfunc = function (x, y) {
    return x + y;
}
```

### If-else blocks

Use:

```javascript
if (x === y) {
    dothis();
} else {
    dothat();
}
```

or:

```javascript
// This is what happens if `x === y`
if (x === y) {
    dothis();
}
// But if it doesn't match, we do that
else {
    dothat();
}
```

### Variables

- Declare variables at the beginning of the scope.
- Don't declare globals.
- If a variable needs to be used across methods, assign it as a property of the constructor.

### Whitespaces and newlines

- Do not, at whatever cost, leave trailing whitespaces. Fix your editor if needed.
- Keep newline at EOF.
- Use newlines liberally to visually separate logical blocks of code.

## Commits

- Give proper commit messages that describe the change.
- Each commit message should be granular, solving a specific issue.
- Don't mangle a lot of commits together, unless asked for.
- Use GFM in commit messages to link to issues if they are related.
- Use a short summary on the first line.
- Use Markdown in commit messages to make them more readable.
- Wrap commit message lines at 80 chars.

Here's a nice sample:

```
Fix #1 - Create something useful that people need

We intend to create a library that people need. To get this
done, we have come up with the following plans:

- We will write code that we are proud of.
- We will write code that is beautiful.
```

### Lint your code

JSHint is used for JavaScript linting. Check the [.jshintrc](.jshintrc) file to see the options used.

Before you make a commit, run the following code to ensure the lint passes and all tests are successful:

```shell
$ npm test
```

## Pull requests

- Ensure that you have worked on the latest code to avoid re-introducing removed diffs.
- Give a proper title to your pull requests.
- Giving a description will make the aliens smile.
- Giving a description is no excuse to commit messages that make aliens sad.
