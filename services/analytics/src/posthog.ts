import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.POSTHOG_API_KEY || "", {
    host: process.env.POSTHOG_HOST || "http://localhost:8000",
    flushAt: 1,
    flushInterval: 500,
});

export const trackEvent = (
    distinctId: string,
    event: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: Record<string, any> = {}
) => {
    posthog.capture({
        distinctId,
        event,
        properties,
    });
};

export const shutdownAnalytics = () => {
    posthog.shutdown();
};
