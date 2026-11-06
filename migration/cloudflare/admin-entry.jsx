import React from 'react';
import {createRoot} from 'react-dom/client';
// Directly reuse the production client component and Supabase admin RLS.
import AdminOperations from '../../app/admin/page.js';

const node=document.getElementById('admin-root');
if(node)createRoot(node).render(<AdminOperations/>);
