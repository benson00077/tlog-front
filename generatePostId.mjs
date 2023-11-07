import { v4 as uuidv4 } from 'uuid';
import clipboardy from 'clipboardy'

const uuid = uuidv4();
clipboardy.writeSync(uuid);

console.log(`\x1b[32mGenerated UUID:\x1b[0m ${uuid}`);
console.log(`\x1b[34mUUID copied to clipboard.\x1b[0m`);
