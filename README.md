# Protobufjs with support for .google.protobuf.Timestamp

## Why does this package exist?

Protobuf.js does not have support for [Wrapper Types](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf) other than `.google.protobuf.Any`.

This (small) package adds Javascript support for [`google.protobuf.Timestamp`](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Timestamp) through the Date class. Any Date object with Protobuf type `google.protobuf.Timestamp` will be serialized to Google's Wrapper Type, and be deserialized back into a Date object.

This package is a **superset** of Protobuf.js. It just injects a custom handler for `google.protobuf.Timestamp` and then calls the upstream `protobufjs.loader()`. Just the synchronous loader function is implemented as this is intended to be used with NestJS.

## How to use the custom loader with NestJS

```
npm i @enriqcg/protobufjs-wrapper-types
```

```typescript
app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5000',
    package: 'package.name',
    protoPath: join(__dirname, 'path_to_proto'),
    // use this package as the custom protoloader
    protoLoader: '@enriqcg/protobufjs-wrapper-types',
  },
});
```

## Thanks to

Pull Requests have been created on [protobuf.js](https://github.com/protobufjs/protobuf.js) to address this issue, but are still open and don't look like they are going to be merged any time soon. I've based the code of this package on existing opened PRs and adapted it to make it work with Nest.JS.

- [@ntindall](https://github.com/ntindall) [protobufjs/protobuf.js#1258](https://github.com/protobufjs/protobuf.js/pull/1258)
- [@lucasmaehn](https://github.com/lucasmaehn) [stephenh/ts-proto#69 comment](https://github.com/stephenh/ts-proto/issues/69#issuecomment-1096981570)
