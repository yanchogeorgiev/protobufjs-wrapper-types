import { loadSync as _loadSync, Options, PackageDefinition } from '@grpc/proto-loader';
import { wrappers } from 'protobufjs';
import { struct } from 'pb-util';

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

  wrappers['.google.protobuf.Struct'] = {
    /**
     * Encodes a JSON object into a protobuf {@link Struct}.
     *
     * @param {Object.<string, *>} value the JSON object.
     * @returns {Struct}
     */
    fromObject(json: { [key: string]: any }): any {
      return struct.encode(json);
    },
    /**
     * Decodes a protobuf {@link Struct} into a JSON object.
     *
     * @param {Struct} struct the protobuf struct.
     * @returns {Object.<string, *>}
     */
    toObject({ fields = {} }: any): { [key: string]: any } {
      return struct.decode({ fields });
    }
  };

  return _loadSync(filename, options);
};
