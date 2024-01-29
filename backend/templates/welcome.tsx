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

interface WelcomeEmailProps {
  name: string;
  email: string;
}

export const WelcomeEmail = ({ name, email }: WelcomeEmailProps) => {
  const loginLink = `http://www.eativity.com/login?email=${email}`;

  return (
    <Html>
      <Head />
      <Preview>Your login code for Linear</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={LOGO} width="42" height="42" alt="Linear" style={logo} />
          <Heading style={heading}>Welcome {name}</Heading>
          <Section style={buttonContainer}>
            <Button style={button} href={loginLink}>
              Login to Eativity
            </Button>
          </Section>
          <Text style={paragraph}>
            This link and code will only be valid for the next 5 minutes. If the
            link does not work, you can use the login verification code
            directly:
          </Text>
          <Hr style={hr} />
          <Link href="#" style={reportLink}>
            Some small disclaimer text can go here
          </Link>
        </Container>
      </Body>
    </Html>
  );
};
