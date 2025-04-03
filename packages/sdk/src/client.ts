import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import WebSocket from 'ws';
import EventSource from 'eventsource';
import { z } from 'zod';

export interface KoyaLiteConfig {
  apiKey: string;
  baseUrl?: string;
  retries?: number;
  timeout?: number;
}

const configSchema = z.object({
  apiKey: z.string().min(1),
  baseUrl: z.string().url().optional().default('http://localhost:3000'),
  retries: z.number().min(0).max(5).optional().default(3),
  timeout: z.number().min(1000).max(60000).optional().default(10000),
});

export class KoyaLiteClient {
  private http: AxiosInstance;
  private config: z.infer<typeof configSchema>;
  private ws: WebSocket | null = null;
  private eventSource: EventSource | null = null;

  constructor(config: KoyaLiteConfig) {
    this.config = configSchema.parse(config);

    // Initialize HTTP client
    this.http = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Add retry logic
    axiosRetry(this.http, {
      retries: this.config.retries,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          (error.response?.status === 429); // Retry on rate limit
      },
    });
  }

  // HTTP Methods
  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const response = await this.http.get(path, { params });
    return response.data;
  }

  async post<T>(path: string, data?: any): Promise<T> {
    const response = await this.http.post(path, data);
    return response.data;
  }

  async put<T>(path: string, data?: any): Promise<T> {
    const response = await this.http.put(path, data);
    return response.data;
  }

  async delete<T>(path: string): Promise<T> {
    const response = await this.http.delete(path);
    return response.data;
  }

  // WebSocket Methods
  connectWebSocket(path: string, options: { onMessage?: (data: any) => void; onError?: (error: Error) => void } = {}) {
    if (this.ws) {
      this.ws.close();
    }

    const wsUrl = this.config.baseUrl.replace(/^http/, 'ws') + path;
    this.ws = new WebSocket(wsUrl, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    });

    this.ws.on('message', (data) => {
      try {
        const parsedData = JSON.parse(data.toString());
        options.onMessage?.(parsedData);
      } catch (error) {
        options.onError?.(new Error('Failed to parse WebSocket message'));
      }
    });

    this.ws.on('error', (error) => {
      options.onError?.(error);
    });

    return {
      send: (data: any) => this.ws?.send(JSON.stringify(data)),
      close: () => {
        this.ws?.close();
        this.ws = null;
      },
    };
  }

  // Server-Sent Events Methods
  subscribeToEvents(path: string, options: { onMessage?: (event: string, data: any) => void; onError?: (error: Error) => void } = {}) {
    if (this.eventSource) {
      this.eventSource.close();
    }

    this.eventSource = new EventSource(this.config.baseUrl + path, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    });

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        options.onMessage?.(event.type, data);
      } catch (error) {
        options.onError?.(new Error('Failed to parse SSE message'));
      }
    };

    this.eventSource.onerror = (error) => {
      options.onError?.(error);
    };

    return {
      close: () => {
        this.eventSource?.close();
        this.eventSource = null;
      },
    };
  }

  // Cleanup
  close() {
    this.ws?.close();
    this.ws = null;
    this.eventSource?.close();
    this.eventSource = null;
  }
} 