import React from 'react';
import {createRoot} from 'react-dom/client';
// Reuse the original component; server-only Promotion Studio API endpoints
// require a separate Worker port before public cutover.
import PromotionStudio from '../../app/admin/promotions/page.js';

const node=document.getElementById('admin-root');
if(node)createRoot(node).render(<PromotionStudio/>);
