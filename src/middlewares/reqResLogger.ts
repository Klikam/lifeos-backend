import type { Request, Response, NextFunction } from 'express';

export function requestLogger(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const start = Date.now();

    const originalJson = res.json.bind(res);
    let responseBody: unknown;

    res.json = (body: unknown) => {
        responseBody = body;
        return originalJson(body);
    };

    res.on('finish', () => {
        console.log({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${Date.now() - start}ms`,
            requestBody: req.body,
            responseBody,
        });
    });

    next();
}
