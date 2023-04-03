# sdp.js

JavaScript libraries for the [SDP](https://github.com/overmindtech/sdp) protocol.

## Developing

Please make any changes in a feature branch and add a pull request. All changes should have relevant tests and documentation.

### Testing

Tests can be run with `npm run test` or the VSCode Test task

### Style

Code formatting/style can be validated using:

```
npm run codequality:check
```

And fixed using:

```
npm run codequality:fix
```

## Releasing

The package is automatically released each time a tag is created, so to release just create a tag such as `v1.23.6` and push that tag. This automatically triggers NPM publish etc.
