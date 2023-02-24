// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

type Data = {
  name: string;
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  req.headers = {
    ...req.headers,
    "content-type": "application/json charset=utf-8",
    Authorization: "token",
  };

  proxy.web(req, res, {
    target: `${process.env.API_PROXY}`,
    changeOrigin: true,
  });
}
