import { loadSync as _loadSync, Options, PackageDefinition } from '@grpc/proto-loader';
import { wrappers } from 'protobufjs';

export const loadSync = (filename: string | string[], options?: Options): PackageDefinition => {
  wrappers['.google.protobuf.Timestamp'] = {
    fromObject: function (value) {
      return {
        seconds: value.getTime() / 1000,
        nanos: (value.getTime() % 1000) * 1e6,
      };
    },
    toObject: function (message: { seconds: number; nanos: number }, _) {
      return new Date(message.seconds * 1000 + message.nanos / 1e6);
    },
  } as any;

  return _loadSync(filename, options);
};
