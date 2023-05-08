import { readdirSync, existsSync } from 'fs';
import { findMostSimilarString } from '$lib/server/utils'

 export async function getTabContent(stocknum, directory) {
    const files = await readdirSync(`${directory}\\${stocknum}`);
    return files;
 }

 export async function getCCL(customer, assembly) {
   const path = "V:\\0-Quoting\\0-Quotes\\2016 - Current Quotes & CCL's\\"
   const customers = await readdirSync(path);
   const likely_customer = findMostSimilarString(customer, customers) + "\\"

   const assemblies = await readdirSync(path + likely_customer);
   const likely_assembly = findMostSimilarString(assembly, assemblies) + "\\";

   const files = await readdirSync(path + likely_customer + likely_assembly)
   const likely_ccl = findMostSimilarString("CCL_Rev", files);
   console.log(likely_ccl);
 }

 export async function getScriptsPath(stocknum) {
  if (existsSync("S:\\" + stocknum)) {
    return await readdirSync("S:\\" + stocknum);
  }
  else {
    return await readdirSync("T:\\" + stocknum);
  }
 }

 export async function getFiles(dirpath) {
  if (existsSync(dirpath)) {
    return await readdirSync(dirpath);
  }
  return null;
 }