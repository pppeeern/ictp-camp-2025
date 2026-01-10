import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { student_id, sport, rank_1, rank_2, rank_3 } = body;

    if (!student_id || !sport || !rank_1 || !rank_2 || !rank_3) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: existingBet } = await supabase
      .from("sport_bet")
      .select("id")
      .eq("student_id", student_id)
      .eq("sport", sport)
      .maybeSingle();

    let error;
    if (existingBet) {
      const { error: updateError } = await supabase
        .from("sport_bet")
        .update({
          rank_1: rank_1,
          rank_2: rank_2,
          rank_3: rank_3
        })
        .eq("id", existingBet.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("sport_bet").insert([
        {
          student_id: student_id,
          sport: sport,
          rank_1: rank_1,
          rank_2: rank_2,
          rank_3: rank_3,
        },
      ]);
      error = insertError;
    }

    if (error) return NextResponse.json({ error: error }, { status: 500 });

    return NextResponse.json({ success: true, action: "bet", student_id });
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
