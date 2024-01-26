// FIX-ME: This is a template from https://demo.react.email/preview/linear-login-code?view=desktop
// Copied the template as POC

import * as React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { MealLog } from "@prisma/client";

import { DaysOfWeek } from "types";

interface UserWeeklySummaryEmailProps {
  name: string;
  email: string;
  weeklyMacros: Record<DaysOfWeek, MealLog[]>;
}

export const UserWeeklySummaryEmail = ({
  name,
  email,
  weeklyMacros,
}: UserWeeklySummaryEmailProps) => {
  const DUMMY_LOGO =
    "https://react-email-demo-ijnnx5hul-resend.vercel.app/static/linear-logo.png";

  const loginLink = `http://www.eativity.com/login?email=${email}`;

  const hasWeeklyLogs = Object.values(weeklyMacros).flat().length > 0;

  return (
    <Html>
      <Head />
      <Preview>Your login code for Linear</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={DUMMY_LOGO}
            width="42"
            height="42"
            alt="Linear"
            style={logo}
          />
          <Heading style={heading}>Hello {name},</Heading>
          <Heading style={heading}>Here's your weekly summary:</Heading>
          <Section style={buttonContainer}>
            <Button style={button} href={loginLink}>
              Login to Eativity
            </Button>
          </Section>
          <Text style={paragraph}>Here's your macros of the week:</Text>

          {hasWeeklyLogs ? (
            Object.entries(weeklyMacros).map(([key, value]) => (
              <Section key={`${key}_log`}>
                <Text style={paragraph}>{key}:</Text>
                {value.map((entry) => (
                  <Section key={`log_${entry.id}`}>
                    <Text style={paragraph}>Food ID: {entry.foodId}</Text>
                    <Text style={paragraph}>Quantity: {entry.quantity}</Text>
                    <Hr />
                  </Section>
                ))}
              </Section>
            ))
          ) : (
            <Text>Nothing to show for - come back here u cheeky</Text>
          )}

          <Hr style={hr} />
          <Link href="#" style={reportLink}>
            Some small disclaimer text can go here
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#5e6ad2",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "10px 20px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};
