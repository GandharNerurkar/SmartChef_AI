const PRO_PLAN_KEYS = ["pro", "pro_plan", "pro-plan"];

export const getSubscriptionTier = (has) => {
  if (typeof has !== "function") return "free";

  const configuredPlanKey = process.env.NEXT_PUBLIC_CLERK_PRO_PLAN_KEY;
  const configuredFeatureKey = process.env.NEXT_PUBLIC_CLERK_PRO_FEATURE_KEY;

  const planKeys = configuredPlanKey
    ? [configuredPlanKey, ...PRO_PLAN_KEYS]
    : PRO_PLAN_KEYS;

  const hasProPlan = planKeys.some((key) => has({ plan: key }));
  if (hasProPlan) return "pro";

  // Optional fallback: some setups gate access via feature keys.
  if (configuredFeatureKey && has({ feature: configuredFeatureKey })) {
    return "pro";
  }

  return "free";
};
