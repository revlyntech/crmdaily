'use client';
import { Suspense } from 'react';
import Guides from '../../pages/Guides';
export const dynamic = 'force-dynamic';
export default function GuidesPage() { return <Suspense fallback={null}><Guides /></Suspense>; }
