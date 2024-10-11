import routes, { baseUrl } from "@/config/routes";
import { prisma } from "@/lib/prisma/client";
import { faker } from "@faker-js/faker";
import { NextRequest, NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import colors from "tailwindcss/colors";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: NextRequest) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const { header } = jwt.decode(token, { complete: true }) as { header: any };
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event: any = await jwt.verify(token, signingKey);

    // Handle user created
    if (event?.type === "user.created") {
      const user = event?.data?.user;

      if (!user || !user.id) {
        return NextResponse.redirect(`${baseUrl}${routes.login}`);
      }

      // check if the user exists in the db
      let dbUser = await prisma.user.findUnique({
        where: { kindeId: user.id },
      });

      // user were not found, we will create it
      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            kindeId: user.id,
            displayName:
              user?.first_name || user.username ||
              user.given_name ||
              faker.internet.userName(),
            email: user.email ?? "",
            color: faker.helpers.arrayElement([
              colors.emerald["500"],
              colors.yellow["500"],
              colors.green["500"],
              colors.pink["500"],
              colors.purple["500"],
              colors.red["500"],
              colors.amber["500"],
            ]),
          },
        });
      }

      // redirect the user to dashboard page
      return NextResponse.redirect(
        `${baseUrl}${routes.dashboard}?dbUser=${JSON.stringify(dbUser)}`
      );
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
}
