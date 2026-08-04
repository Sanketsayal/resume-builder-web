export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },

  dashboard: {
    stats: ["dashboard", "stats"] as const,
  },

  resumes: {
    all: ["resumes"] as const,

    detail: (id: string) => ["resumes", id] as const,

    completion: (id: string) => ["resumes", id, "completion"] as const,

    preview: (id: string) => ["resumes", id, "preview"] as const,
  },

  profile: {
    me: ["profile"] as const,
  },
};
