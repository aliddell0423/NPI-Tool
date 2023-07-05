/** @type {import('./$types').PageLoad} */
import { getTabContent, getCustomerDir, getScriptsPath, getFiles, findCCLFilename } from '$lib/server/filesystem';
import { updateCCLPath, get_ccl_path } from '$lib/server/db';

export async function load({ params }) {

    const paths_dict = {
        WIP: "B:\\WIP_EVAL",
        Specs: "Y:\\",
        Archived: "B:\\_Archived (BP)",
        Released: "B:\\_Released (BP)",
    };

    const customers = await getCustomerDir();

    const files_dict = {};

    const ccl_path = await get_ccl_path(params.stocknum);

    files_dict["Scripts"] = await getScriptsPath(params.stocknum);
    files_dict["CCL"] = "";

    for (const dir of Object.keys(paths_dict)) {
        files_dict[dir] = await getFiles(paths_dict[dir] + "\\" + params.stocknum);
    }

    return { files_dict, customers, ccl_path };
}

export const actions = {
    postCCL: async ({request, cookies, params}) => {
        const data = await request.formData();
        const customer = data.get('Customer')?.toString()
        const build = data.get('Build')?.toString()
        
        let path = "\\\\tscphxprod\\SHARED\\0-Quoting\\0-Quotes\\2016 - Current Quotes & CCL's\\" + customer + "\\" + build;
        const ccl_filename = await findCCLFilename(path);
        path = path + "\\" + ccl_filename;
        
        const { stocknum } = params;

        updateCCLPath(path, stocknum);
    }
};