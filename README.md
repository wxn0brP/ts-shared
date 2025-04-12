# ts-shared (wts namespace)

`ts-shared` is a TypeScript-based shared utilities and libraries project designed to provide reusable components for various applications.

## Installation

This project uses Yarn workspaces. To install dependencies, run:

```bash
yarn add github:wxn0brp/ts-shared#dist # or e.g dist-jwt for jwt package
```

## Packages

### `@wxn0brp/wts-valthera-diff`
Utilities for processing database changes, including adding, removing, updating, and handling removed fields.

### `@wxn0brp/wts-jwt`
Tools for managing JWT tokens, including signing, encryption, and decryption, as well as key management.

### `@wxn0brp/wts-deep-merge`
Deep merge utility for merging nested objects and arrays.

### `@wxn0brp/wts-socket`
Utilities for managing socket.io events, including spam detection, event limiting, and error handling.

- **SocketEventLimiter**: Limits the number of times a specific event can be emitted to prevent spam.
- **SocketEventEngine**: Simplifies adding and managing socket events with built-in error handling.
- **ValidError**: Utility for generating standardized error responses for socket events.

## Contributing

Feel free to contribute by submitting issues or pull requests. Ensure your changes are well-documented and tested.

## License

This project is licensed under the MIT License.
