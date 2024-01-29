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

import {
  LOGO,
  button,
  buttonContainer,
  container,
  heading,
  hr,
  logo,
  main,
  paragraph,
  reportLink,
} from "./styles";

import { DaysOfWeek, TotalIntakes } from "types";

interface UserWeeklySummaryEmailProps {
  name: string;
  email: string;
  weeklyMacros: Record<DaysOfWeek, TotalIntakes>;
}

export const UserWeeklySummaryEmail = ({
  name,
  email,
  weeklyMacros,
}: UserWeeklySummaryEmailProps) => {
  const loginLink = `http://www.eativity.com/login?email=${email}`;

  const hasWeeklyLogs = Object.values(weeklyMacros).flat().length > 0;

  return (
    <Html>
      <Head />
      <Preview>Your login code for Linear</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={LOGO} width="42" height="42" alt="Linear" style={logo} />
          <Heading style={heading}>Hello {name},</Heading>
          <Heading style={heading}>Here's your weekly summary:</Heading>
          <Section style={buttonContainer}>
            <Button style={button} href={loginLink}>
              Login to Eativity
            </Button>
          </Section>

          <Hr />
          <Text style={heading}>Here's your macros of the week:</Text>

          {hasWeeklyLogs ? (
            Object.entries(weeklyMacros).map(([key, value]) => (
              <Section key={`${key}_log`}>
                <Text style={heading}>{key}:</Text>
                <Hr />
                <Text style={paragraph}>Total calories: {value.calories}</Text>
                <Text style={paragraph}>Total proteins: {value.proteins}</Text>
                <Text style={paragraph}>
                  Total carbohydrates: {value.carbohydrates}
                </Text>
                <Text style={paragraph}>Total fats: {value.fats}</Text>
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
