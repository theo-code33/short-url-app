import { NextApiRequest, NextApiResponse } from "next";
import instance from "./instance";

const deleteUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const response = await instance.delete(`/api-key/${id}`, {
    headers: req.headers,
  });
  res.status(200).json(response.data);
};

export default deleteUrl;
