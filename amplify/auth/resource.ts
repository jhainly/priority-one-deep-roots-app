import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Verify your Priority One Deep Roots account"
    }
  },
  groups: ["ADMINS", "LEADERS"],
  userAttributes: {
    preferredUsername: {
      required: false,
      mutable: true
    }
  },
  accountRecovery: "EMAIL_ONLY"
});
