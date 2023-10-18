import { NextApiRequest, NextApiResponse } from "next";
import instance from "./instance";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await instance.post("/auth/register", req.body);
  res.status(200).json(response.data);
};

export default register;
