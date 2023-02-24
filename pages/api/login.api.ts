import type { User } from "./user.api";
import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;

  try {
    const user = await axios.post("https://api.digicloud.dev/v1/tokens", {
      email,
      password,
    });
    console.log("===================<", user);

    // const userData = { isLoggedIn: true, login, avatarUrl: avatar_url } as User;
    req.session.user = user.data;
    await req.session.save();
    res.json({ isLoggedIn: true });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
  // if (userss.includes(username)) {
  //   const user = { isLoggedIn: true, login: username, avatarUrl: "" } as User;
  //   req.session.user = user;
  //   await req.session.save();
  //   res.json(user);
  // } else {
  //   res.status(500).json({ message: "user not found" });
  // }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
