import {readFile,access} from 'node:fs/promises';
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
const refs=[...html.matchAll(/(?:src|href)="(assets\/[^"#?]+)"/g)].map(m=>m[1]);
for(const ref of refs) await access(new URL(`../${ref}`,import.meta.url));
for(const id of ['work','about','experience','capabilities','resume','credentials','contact']){if(!html.includes(`id="${id}"`))throw new Error(`Missing section: ${id}`)}
if(!html.includes('data-i18n')||!html.includes('theme-toggle'))throw new Error('Missing language or theme controls');
const firebase=JSON.parse(await readFile(new URL('../firebase.json',import.meta.url),'utf8'));
if(!firebase.firestore?.rules||!firebase.hosting)throw new Error('Missing Spark Hosting or Firestore configuration');
const rules=await readFile(new URL('../firestore.rules',import.meta.url),'utf8');
if(!rules.includes('request.auth.uid')||!rules.includes('allow read, write: if false'))throw new Error('Firestore owner rules are incomplete');
console.log(`Portfolio check passed: ${new Set(refs).size} local assets and all required sections found.`);
