import { NextApiRequest, NextApiResponse } from "next";
import instance from "./instance";

const createUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await instance.post(`/url`, req.body, {
    headers: req.headers,
  });
  res.status(200).json(response.data);
};

export default createUrl;
