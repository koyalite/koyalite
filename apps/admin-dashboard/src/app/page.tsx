import { Card, Title, Text } from '@tremor/react';
import { Flex, Grid } from '@radix-ui/themes';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <Title>KoyaLite Admin Dashboard</Title>
      <Text>Manage your KoyaLite instance</Text>

      <Grid columns="3" gap="4" mt="6">
        <Card>
          <Title>Users</Title>
          <Text>Manage users and roles</Text>
        </Card>

        <Card>
          <Title>Projects</Title>
          <Text>View and manage projects</Text>
        </Card>

        <Card>
          <Title>Edge Functions</Title>
          <Text>Deploy and monitor functions</Text>
        </Card>

        <Card>
          <Title>Storage</Title>
          <Text>Manage file storage</Text>
        </Card>

        <Card>
          <Title>Email</Title>
          <Text>View email logs and templates</Text>
        </Card>

        <Card>
          <Title>Analytics</Title>
          <Text>System metrics and usage</Text>
        </Card>
      </Grid>
    </div>
  );
} 