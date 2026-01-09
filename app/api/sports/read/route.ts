import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const studentId = Number(searchParams.get("student_id"));
  const sport = searchParams.get("sport");

  if (!studentId || !sport) {
    return NextResponse.json({ error: "Missing Data" }, { status: 400 });
  }

  let query = supabase
    .from("sport_bet")
    .select(`rank_1, rank_2, rank_3`)
    .eq("student_id", studentId)
    .eq("sport", sport)
    .single();
  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: "Query Error: " + error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
