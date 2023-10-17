import { NextApiRequest, NextApiResponse } from "next";
import instance from "./instance";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await instance.post("/auth/login", req.body);
  res.status(200).json(response.data);
};

export default login;
