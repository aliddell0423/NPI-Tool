/** @type {import('./$types').PageLoad} */
import { getTabContent, getCCL, getScriptsPath, getFiles } from '$lib/server/filesystem';

export async function load({ params }) {

    const paths_dict = {
        WIP: "B:\\WIP_EVAL",
        Specs: "Y:\\",
        Archived: "B:\\_Archived (BP)",
        Released: "B:\\_Released (BP)",
    };

    const files_dict = {};

    files_dict["Scripts"] = await getScriptsPath(params.stocknum);

    for (const dir of Object.keys(paths_dict)) {
        files_dict[dir] = await getFiles(paths_dict[dir] + "\\" + params.stocknum);
    }

    return { files_dict };
}