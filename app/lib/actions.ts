'use server'
 
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { supabase } from '@/app/lib/supabase'

const FormSchema = z.object({
  studentId: z.string().min(1, 'กรุณาระบุรหัสนักเรียน'),
  pin: z.string().length(6, 'PIN ต้องเป็นตัวเลข 6 หลัก'),
  confirmPin: z.string().length(6, 'PIN ต้องเป็นตัวเลข 6 หลัก'),
}).refine((data) => data.pin === data.confirmPin, {
  message: "รหัส PIN ไม่ตรงกัน",
  path: ["confirmPin"],
});

export type RegisterState = {
  errors?: {
    studentId?: string[];
    pin?: string[];
    confirmPin?: string[];
  };
  message?: string | null;
};

export async function register(prevState: RegisterState | null, formData: FormData): Promise<RegisterState> {
  const validatedFields = FormSchema.safeParse({
    studentId: formData.get('studentId'),
    pin: formData.get('pin'),
    confirmPin: formData.get('confirmPin'),
  })
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน'
    };
  }
 
  const { studentId, pin } = validatedFields.data;
  
  try {
    const { data: existingStudent, error: fetchError } = await supabase
      .from('students')
      .select('*')
      .eq('student_id', studentId)
      .maybeSingle()

    if (fetchError) {
        console.error('Supabase fetch error:', fetchError);
        return { message: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล' };
    }

    if (!existingStudent) {
        return { message: 'ไม่พบข้อมูลนักเรียนในระบบ' };
    }

    if (existingStudent.pin) {
        return { message: 'บัญชีนี้ถูกลงทะเบียนแล้ว กรุณาไปที่หน้าเข้าสู่ระบบ' };
    }

    const hashedPassword = await bcrypt.hash(pin, 10);

    const { error } = await supabase
      .from('students')
      .update({ pin: hashedPassword })
      .eq('id', existingStudent.id)

    if (error) {
        console.error('Supabase update error:', error)
        throw new Error('ไม่สามารถอัปเดตข้อมูลได้')
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    return { message: 'เกิดข้อผิดพลาดบางอย่าง' };
  }

  try {
    await signIn('credentials', {
        studentId,
        pin,
        redirectTo: '/',
    })
    return { message: null };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'ข้อมูลไม่ถูกต้อง' };
        default:
          return { message: 'เกิดข้อผิดพลาดบางอย่าง' };
      }
    }
    throw error
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const studentId = formData.get('studentId');
    const pin = formData.get('pin');
    
    await signIn('credentials', {
        studentId,
        pin,
        redirectTo: '/',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'ข้อมูลไม่ถูกต้อง'
        default:
          return 'เกิดข้อผิดพลาดบางอย่าง'
      }
    }
    throw error
  }
}

const ChangePinSchema = z.object({
  oldPin: z.string().length(6, 'PIN ต้องเป็นตัวเลข 6 หลัก'),
  newPin: z.string().length(6, 'PIN ต้องเป็นตัวเลข 6 หลัก'),
  confirmNewPin: z.string().length(6, 'PIN ต้องเป็นตัวเลข 6 หลัก'),
}).refine((data) => data.newPin === data.confirmNewPin, {
  message: "รหัส PIN ใหม่ไม่ตรงกัน",
  path: ["confirmNewPin"],
});

export type ChangePinState = {
  message?: string | null;
  success?: boolean;
};

export async function changePin(
  prevState: ChangePinState | null,
  formData: FormData,
) {
  const session = await import("@/auth").then((mod) => mod.auth());
  if (!session?.user?.studentId) {
    return { message: 'กรุณาเข้าสู่ระบบ' };
  }

  const validatedFields = ChangePinSchema.safeParse({
    oldPin: formData.get('oldPin'),
    newPin: formData.get('newPin'),
    confirmNewPin: formData.get('confirmNewPin'),
  });

  if (!validatedFields.success) {
     const errorMessages = validatedFields.error.flatten().fieldErrors;
     const firstError = Object.values(errorMessages).flat()[0];
     return { message: firstError || 'ข้อมูลไม่ถูกต้อง' };
  }

  const { oldPin, newPin } = validatedFields.data;

  try {
     const { data: student, error: fetchError } = await supabase
      .from('students')
      .select('id, pin')
      .eq('student_id', session.user.studentId)
      .single();

     if (fetchError || !student) {
        return { message: 'ไม่พบข้อมูลผู้ใช้' };
     }

     const isPasswordValid = await bcrypt.compare(oldPin, student.pin);
     if (!isPasswordValid) {
        return { message: 'รหัส PIN เดิมไม่ถูกต้อง' };
     }

     const hashedNewPin = await bcrypt.hash(newPin, 10);
     const { error: updateError } = await supabase
       .from('students')
       .update({ pin: hashedNewPin })
       .eq('id', student.id);

     if (updateError) {
        return { message: 'ไม่สามารถเปลี่ยนรหัส PIN ได้' };
     }

     return { message: 'เปลี่ยนรหัส PIN สำเร็จ', success: true };

  } catch (error) {
     console.error('Change PIN error:', error);
     return { message: 'เกิดข้อผิดพลาดบางอย่าง' };
  }
}

export type LeaderboardItem = {
  id: string;
  team_name: string;
  score: number;
  rank: number;
};

import { isAdmin } from './admin';

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false }); 
  
  if (error) {
      console.error("Error fetching leaderboard:", error);
      return [];
  }
  return data as LeaderboardItem[];
}

export async function upsertLeaderboardTeam(teamName: string, score: number) {
    const session = await import("@/auth").then((mod) => mod.auth());
    if (!isAdmin(session?.user?.studentId)) {
        throw new Error("Unauthorized");
    }

    const { data: existing } = await supabase.from('leaderboard').select('*').eq('team_name', teamName).maybeSingle();

    if (existing) {
        const { error } = await supabase.from('leaderboard').update({ score, updated_at: new Date() }).eq('team_name', teamName);
        if (error) throw error;
    } else {
        const { error } = await supabase.from('leaderboard').insert({ team_name: teamName, score });
        if (error) throw error;
    }
}


export async function deleteLeaderboardTeam(id: string) {
    const session = await import("@/auth").then((mod) => mod.auth());
    if (!isAdmin(session?.user?.studentId)) {
        throw new Error("Unauthorized");
    }

    const { error } = await supabase.from('leaderboard').delete().eq('id', id);
    if (error) throw error;
}

export async function getSportResults() {
  const { data, error } = await supabase
    .from('sport_results')
    .select('*');
  
  if (error) {
      console.error("Error fetching sport results:", error);
      return [];
  }
  return data;
}

export async function upsertSportResult(sportAbbr: string, rank1: string, rank2: string, rank3: string) {
    const session = await import("@/auth").then((mod) => mod.auth());
    if (!isAdmin(session?.user?.studentId)) {
        throw new Error("Unauthorized");
    }

    const { data: existing } = await supabase.from('sport_results').select('*').eq('sport', sportAbbr).maybeSingle();

    if (existing) {
        const { error } = await supabase.from('sport_results').update({ 
            rank_1: rank1,
            rank_2: rank2,
            rank_3: rank3,
            updated_at: new Date()
        }).eq('sport', sportAbbr);
        if (error) throw error;
    } else {
        const { error } = await supabase.from('sport_results').insert({ 
            sport: sportAbbr,
            rank_1: rank1,
            rank_2: rank2,
            rank_3: rank3
        });
        if (error) throw error;
    }
}
