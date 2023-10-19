import { NextApiRequest, NextApiResponse } from "next";
import instance from "./instance";

const createApiKey = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await instance.post(`/api-key`, req.body, {
    headers: req.headers,
  });
  res.status(200).json(response.data);
};

export default createApiKey;
