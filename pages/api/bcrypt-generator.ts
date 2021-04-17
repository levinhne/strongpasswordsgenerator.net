import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    const {password, round} = req.query;
    console.log({password, round} );
    const salt:string = bcrypt.genSaltSync(Number(round));
    const hash:string = bcrypt.hashSync(String(password), salt);
    res.status(200).json({code: 200, data:{"hash": hash}});
}