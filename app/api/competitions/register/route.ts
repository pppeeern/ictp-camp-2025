import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { comp_id, color, team_no, student_id } = body;

    if (!comp_id || !team_no || !student_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let query = supabase
      .from("teams")
      .select("*")
      .eq("comp_id", comp_id)
      .eq("team_no", team_no);
    if (color) {
      query = query.eq("color", color);
    }

    const { data: globalCheck, error: globalError } = await supabase
      .from("team_members")
      .select("team_id, teams!inner(comp_id)")
      .eq("student_id", student_id)
      .eq("teams.comp_id", comp_id)
      .maybeSingle();


    
    if (globalCheck) {
        return NextResponse.json({ success: true, action: "already", team_no });
    }

    const { data: teamData, error: read_error } = await query.maybeSingle();
    if (read_error) {
      console.error("read error:", read_error);
      return NextResponse.json({ error: read_error.message }, { status: 500 });
    }

    if (!teamData) {
      const { data: new_team, error: insert_team_error } = await supabase
        .from("teams")
        .insert([{ comp_id, color, team_no }])
        .select()
        .maybeSingle();

      if (insert_team_error)
        return NextResponse.json(
          { error: insert_team_error.message },
          { status: 500 }
        );

      const { error: insert_new_team_member_error } = await supabase
        .from("team_members")
        .insert([{ team_id: new_team.id, student_id }]);

      if (insert_new_team_member_error)
        return NextResponse.json(
          { error: insert_new_team_member_error.message },
          { status: 500 }
        );

      return NextResponse.json({ success: true, action: "created", team_no });
    }

    const { data: member, error: read_member_error } = await supabase
      .from("team_members")
      .select("*")
      .eq("team_id", teamData.id)
      .eq("student_id", student_id)
      .maybeSingle();

    if (read_member_error)
      return NextResponse.json(
        { error: read_member_error.message },
        { status: 500 }
      );

    if (!member) {
      const { error: insert_member_error } = await supabase
        .from("team_members")
        .insert([{ team_id: teamData.id, student_id }]);

      if (insert_member_error)
        return NextResponse.json(
          { error: insert_member_error.message },
          { status: 500 }
        );

      return NextResponse.json({ success: true, action: "added", team_no });
    } else {
      return NextResponse.json({ success: true, action: "already", team_no });
    }
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
