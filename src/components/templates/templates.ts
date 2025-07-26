import CorporateTemplate from './corporate';
import ElegantTemplate from './elegant';
import MinimalTemplate from './minimal';
import ModernTemplate from './modern';
import ServiceTemplate from './service';
import VibrantTemplate from './vibrant';

export const invoiceTemplates = [
  {
    id: 'service',
    name: 'Professional',
    image: '/images/professional.webp',
    component: require('./service').default,
  },
  {
    id: 'elegant',
    name: 'Elegant',
    image: '/images/elegant.webp',
    component: ElegantTemplate,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    image: '/images/minimal.webp',
    component: MinimalTemplate,
  },
  {
    id: 'modern',
    name: 'Modern',
    image: '/images/modern.webp',
    component: ModernTemplate,
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    image: '/images/vibrant.png',
    component: VibrantTemplate,
  },
]; 