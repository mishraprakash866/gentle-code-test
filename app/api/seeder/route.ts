import type { NextApiRequest, NextApiResponse } from "next";
import seeder from "@/lib/seeder.json";
import { NextRequest } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    await delay(600);

    const q = req.nextUrl.searchParams.get("q") ?? "";

    let data = seeder;

    if (q.trim()) {
      data = data.filter((ele) =>
        ele.name?.toLowerCase().startsWith(q.toLowerCase()),
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
