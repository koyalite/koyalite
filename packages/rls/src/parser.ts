import { z } from 'zod';

export type Token = {
  type: 'identifier' | 'operator' | 'value' | 'keyword' | 'punctuation';
  value: string;
  position: number;
};

export type ParsedPolicy = {
  conditions: Condition[];
  variables: string[];
};

export type Condition = {
  left: Expression;
  operator: string;
  right: Expression;
};

export type Expression = {
  type: 'identifier' | 'value' | 'function';
  value: string | number | boolean;
  args?: Expression[];
};

const KEYWORDS = ['AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'TRUE', 'FALSE'];
const OPERATORS = ['=', '!=', '>', '<', '>=', '<=', 'LIKE', 'ILIKE'];

export class PolicyParser {
  private pos = 0;
  private tokens: Token[] = [];
  private variables: Set<string> = new Set();

  parse(policy: string): ParsedPolicy {
    this.tokenize(policy);
    const conditions = this.parseConditions();
    return {
      conditions,
      variables: Array.from(this.variables),
    };
  }

  private tokenize(policy: string) {
    this.tokens = [];
    this.pos = 0;
    let current = '';

    const addToken = (type: Token['type'], value: string, position: number) => {
      this.tokens.push({ type, value, position });
    };

    for (let i = 0; i < policy.length; i++) {
      const char = policy[i];

      if (char === ' ' || char === '\n' || char === '\t') {
        if (current) {
          const upperCurrent = current.toUpperCase();
          if (KEYWORDS.includes(upperCurrent)) {
            addToken('keyword', upperCurrent, i - current.length);
          } else if (OPERATORS.includes(upperCurrent)) {
            addToken('operator', upperCurrent, i - current.length);
          } else {
            addToken('identifier', current, i - current.length);
          }
          current = '';
        }
        continue;
      }

      if (char === '(' || char === ')' || char === ',' || char === '.') {
        if (current) {
          addToken('identifier', current, i - current.length);
          current = '';
        }
        addToken('punctuation', char, i);
        continue;
      }

      if (char === '"' || char === "'") {
        if (current) {
          addToken('identifier', current, i - current.length);
          current = '';
        }
        let value = '';
        i++;
        while (i < policy.length && policy[i] !== char) {
          value += policy[i];
          i++;
        }
        addToken('value', value, i - value.length);
        continue;
      }

      if (char === '@') {
        this.variables.add(current);
      }

      current += char;
    }

    if (current) {
      const upperCurrent = current.toUpperCase();
      if (KEYWORDS.includes(upperCurrent)) {
        addToken('keyword', upperCurrent, policy.length - current.length);
      } else if (OPERATORS.includes(upperCurrent)) {
        addToken('operator', upperCurrent, policy.length - current.length);
      } else {
        addToken('identifier', current, policy.length - current.length);
      }
    }
  }

  private parseConditions(): Condition[] {
    const conditions: Condition[] = [];
    let current: Condition | null = null;

    while (this.pos < this.tokens.length) {
      const token = this.tokens[this.pos];

      if (!current) {
        current = {
          left: this.parseExpression(),
          operator: '',
          right: { type: 'value', value: '' },
        };
      } else if (!current.operator) {
        if (token.type === 'operator') {
          current.operator = token.value;
          this.pos++;
        } else {
          throw new Error(`Expected operator at position ${token.position}`);
        }
      } else {
        current.right = this.parseExpression();
        conditions.push(current);
        current = null;

        if (this.pos < this.tokens.length) {
          const nextToken = this.tokens[this.pos];
          if (nextToken.value === 'AND' || nextToken.value === 'OR') {
            this.pos++;
          }
        }
      }
    }

    return conditions;
  }

  private parseExpression(): Expression {
    const token = this.tokens[this.pos];
    this.pos++;

    if (token.type === 'value') {
      return {
        type: 'value',
        value: token.value,
      };
    }

    if (token.type === 'identifier') {
      if (this.pos < this.tokens.length && this.tokens[this.pos].value === '(') {
        // Function call
        this.pos++; // Skip (
        const args: Expression[] = [];
        while (this.pos < this.tokens.length && this.tokens[this.pos].value !== ')') {
          args.push(this.parseExpression());
          if (this.tokens[this.pos].value === ',') {
            this.pos++;
          }
        }
        this.pos++; // Skip )
        return {
          type: 'function',
          value: token.value,
          args,
        };
      }

      return {
        type: 'identifier',
        value: token.value,
      };
    }

    throw new Error(`Unexpected token at position ${token.position}`);
  }
} 