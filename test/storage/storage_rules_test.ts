import * as testing from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { after, afterEach, before, beforeEach, describe, it } from 'mocha';
import { v4 } from 'uuid';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised').default;
chai.use(chaiAsPromised);

const projectId = 'demo-project';
const testBytes = new Uint8Array([1, 2, 3]);

const securityRulesPath = 'storage.rules';

describe('/files/{id} storage rules', async () => {
  let testEnv: testing.RulesTestEnvironment;
  let uid: string;

  before(async () => {
    testEnv = await testing.initializeTestEnvironment({
      projectId,
      storage: {
        rules: readFileSync(securityRulesPath, 'utf8'),
        host: '127.0.0.1',
        port: 9199,
      },
    });
  });

  beforeEach(async () => {
    uid = v4();
  });

  afterEach(async () => {
    await testEnv.clearStorage();
  });

  after(async () => {
    await testEnv.cleanup();
  });

  describe('update', () => {
    it('denies overwriting another user resource', async () => {
      const path = `files/${v4()}`;
      await testEnv
        .authenticatedContext(uid)
        .storage()
        .ref(path)
        .put(testBytes);

      const ref = testEnv.authenticatedContext(uid).storage().ref(path);
      await testing.assertFails(
        Promise.resolve(
          ref.put(testBytes),
        ),
      );
    });
  });
});
