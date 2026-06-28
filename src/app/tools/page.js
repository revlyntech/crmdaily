'use client';
import { Suspense } from 'react';
import Tools from '../../pages/Tools';
export const dynamic = 'force-dynamic';
export default function ToolsPage() { return <Suspense fallback={null}><Tools /></Suspense>; }
