'use client';
import { Suspense } from 'react';
import News from '../../views/News';
export const dynamic = 'force-dynamic';
export default function NewsPage() { return <Suspense fallback={null}><News /></Suspense>; }
