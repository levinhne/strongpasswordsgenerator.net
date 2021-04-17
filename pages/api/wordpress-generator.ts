import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    const { password } = req.query;
    const result = await axios.post("https://codebeautify.org/service/generateWordPressHash", `wordpressPassword=${encodeURIComponent(String(password))}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    res.status(200).json({code: 200, data:{"hash": result.data.trim()}});
}