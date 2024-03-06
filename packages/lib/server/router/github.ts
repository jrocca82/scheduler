import { publicProcedure, router } from "../trpc";
import axios from "axios";
import { z } from "zod";
import { RepoInfo, Repository } from "../../types/Repos";

const githubHeaders = {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
}

export const githubRouter = router({
    getGithubUser: publicProcedure
        .query(async (opts) => {
            const config = {
                headers: githubHeaders
            };

            try {
                const response = await axios.get(`https://api.github.com/user`, config);

                return response.data;
            } catch (error) {
                // Handle errors
                console.error(error);
            }
        }),
    getRepos: publicProcedure
        .input(z.object({ per_page: z.number().lte(100), page: z.number().optional() }))
        .output(z.array(z.custom<Repository>()))
        .query(async (opts) => {
            const { per_page, page } = opts.input;

            const config = {
                headers: githubHeaders,
                params: {
                    sort: "updated",
                    per_page: per_page,
                    page: page ?? 1
                }
            };

            try {
                const response = await axios.get(`https://api.github.com/users/jrocca82/repos`, config);

                return response.data;
            } catch (error) {
                // Handle errors
                console.error(error);
            }

        }),
    getRepoInfo: publicProcedure
        .input(z.object({ repoName: z.string() }))
        .query(async (opts) => {

            const { repoName } = opts.input;
            const config = {
                headers: githubHeaders,
                params: {
                    sort: "updated"
                }
            };

            try {
                const response = await axios.get(`https://api.github.com/repos/jrocca82/${repoName}`, config);

                return response.data;
            } catch (error) {
                // Handle errors
                console.error(error);
            }

        }),
    getRepoLanguages: publicProcedure
        .input(z.object({ repoName: z.string() }))
        .output(z.array(z.string()))
        .query(async (opts) => {
            const { repoName } = opts.input;
            const config = {
                headers: githubHeaders
            };

            try {
                const response = await axios.get(`https://api.github.com/repos/jrocca82/${repoName}/languages`, config);

                const languages = Object.keys(response.data);

                return languages;
            } catch (error) {
                // Handle errors
                console.error(error);
                return []
            }

        })
});