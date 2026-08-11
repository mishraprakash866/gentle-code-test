import type { NextApiRequest, NextApiResponse } from "next";
import seeder from "@/lib/seeder.json";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    let data = seeder;

    const q = req.query?.q ?? "";

    if (typeof q == "string" && q?.trim()?.length > 0) {
      data = data?.filter(
        (ele) => ele?.name?.toLowerCase() == q?.toLowerCase(),
      );
    }

    return new Response(JSON.stringify({ data, status: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error, status: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
