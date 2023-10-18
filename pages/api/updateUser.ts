import { NextApiRequest, NextApiResponse } from "next";
import instance from "./instance";

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const response = await instance.patch(`/user/${id}`, req.body);
  res.status(200).json(response.data);
};

export default updateUser;
