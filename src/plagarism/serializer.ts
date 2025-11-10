import * as acorn from "acorn";
import * as crypto from "crypto";

let idCounter = 0;
const idMap = new Map<string,string>();

function getId(name:string){
  if(!idMap.has(name)){
    idCounter++;
    idMap.set(name, `v${idCounter}`);
  }
  return idMap.get(name)!;
}

function walk(node:any){
  if(!node) return;

  if(node.type === "Identifier"){
    node.name = getId(node.name);
  }

  for(const key of Object.keys(node)){
    const val = (node as any)[key];
    if(val && typeof val === "object"){
      if(Array.isArray(val)){
        val.forEach(walk);
      } else {
        walk(val);
      }
    }
  }
}

export function normalizeJS(code:string){
  idCounter = 0;
  idMap.clear();

  const ast = acorn.parse(code, { ecmaVersion: "latest" });
  walk(ast);

  const serialized = JSON.stringify(ast);
  const hash = crypto.createHash("sha256").update(serialized).digest("hex");

  return { hash, serialized };
}

