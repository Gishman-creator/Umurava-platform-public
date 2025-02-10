import promClient from 'prom-client';
import promMiddleware from 'express-prometheus-middleware';

// Initialize metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'umurava_' });

// Custom metrics
export const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 2, 5]
});

export const activeUsers = new promClient.Gauge({
    name: 'active_users',
    help: 'Number of active users'
});

export const totalChallenges = new promClient.Gauge({
    name: 'total_challenges',
    help: 'Total number of challenges'
});

export const monitoringMiddleware = promMiddleware({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 2, 5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}); 