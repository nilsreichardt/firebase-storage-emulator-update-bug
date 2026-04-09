# README

Use Node 20.x

```sh
npm install -g firebase-tools@15.13.0
firebase emulators:exec --only storage 'npm run test'
```

You will get:

```
firebase emulators:exec --only storage 'npm run test'
i  emulators: Starting emulators: storage
i  emulators: Detected demo project ID "demo-no-project", emulated services will use a demo configuration and attempts to access non-emulated services for this project will fail.
i  storage: Detected demo project ID "demo-no-project", using a default (open) rules configuration. Storage targets in firebase.json will be ignored.
i  Running script: npm run test

> security-rules-test@1.0.0 test
> mocha --timeout 0 --require ts-node/register/transpile-only --recursive "test/**/*_test.ts" --reporter spec -u tdd --exclude "node_modules/**"



  /files/{id} storage rules
    update
      1) denies updating a file


  0 passing (587ms)
  1 failing

  1) /files/{id} storage rules
       update
         denies updating a file:
     Error: Expected request to fail, but it succeeded.
      at /Users/nils/Projects/storage-rules-bug/node_modules/@firebase/rules-unit-testing/src/util.ts:137:9
      at processTicksAndRejections (node:internal/process/task_queues:95:5)



⚠  Script exited unsuccessfully (code 1)
i  emulators: Shutting down emulators.
i  storage: Stopping Storage Emulator
i  hub: Stopping emulator hub
i  logging: Stopping Logging Emulator

Error: Script "npm run test" exited with code 1
```