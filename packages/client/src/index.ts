export interface KoyaLiteClientOptions {
    baseURL: string;
    token?: string;
}

export class KoyaLite {
    private baseURL: string;
    private token?: string;

    constructor(options: KoyaLiteClientOptions) {
        this.baseURL = options.baseURL;
        this.token = options.token;
    }

    async get<T = unknown>(path: string): Promise<T> {
        const res = await fetch(`${this.baseURL}${path}`, {
            headers: this.token
                ? { Authorization: `Bearer ${this.token}` }
                : undefined,
        });
        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`);
        }
        return res.json();
    }

    async getCurrentUser() {
        return this.get("/auth/me");
    }

    async getPosts() {
        return this.get("/posts");
    }
}
