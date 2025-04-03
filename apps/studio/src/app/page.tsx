import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { TableIcon, LockClosedIcon, PlayIcon, DatabaseIcon } from "@radix-ui/react-icons";

export default function Studio() {
    return (
        <div className="p-8">
            <Heading size="8">KoyaLite Studio</Heading>
            <Text size="4">Visual database management and schema design</Text>

            <Grid columns="2" gap="4" mt="6">
                <Card>
                    <Flex gap="2" align="center">
                        <TableIcon width={24} height={24} />
                        <div>
                            <Heading size="4">Schema Editor</Heading>
                            <Text>Design and modify your database schema</Text>
                        </div>
                    </Flex>
                </Card>

                <Card>
                    <Flex gap="2" align="center">
                        <LockClosedIcon width={24} height={24} />
                        <div>
                            <Heading size="4">RLS Policies</Heading>
                            <Text>Manage row-level security rules</Text>
                        </div>
                    </Flex>
                </Card>

                <Card>
                    <Flex gap="2" align="center">
                        <PlayIcon width={24} height={24} />
                        <div>
                            <Heading size="4">Query Runner</Heading>
                            <Text>Execute and test SQL queries</Text>
                        </div>
                    </Flex>
                </Card>

                <Card>
                    <Flex gap="2" align="center">
                        <DatabaseIcon width={24} height={24} />
                        <div>
                            <Heading size="4">ERD Viewer</Heading>
                            <Text>Visualize database relationships</Text>
                        </div>
                    </Flex>
                </Card>
            </Grid>
        </div>
    );
}
