import { publicProcedure, router } from "../trpc";
import axios from "axios";
import { z } from "zod";
import { VercelDeployment } from "../../types/Repos";

const vercelHeaders = {
    Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`
}

export const vercelRouter = router({
    getProjects: publicProcedure
        .input(z.object({ repoName: z.string() }).optional())
        .output(z.array(z.custom<VercelDeployment>()))
        .query(async (opts) => {
            const input = opts.input;

            const config = {
                headers: vercelHeaders
            };

            try {
                if (input) {
                    const response = await axios.get(`https://api.vercel.com/v9/projects/${input.repoName}`, config);
                    return response.data;
                }
                const response = await axios.get(`https://api.vercel.com/v9/projects`, config);

                return response.data.projects;
            } catch (error) {
                // Handle errors
                console.error(error);
                return []
            }
        })
})