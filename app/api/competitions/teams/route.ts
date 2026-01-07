import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const compId = Number(searchParams.get("comp_id"));
  const color = searchParams.get("color");

  if (!compId || !color) {
    return NextResponse.json({ error: "Missing Data" }, { status: 400 });
  }

  let query = supabase
    .from("teams")
    .select(
      `
        id,
        team_no,
        color,
        team_members(
            students(
                student_id,
                name,
                room
            )
        )
    `
    )
    .eq("comp_id", compId);

  if (compId != 5) {
    query = query.eq("color", color);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json(
      { error: "Query Error: " + error.message },
      { status: 500 }
    );
  }

  const team_data = data.map((team) => ({
    id: team.id,
    no: team.team_no,
    members: team.team_members,
  }));

  return NextResponse.json(team_data);
}
