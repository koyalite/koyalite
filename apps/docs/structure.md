koyalite/
├── apps/
│   ├── admin-dashboard/    # React/Vue/Svelte frontend for the Admin UI
│   │   ├── public/
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── studio/             # React/Vue/Svelte frontend for KoyaLite Studio (Visual DB UI)
│   │   ├── public/
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── docs/               # Docusaurus documentation site
│       ├── docs/
│       ├── src/
│       ├── static/
│       ├── package.json
│       └── docusaurus.config.js
│
├── packages/
│   ├── core-types/         # Shared TypeScript interfaces, enums, domain models
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── database/           # Database client (SQLite), schema management, migrations
│   │   ├── src/
│   │   ├── migrations/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── auth-client/        # Shared authentication logic (Lucia/Arctic helpers)
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── sdk/                # Client SDK (to be published on npm)
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── cli/                # The `koyalite` CLI tool
│   │   ├── src/
│   │   ├── templates/      # Project templates for `koyalite init`
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── rls/                # Row-Level Security policy evaluation logic
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── config/             # Shared configuration loading/validation (Zod schemas)
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── logger/             # Shared Pino logger configuration/wrapper
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── storage-client/     # Client library for interacting with SeaweedFS
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── search-client/      # Client library for interacting with Weaviate
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── email-templates/    # React.email components
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── ui-components/      # (Optional) Shared React/Vue/etc components for dashboard/studio
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── eslint-config-koyalite/ # Shared ESLint configuration
│   │   └── index.js
│   └── tsconfig/           # Shared tsconfig.json presets (e.g., base, node, react)
│       ├── base.json
│       ├── node.json
│       └── react.json
│
├── services/
│   ├── api/                # Main API Service (Express/GraphQL, handles REST, GQL, Auth coordination)
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── edge-runtime/       # Service responsible for managing and executing Deno edge functions
│   │   ├── src/            # Might interact with Deno runtime directly or via orchestration
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── scheduler/          # Service for running scheduled jobs (cron)
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── webhook-dispatcher/ # Service handling webhook triggers and delivery
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── email-queue/        # Service managing email queueing, retries, and sending via Resend
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│
├── infra/                  # Infrastructure configuration (non-code artifacts)
│   ├── nginx/              # NGINX configuration files
│   │   └── koyalite.conf
│   ├── docker/             # Dockerfiles if more complex than docker-compose
│
├── .github/                # GitHub Actions workflows, issue templates
│   └── workflows/
│       └── ci.yml
├── .vscode/                # VSCode settings (optional)
│   └── settings.json
├── .env.example            # Example environment variables
├── .gitignore
├── docker-compose.yml      # Docker Compose for local dev (NGINX, Weaviate, SeaweedFS, services)
├── package.json            # Root package.json defining workspaces
├── tsconfig.base.json      # Base TypeScript config for the monorepo (defines path aliases)
├── .eslintrc.js            # Root ESLint config
├── .prettierrc.js          # Root Prettier config
├── README.md
├── CONTRIBUTING.md
└── KOYALITE_DESIGN_PLAN.md # Your design docs (or link to them)