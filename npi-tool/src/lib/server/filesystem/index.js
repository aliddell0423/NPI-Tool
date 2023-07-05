import { readdirSync, existsSync, statSync } from 'fs';
import { findMostSimilarString } from '$lib/server/utils'

 export async function getTabContent(stocknum, directory) {
    const files = await readdirSync(`${directory}\\${stocknum}`);
    return files;
 }

 export async function findCCLFilename(path) {
  const files = await readdirSync(path)
  let current_rev = "0";
  for(let file of files) {
    let file_name = file.split(".")[0];
    if(file_name.toLowerCase().includes("rev")) {
      if(file_name.charAt(file_name.length - 1) > current_rev.charAt(file_name.length - 1)) {
        current_rev = file;
      }
    }
  }

  return current_rev;
 }

 export async function getCustomerDir() {
   const path = "V:\\0-Quoting\\0-Quotes\\2016 - Current Quotes & CCL's\\"
   const customers = await readdirSync(path);
   const updated_list = customers.filter(item => item !== "Thumbs.db");
   const customer_map = updated_list.reduce((acc, value) => {
    acc[value] = readdirSync(path + value);
    return acc;
   }, {});
   return customer_map;
 }

 export async function getScriptsPath(stocknum) {
  if (existsSync("S:\\" + stocknum)) {
    return readDirRecursive("S:\\" + stocknum);
  }
  else {
    return readDirRecursive("T:\\" + stocknum);
  }
 }



export async function getFiles(path) {
  return readDirRecursive(path);
}

function readDirRecursive(path) {
  const stats = statSync(path);
  if (stats.isDirectory()) {
    const obj = {};
    const files = readdirSync(path);
    files.forEach((file) => {
      obj[file] = readDirRecursive(path + '/' + file);
    });
    return obj;
  } else {
    return null;
  }
}