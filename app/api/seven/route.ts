import { NextRequest, NextResponse } from "next/server";
import { SevenData } from "@/types";
import { prisma } from "@/libs/prisma";
import { format } from "date-fns";

export async function POST(req: NextRequest) {
  const { body }: { body: SevenData[] } = await req.json();
  const newBody = body.map((value, idx: number) => ({
    ...value,
    jan: String(value.jan),
    row: idx,
    createdAt: format(new Date(), "yyyy/MM/dd HH:mm:ss"),
  }));

  console.log("セブンユニフォーム upload")

  await prisma.seven.deleteMany();
  return await Promise.all(
    newBody.map(async (data) => await prisma.seven.create({ data }))
  )
    .then(async () => {
      await prisma.$disconnect();
      console.log("セブンユニフォーム 成功")
      return NextResponse.json("セヴンユニフォーム 成功", { status: 201 });
    })
    .catch(async (err) => {
      console.error(err);
      await prisma.$disconnect();
      return NextResponse.json("セヴンユニフォーム 失敗", { status: 500 });
    });
}
