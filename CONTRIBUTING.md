# Contributing to KoyaLite

Thank you for your interest in contributing to KoyaLite! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

1. Check if the bug has already been reported in our [Issues](https://github.com/koyalite/koyalite/issues)
2. If not, create a new issue using our bug report template
3. Include:
    - Clear title and description
    - Steps to reproduce
    - Expected vs actual behavior
    - Version information
    - Error messages or logs

### Suggesting Enhancements

1. Check existing [Issues](https://github.com/koyalite/koyalite/issues) and [Discussions](https://github.com/koyalite/koyalite/discussions)
2. Create a new issue using our feature request template
3. Describe:
    - The problem you're trying to solve
    - Your proposed solution
    - Alternative solutions considered
    - Example use cases

### Pull Requests

1. Fork the repository
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes
4. Run tests and linting:
    ```bash
    pnpm test
    pnpm lint
    ```
5. Commit your changes using conventional commits:
    ```bash
    git commit -m "feat: add new feature"
    ```
6. Push to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
7. Create a Pull Request

## Development Setup

1. **Fork and Clone**

    ```bash
    git clone https://github.com/yourusername/koyalite.git
    cd koyalite
    ```

2. **Install Dependencies**

    ```bash
    pnpm install
    ```

3. **Set Up Environment**

    ```bash
    cp .env.example .env
    ```

4. **Start Development Server**
    ```bash
    pnpm dev
    ```

## Project Structure

- `apps/` - Applications

    - `admin/` - Admin dashboard
    - `studio/` - Database studio
    - `docs/` - Documentation site
    - `api/` - Main API service

- `packages/` - Shared packages
    - `core-types/` - TypeScript types
    - `sdk/` - Client SDK
    - `rls/` - Row Level Security
    - `logger/` - Logging utilities
    - etc.

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Document public APIs with JSDoc comments
- Use type inference where possible
- Avoid `any` type

### React

- Use functional components
- Use hooks for state and side effects
- Follow React best practices
- Use TypeScript with React

### Testing

- Write tests for new features
- Maintain test coverage
- Use Vitest for testing
- Write integration tests for critical paths

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or modifying tests
- `chore:` - Maintenance tasks

### Pull Request Process

1. Update documentation
2. Add tests for new features
3. Update CHANGELOG.md
4. Ensure CI passes
5. Get review from maintainers
6. Squash commits if requested

## Documentation

- Update docs with new features
- Use clear, concise language
- Include code examples
- Update TypeScript types
- Add JSDoc comments

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release PR
4. Get approval from maintainers
5. Merge and tag release
6. Publish to npm

## Getting Help

- Join our [Discord](https://discord.gg/koyalite)
- Ask in GitHub Discussions
- Check documentation
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
