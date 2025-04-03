import { PolicyParser, ParsedPolicy, Expression, Condition } from './parser';
import { logger } from '@koyalite/logger';

export interface PolicyContext {
  user: {
    id: string;
    role: string;
    [key: string]: any;
  };
  row: Record<string, any>;
  variables: Record<string, any>;
}

export class PolicyEvaluator {
  private parser: PolicyParser;

  constructor() {
    this.parser = new PolicyParser();
  }

  evaluate(policy: string, context: PolicyContext): boolean {
    try {
      const parsed = this.parser.parse(policy);
      return this.evaluatePolicy(parsed, context);
    } catch (error) {
      logger.error({ error, policy }, 'Failed to evaluate policy');
      return false;
    }
  }

  private evaluatePolicy(policy: ParsedPolicy, context: PolicyContext): boolean {
    return policy.conditions.every(condition => this.evaluateCondition(condition, context));
  }

  private evaluateCondition(condition: Condition, context: PolicyContext): boolean {
    const leftValue = this.evaluateExpression(condition.left, context);
    const rightValue = this.evaluateExpression(condition.right, context);

    switch (condition.operator.toUpperCase()) {
      case '=':
        return leftValue === rightValue;
      case '!=':
        return leftValue !== rightValue;
      case '>':
        return leftValue > rightValue;
      case '<':
        return leftValue < rightValue;
      case '>=':
        return leftValue >= rightValue;
      case '<=':
        return leftValue <= rightValue;
      case 'LIKE':
        return this.evaluateLike(leftValue, rightValue);
      case 'ILIKE':
        return this.evaluateLike(leftValue, rightValue, true);
      case 'IN':
        return Array.isArray(rightValue) && rightValue.includes(leftValue);
      case 'IS':
        if (rightValue === 'NULL') return leftValue === null;
        return false;
      default:
        logger.warn({ operator: condition.operator }, 'Unknown operator in policy');
        return false;
    }
  }

  private evaluateExpression(expr: Expression, context: PolicyContext): any {
    switch (expr.type) {
      case 'value':
        return expr.value;
      case 'identifier':
        return this.resolveIdentifier(expr.value as string, context);
      case 'function':
        return this.evaluateFunction(expr.value as string, expr.args || [], context);
      default:
        logger.warn({ expressionType: expr.type }, 'Unknown expression type in policy');
        return null;
    }
  }

  private resolveIdentifier(identifier: string, context: PolicyContext): any {
    if (identifier.startsWith('@')) {
      const varName = identifier.slice(1);
      return context.variables[varName];
    }

    if (identifier.startsWith('user.')) {
      const path = identifier.split('.').slice(1);
      return path.reduce((obj, key) => obj?.[key], context.user);
    }

    return context.row[identifier];
  }

  private evaluateFunction(name: string, args: Expression[], context: PolicyContext): any {
    const evaluatedArgs = args.map(arg => this.evaluateExpression(arg, context));

    switch (name.toLowerCase()) {
      case 'now':
        return new Date();
      case 'coalesce':
        return evaluatedArgs.find(arg => arg !== null && arg !== undefined);
      case 'lower':
        return String(evaluatedArgs[0]).toLowerCase();
      case 'upper':
        return String(evaluatedArgs[0]).toUpperCase();
      case 'length':
        return String(evaluatedArgs[0]).length;
      case 'contains':
        return String(evaluatedArgs[0]).includes(String(evaluatedArgs[1]));
      case 'startswith':
        return String(evaluatedArgs[0]).startsWith(String(evaluatedArgs[1]));
      case 'endswith':
        return String(evaluatedArgs[0]).endsWith(String(evaluatedArgs[1]));
      default:
        logger.warn({ functionName: name }, 'Unknown function in policy');
        return null;
    }
  }

  private evaluateLike(value: any, pattern: any, caseInsensitive = false): boolean {
    if (typeof value !== 'string' || typeof pattern !== 'string') {
      return false;
    }

    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexPattern = escapeRegExp(pattern)
      .replace(/%/g, '.*')
      .replace(/_/g, '.');

    const regex = new RegExp(`^${regexPattern}$`, caseInsensitive ? 'i' : '');
    return regex.test(value);
  }
} 