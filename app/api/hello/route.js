import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  return new NextResponse(
    JSON.stringify({ message: "Hello Buddy! Welcome to the API" }),
    { status: 200 }
  );
};

export const POST = async (req, res) => {
  const body = await req.json();
  console.log(body);
  return new NextResponse(
    JSON.stringify({ message: "Hello Buddy! Welcome to the API" }),
    { status: 200 }
  );
};
