// useUser.tsx
import { createClient } from "@/utils/supabase/client";

const getUser = async () => {
  const superbase = createClient();
  const { data, error } = await superbase.auth.getUser();

  if (error || !data?.user) {
    return null;
  } else {
    return data.user;
  }
};

export default getUser;
