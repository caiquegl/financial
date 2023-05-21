import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aspjevpbfoggcqigddwj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzcGpldnBiZm9nZ2NxaWdkZHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwODgyNzgsImV4cCI6MTk5MjY2NDI3OH0.2fw3mSPECsaNOYWURR-gyctNevHtEoifHx_SFrRsewg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
