import { NextApiRequest, NextApiResponse } from "next";
import instance from "./instance";

const getOneByEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;
  const response = await instance.get(`/user/${email}`);
  res.status(200).json(response.data);
};

export default getOneByEmail;
