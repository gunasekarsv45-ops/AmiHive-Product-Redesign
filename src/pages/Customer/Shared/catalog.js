import { PRODUCTS, DEALS } from '../Home1/Home1';

/* Extra products so the categories page has a richer listing.
   The product page also reads these (see edit in ProductRedesign1.jsx). */
export const EXTRA_PRODUCTS = [
  { id: 'x1', type: 'watch', name: 'Aster No.05', subtitle: 'Automatic gold dial', price: 20490, originalPrice: 23990, rating: 4.6, ratings: 132, image: 'goldWrist', isNew: true },
  { id: 'x2', type: 'watch', name: 'Meridian No.03', subtitle: 'Steel automatic', price: 27990, originalPrice: 32990, rating: 4.7, ratings: 96, image: 'steelLine', isNew: true },
  { id: 'x3', type: 'watch', name: 'Heritage No.02', subtitle: 'Dress watch, leather strap', price: 18490, originalPrice: 21490, rating: 4.3, ratings: 58, image: 'darkFace' },
  { id: 'x4', type: 'watch', name: 'Urban No.05', subtitle: 'Night field watch', price: 15990, originalPrice: 18990, rating: 4.5, ratings: 121, image: 'night', isNew: true },
  { id: 'x5', type: 'strap', name: 'Milanese Mesh Strap', subtitle: 'Stainless steel mesh', price: 2790, originalPrice: 3290, rating: 4.4, ratings: 72, image: 'jubilee', isNew: true },
  { id: 'x6', type: 'strap', name: 'Field Nato Strap', subtitle: 'Woven nylon, 20 mm', price: 1490, originalPrice: 1990, rating: 4.3, ratings: 210, image: 'strap' },
  { id: 'x7', type: 'accessory', name: 'Watch Winder', subtitle: 'Single watch, silent motor', price: 6990, originalPrice: 7990, rating: 4.6, ratings: 44, image: 'closeup' },
  { id: 'x8', type: 'accessory', name: 'Gift Set Classic', subtitle: 'Watch roll + spare strap', price: 5490, originalPrice: 6490, rating: 4.8, ratings: 88, image: 'studio' },
];

const COLLECTIONS = ['Aster', 'Meridian', 'Heritage', 'Urban'];
const DIAL_ORDER = ['blue', 'slate', 'forest'];

const dealToProduct = (d) => ({
  ...d,
  type: 'watch',
  ratings: Math.round(60 + d.rating * 40),
});

const decorate = (list) =>
  list.map((p, i) => {
    const first = p.name.split(' ')[0];

    return {
      collection: COLLECTIONS.includes(first) ? first : 'Essentials',
      dial: p.type === 'watch' ? DIAL_ORDER[i % 3] : null,
      isNew: false,
      ...p,
    };
  });

/* Full lookup table (used by the product page so every id resolves) */
export const ALL_PRODUCTS = decorate([
  ...PRODUCTS.map((p) => ({ ...p })),
  ...DEALS.filter((d) => !PRODUCTS.some((p) => p.id === d.id)).map(dealToProduct),
  ...EXTRA_PRODUCTS,
]);

/* De-duplicated by name (used by the categories listing) */
export const LISTING_PRODUCTS = ALL_PRODUCTS.filter(
  (p, i, arr) => arr.findIndex((q) => q.name === p.name) === i
);