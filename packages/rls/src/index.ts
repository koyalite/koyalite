import { PolicyEvaluator, PolicyContext } from "./evaluator";
import { PolicyParser, ParsedPolicy } from "./parser";

export class RLS {
    private evaluator: PolicyEvaluator;
    private parser: PolicyParser;

    constructor() {
        this.evaluator = new PolicyEvaluator();
        this.parser = new PolicyParser();
    }

    /**
     * Evaluate a policy against a context
     */
    evaluate(policy: string, context: PolicyContext): boolean {
        return this.evaluator.evaluate(policy, context);
    }

    /**
     * Parse a policy without evaluating it
     */
    parse(policy: string): ParsedPolicy {
        return this.parser.parse(policy);
    }

    /**
     * Validate a policy syntax without evaluating it
     */
    validate(policy: string): { valid: boolean; error?: string } {
        try {
            this.parser.parse(policy);
            return { valid: true };
        } catch (error) {
            return {
                valid: false,
                error: error instanceof Error ? error.message : "Invalid policy syntax",
            };
        }
    }
}

// Export types
export * from "./evaluator";
export * from "./parser";

// Export default instance
export default RLS;
