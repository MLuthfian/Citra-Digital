import { NextRequest, NextResponse } from 'next/server';

const FLASK_URL = process.env.FLASK_API_URL ?? 'http://127.0.0.1:5000';

export async function POST(req: NextRequest) {
  try {
    // Forward the multipart form-data directly to Flask
    const formData = await req.formData();

    const flaskRes = await fetch(`${FLASK_URL}/classify`, {
      method: 'POST',
      body: formData as unknown as BodyInit,
    });

    const data = await flaskRes.json();

    if (!flaskRes.ok) {
      return NextResponse.json(
        { error: data.error ?? 'Flask API error' },
        { status: flaskRes.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    // If Flask is unreachable, give a clear error
    if (message.includes('ECONNREFUSED') || message.includes('fetch failed')) {
      return NextResponse.json(
        {
          error:
            'Python API tidak dapat dijangkau. Pastikan Flask server sudah berjalan: cd python_api && python app.py',
        },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Also expose a health check GET
export async function GET() {
  try {
    const res = await fetch(`${FLASK_URL}/health`, { method: 'GET' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ status: 'offline', error: 'Flask API not running' }, { status: 503 });
  }
}
