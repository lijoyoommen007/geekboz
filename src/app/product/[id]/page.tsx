import ProductDetailClient from '@/components/ProductDetailClient';

export function generateStaticParams() {
  return [
    { id: 'gbz-x1-air' },
    { id: 'predator' },
    { id: 'creator' },
    { id: 'quantum' },
    { id: 'sentinel' },
    { id: 'phantom' },
    { id: 'nova' },
  ];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient productId={params.id} />;
}
