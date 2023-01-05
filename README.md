# sdp.js

JavaScript libraries for the [SDP](https://github.com/overmindtech/sdp) protocol.

## Developing

Please make any changes in a feature branch and add a pull request. All changes should have relevant tests and documentation.

### Testing

Tests can be run with `npm run test` or the VSCode Test task

### Style

Style can be validated using:

```
npm run codequality:check
```

And fixed using:

```
npm run codequality:fix
```

## Releasing

`npm publish` is automatically triggered when a new release is created in Github. As such all releases should also have tags.
