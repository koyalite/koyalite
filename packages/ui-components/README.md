# @koyalite/ui-components

A collection of reusable UI components for KoyaLite applications.

## Installation

```bash
npm install @koyalite/ui-components
# or
yarn add @koyalite/ui-components
# or
pnpm add @koyalite/ui-components
```

## Components

### Button

A versatile button component with various styles and states.

```tsx
import { Button } from '@koyalite/ui-components';

// Default button
<Button>Click me</Button>

// Button with variant
<Button variant="destructive">Delete</Button>

// Loading state
<Button loading>Processing...</Button>
```

### Dialog

A modal dialog component for displaying content in an overlay.

```tsx
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@koyalite/ui-components";

<Dialog>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>This is a description of the dialog content.</DialogDescription>
        </DialogHeader>
        <div>Main content goes here</div>
        <DialogFooter>
            <Button>Save changes</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>;
```

### DataTable

A flexible data table component with sorting and row selection.

```tsx
import { DataTable } from "@koyalite/ui-components";

const columns = [
    {
        key: "name",
        header: "Name",
        sortable: true,
    },
    {
        key: "email",
        header: "Email",
    },
];

const data = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
];

<DataTable
    columns={columns}
    data={data}
    onSort={(column) => console.log("Sort by", column)}
    onRowClick={(row) => console.log("Selected row", row)}
/>;
```

## Development

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

3. Build the package:

```bash
pnpm build
```

4. Run linter:

```bash
pnpm lint
```

## License

MIT
