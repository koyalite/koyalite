import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import { z } from 'zod';

const welcomeEmailSchema = z.object({
  username: z.string(),
  loginUrl: z.string().url(),
  supportEmail: z.string().email(),
});

export type WelcomeEmailProps = z.infer<typeof welcomeEmailSchema>;

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  username,
  loginUrl,
  supportEmail,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to KoyaLite - Get Started with Your Backend</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to KoyaLite!</Heading>
          
          <Text style={text}>Hi {username},</Text>
          
          <Text style={text}>
            Thank you for choosing KoyaLite for your backend needs. We're excited to help you build
            amazing applications with our platform.
          </Text>

          <Text style={text}>
            To get started, you can log in to your dashboard here:
          </Text>

          <Link href={loginUrl} style={button}>
            Access Your Dashboard
          </Link>

          <Text style={text}>
            If you have any questions or need assistance, don't hesitate to reach out to our support
            team at <Link href={`mailto:${supportEmail}`}>{supportEmail}</Link>.
          </Text>

          <Text style={footer}>
            Best regards,<br />
            The KoyaLite Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.1',
  margin: '0 0 24px',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const button = {
  backgroundColor: '#5850ec',
  borderRadius: '6px',
  color: '#fff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1',
  margin: '16px 0',
  padding: '12px 24px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '48px 0 0',
};

export default WelcomeEmail; 