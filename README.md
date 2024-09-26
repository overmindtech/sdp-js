# sdp.js

JavaScript libraries for the [SDP](https://github.com/overmindtech/sdp) protocol.

## Developing

Please make any changes in a feature branch and add a pull request. All changes should have relevant tests and documentation.

### Testing

Tests can be run with `pnpm run test` or the VSCode Test task.

### Style

Code formatting/style can be validated using:

```shell
pnpm codequality:check
```

And fixed using:

```shell
pnpm codequality:fix
```

### Local Development

To use a local version of this package in the frontend. You can build the package and then linking it:

```shell
pnpm build
```

Then in the frontend edit the `package.json` to point to the local package:

```json
"dependencies": {
  "@overmindtech/sdp": "file:../sdp-js/dist"
}
```

## Releasing

The package is automatically released each time a tag is created, so to release just create a tag such as `v1.23.6` and push that tag. This automatically triggers NPM publish etc.
