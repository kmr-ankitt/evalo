import { normalizeJS } from "./serializer";

// usage
const c1 = `function add(a,b){ return a+b }`;
const c2 = `function add(x,y){ return x-y }`;
const c3 = `function sum(m,n){ return m+n }`;

console.log(normalizeJS(c1).hash);
console.log(normalizeJS(c2).hash);
console.log(normalizeJS(c3).hash);

