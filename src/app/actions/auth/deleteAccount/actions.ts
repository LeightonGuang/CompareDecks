import { createAdminClient } from "@/utils/supabase/server";

interface returnType {
  success: boolean;
  message: string;
}

export async function deleteAccount(
  userId: string,
): Promise<returnType | undefined> {
  const supabase = createAdminClient();

  try {
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      console.error(error);
      return { success: false, message: error.message };
    } else {
      return { success: true, message: "User deleted successfully" };
    }
  } catch (error) {
    console.error(error);
  }
}
