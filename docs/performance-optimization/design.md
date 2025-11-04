# Design Document

## Overview

This design outlines the technical approach for optimizing the D.E. Technics website to reduce load times, minimize Vercel Blob bandwidth usage from ~7GB to near zero, and improve Core Web Vitals scores. The solution focuses on image optimization, lazy loading strategies, font optimization, and migrating static assets from Vercel Blob to the public directory.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Application                      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Pages      │  │  Components  │  │   Assets     │     │
│  │              │  │              │  │              │     │
│  │ - Homepage   │  │ - HeroSlider │  │ - Images     │     │
│  │ - Products   │  │ - ProductCard│  │ - PDFs       │     │
│  │ - Product    │  │ - Gallery    │  │ - Fonts      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js Image Optimization Layer             │  │
│  │  - Automatic WebP conversion                         │  │
│  │  - Responsive image sizing                           │  │
│  │  - Lazy loading with intersection observer           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Static Asset Serving                    │  │
│  │  - /public/images/* (optimized)                      │  │
│  │  - /public/pdf/* (migrated from Vercel Blob)        │  │
│  │  - /public/fonts/* (self-hosted)                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Migration Strategy

1. **PDF Migration**: Download all PDFs from Vercel Blob → Save to `/public/pdf/` → Update references
2. **Image Optimization**: Compress existing images → Convert to WebP → Update components
3. **Font Optimization**: Download Font Awesome → Self-host → Update layout
4. **Component Updates**: Add lazy loading → Optimize Image usage → Implement priority loading

## Components and Interfaces

### 1. Hero Slider Component

**Current Issues:**
- Loads all 3 hero images immediately
- Uses CSS background-image (no optimization)
- No lazy loading for subsequent slides

**Optimized Design:**

```typescript
// components/hero-slider.tsx
interface HeroSliderProps {
  images?: { src: string; alt?: string }[];
  autoPlayMs?: number;
}

// Implementation Strategy:
// 1. First slide: Use Next Image with priority={true}
// 2. Subsequent slides: Use Next Image with loading="lazy"
// 3. Preload next slide on transition
// 4. Use WebP with JPEG fallback
```

**Key Changes:**
- Replace CSS `background-image` with Next.js `<Image>` component
- Add `priority` prop to first image only
- Implement lazy loading for slides 2 and 3
- Add responsive image sizes

### 2. Product Card Component

**Current Issues:**
- All product images load immediately
- No lazy loading for below-fold cards
- Missing responsive image sizes

**Optimized Design:**

```typescript
// components/product-card.tsx
interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  priority?: boolean; // New prop for above-fold cards
}

// Implementation Strategy:
// 1. Use loading="lazy" by default
// 2. Accept priority prop for above-fold cards (first 3 on homepage)
// 3. Add proper width/height to prevent CLS
// 4. Use responsive sizes based on grid layout
```

**Key Changes:**
- Add `priority` prop for first 3 cards on homepage
- Use `loading="lazy"` for all other cards
- Add `sizes` prop for responsive images
- Ensure width/height prevent layout shift

### 3. Product Gallery Component

**Current Issues:**
- All thumbnails load immediately
- Main image doesn't use priority
- No preloading of next image on hover

**Optimized Design:**

```typescript
// components/product-gallery.tsx
interface ProductGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    thumbnail?: string;
  }>;
  className?: string;
}

// Implementation Strategy:
// 1. Main image: priority={true}
// 2. Thumbnails: loading="lazy"
// 3. Preload next image on thumbnail hover
// 4. Use smaller thumbnail sizes
```

**Key Changes:**
- Add `priority` to main image
- Lazy load thumbnails
- Implement hover preloading
- Optimize thumbnail sizes (64x64)

### 4. Layout Component (Font Optimization)

**Current Issues:**
- Font Awesome loaded from CDN (blocking)
- Google Fonts loaded with render-blocking link
- No font preloading strategy

**Optimized Design:**

```typescript
// app/layout.tsx

// Implementation Strategy:
// 1. Remove Font Awesome CDN link
// 2. Install @fortawesome/fontawesome-free
// 3. Import only used icons
// 4. Use Next.js font optimization for Google Fonts
// 5. Add font-display: swap
```

**Key Changes:**
- Self-host Font Awesome subset
- Use Next.js font optimization
- Remove render-blocking font links
- Add proper font preloading

## Data Models

### Product Data Model Updates

```typescript
// lib/product-data.ts

export interface ProductData {
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  images: string[]; // Already local paths
  brochure?: string; // UPDATE: Change from Vercel Blob URL to local path
  availability?: string;
  tags?: string[];
  rating?: number;
  reviews?: number;
  faqs?: { question: string; answer: string }[];
  price?: string;
  applications: string[];
  relatedProducts: string[];
}

// Migration:
// FROM: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de210.pdf"
// TO:   "/pdf/de210.pdf"
```

### Image Optimization Configuration

```typescript
// next.config.mjs

images: {
  formats: ['image/avif', 'image/webp'], // Prefer AVIF, fallback to WebP
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
  dangerouslyAllowSVG: true,
}
```

## Implementation Plan

### Phase 1: PDF Migration (Immediate Bandwidth Savings)

1. Create `/public/pdf/` directory
2. Download all PDFs from Vercel Blob URLs
3. Update `product-data.ts` with local paths
4. Test all brochure download links
5. **Expected Result**: ~7GB bandwidth reduction

### Phase 2: Image Optimization

1. Install image optimization tools (sharp is built into Next.js)
2. Compress all images in `/public/images/`
3. Convert large images to WebP format
4. Keep original JPEGs as fallback
5. **Expected Result**: 50%+ image size reduction

### Phase 3: Hero Slider Optimization

1. Convert hero slider from CSS backgrounds to Next Image
2. Add priority to first slide
3. Lazy load slides 2 and 3
4. Implement responsive image sizes
5. **Expected Result**: Faster LCP, reduced initial load

### Phase 4: Product Card Optimization

1. Add priority prop to ProductCard component
2. Update homepage to mark first 3 cards as priority
3. Add lazy loading to all other cards
4. Implement responsive image sizes
5. **Expected Result**: Faster page interactivity

### Phase 5: Font Optimization

1. Install `@fortawesome/fontawesome-free`
2. Create font subset with only used icons
3. Self-host Font Awesome CSS
4. Update layout to remove CDN links
5. Optimize Google Fonts loading
6. **Expected Result**: Eliminate render-blocking fonts

### Phase 6: Product Gallery Optimization

1. Add priority to main gallery image
2. Lazy load thumbnails
3. Implement hover preloading
4. Optimize thumbnail sizes
5. **Expected Result**: Faster product page loads

### Phase 7: Bundle Size Optimization

1. Analyze bundle with `@next/bundle-analyzer`
2. Implement dynamic imports for heavy components
3. Remove unused dependencies
4. Tree-shake unused code
5. **Expected Result**: 20%+ bundle size reduction

## Error Handling

### PDF Migration Errors

- **Network Failure**: Retry download up to 3 times with exponential backoff
- **File Write Error**: Log error, continue with next file, report at end
- **Invalid URL**: Skip file, log warning, continue

### Image Optimization Errors

- **Compression Failure**: Keep original image, log warning
- **WebP Conversion Failure**: U(High Impact)

1. **Hero Slider Optimization**
   - Convert to Next.js Image component
   - Implement priority loading for first slide
   - Add lazy loading for subsequent slides

2. **Product Card Optimization**
   - Ensure all use loading="lazy"
   - Add proper sizes attribute
   - Reduce quality to 80%

3. **Product Gallery Optimization**
   - Add lazy loading to thumbnails
   - Keep priority on main image

### Phase 2: Font Optimization (Medium Impact)

1. **Font Awesome Migration**
   - Option A: Self-host Font Awesome subset
   - Option B: Migrate to react-icons
   - Remove CDN references from layout.tsx

2. **Google Fonts Optimization**
   - Already using next/font/google (good)
   - Ensure preload is enabled
   - Verify font-display: swap

### Phase 3: Bundle Size Optimization (Medium Impact)

1. **Dynamic Imports**
   - Lazy load heavy components (charts, modals)
   - Use React.lazy() for non-critical components
   - Implement Suspense boundaries

2. **Dependency Audit**
   - Remove unused dependencies
   - Check for duplicate packages
   - Optimize package imports

### Phase 4: Image Compression (Low Effort, High Impact)

1. **Automated Compression**
   - Next.js already optimizes images
   - Ensure quality settings are optimal
   - Verify WebP generation is working

2. **Manual Optimization** (Optional)
   - Pre-compress source images
   - Convert large PNGs to JPEGs where appropriate
   - Use tools like ImageOptim or Squoosh

## Performance Metrics

### Current Baseline (Estimated)

- **LCP**: ~4-5s (hero slider loading 3 images)
- **FID**: ~100-200ms
- **CLS**: ~0.15 (font loading shifts)
- **Total Image Size**: ~18MB unoptimized
- **JavaScript Bundle**: ~500KB (estimated)

### Target Metrics

- **LCP**: < 2.5s (75% improvement)
- **FID**: < 100ms (maintained)
- **CLS**: < 0.1 (33% improvement)
- **Total Image Size**: < 5MB (72% reduction via WebP + lazy loading)
- **JavaScript Bundle**: < 400KB (20% reduction)

### Expected Improvements

1. **Hero Slider**: 60% faster initial load (load 1 image vs 3)
2. **Product Pages**: 50% faster (lazy loading below-fold images)
3. **Font Loading**: 30% faster (self-hosted vs CDN)
4. **Bundle Size**: 20% smaller (tree-shaking + dynamic imports)
5. **Bandwidth**: 90% reduction in Vercel Blob usage (user will migrate PDFs)

## Technical Considerations

### Next.js Image Optimization

Next.js automatically:
- Generates WebP and AVIF formats
- Creates responsive image sizes
- Lazy loads images by default
- Prevents layout shift with proper sizing

**Configuration in next.config.mjs:**
```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

### Browser Compatibility

- **WebP**: Supported in all modern browsers (95%+ coverage)
- **AVIF**: Supported in Chrome, Firefox, Safari 16+ (80%+ coverage)
- **Lazy Loading**: Native browser support (90%+ coverage)
- **Next.js**: Provides automatic fallbacks for older browsers

### Caching Strategy

1. **Static Images**: Cache for 1 year (immutable)
2. **Optimized Images**: Cache for 60 days (Next.js default)
3. **Fonts**: Cache for 1 year (immutable)
4. **JavaScript**: Cache with versioned filenames

## Security Considerations

1. **Image Sources**
   - All images served from same origin
   - No external image sources (except Vercel Blob for PDFs - user managed)
   - CSP headers already configured

2. **Font Sources**
   - Self-hosted fonts eliminate third-party requests
   - Reduces privacy concerns
   - Improves security posture

## Monitoring and Maintenance

### Performance Monitoring

1. **Vercel Analytics**
   - Already integrated (@vercel/analytics)
   - Monitor Core Web Vitals
   - Track performance over time

2. **Lighthouse CI** (Optional)
   - Automate performance testing
   - Set performance budgets
   - Fail builds if metrics regress

### Ongoing Maintenance

1. **Image Optimization**
   - Compress new images before upload
   - Use WebP format for new images
   - Maintain aspect ratios

2. **Dependency Updates**
   - Keep Next.js updated (currently 15.2.4)
   - Update React (currently 19)
   - Monitor for security updates

3. **Performance Audits**
   - Run Lighthouse monthly
   - Monitor Core Web Vitals
   - Address regressions promptly

## Migration Notes

### Breaking Changes

None - all changes are backward compatible.

### Rollback Plan

1. Git version control allows easy rollback
2. Changes are incremental and isolated
3. Each component can be reverted independently

### Deployment Strategy

1. **Development Testing**
   - Test all changes locally
   - Verify image loading
   - Check performance metrics

2. **Staging Deployment**
   - Deploy to Vercel preview
   - Run Lighthouse audits
   - Test on multiple devices

3. **Production Deployment**
   - Deploy during low-traffic period
   - Monitor error rates
   - Watch Core Web Vitals

## Summary

This design provides a comprehensive approach to optimizing the D.E. Technics website performance. The implementation focuses on:

1. **Image Optimization**: Using Next.js Image component with proper lazy loading and priority settings
2. **Font Optimization**: Self-hosting Font Awesome and optimizing Google Fonts loading
3. **Bundle Optimization**: Dynamic imports and tree-shaking to reduce JavaScript size
4. **Progressive Enhancement**: Loading critical resources first, deferring non-critical resources

All optimizations can be implemented within the existing codebase without external dependencies or infrastructure changes. The expected result is a 50-75% improvement in page load times and a 90% reduction in bandwidth usage (after user migrates PDFs from Vercel Blob).
se JPEG only, log warning
- **Missing Image**: Use placeholder, log error

### Font Loading Errors

- **Font Download Failure**: Fallback to system fonts
- **CSS Parse Error**: Use inline critical CSS
- **Icon Missing**: Show text fallback

## Testing Strategy

### Performance Testing

1. **Lighthouse Audits**: Run before and after each phase
   - Target: Performance score > 90
   - Target: LCP < 2.5s
   - Target: FID < 100ms
   - Target: CLS < 0.1

2. **Real User Monitoring**: Monitor Core Web Vitals
   - Use Vercel Analytics
   - Track bandwidth usage
   - Monitor error rates

3. **Load Testing**: Test with slow 3G connection
   - Verify lazy loading works
   - Check image loading order
   - Validate font loading

### Functional Testing

1. **PDF Downloads**: Verify all brochure links work
2. **Image Display**: Check all images render correctly
3. **Hero Slider**: Test slide transitions
4. **Product Gallery**: Test thumbnail clicks
5. **Font Icons**: Verify all icons display

### Visual Regression Testing

1. Take screenshots before changes
2. Compare after each phase
3. Verify no layout shifts
4. Check responsive breakpoints

## Rollback Strategy

1. **Git Branching**: Create feature branch for all changes
2. **Incremental Commits**: Commit after each phase
3. **Backup**: Keep Vercel Blob PDFs until migration verified
4. **Rollback Plan**: Revert commits if issues arise

## Success Metrics

### Primary Metrics

- **Bandwidth Reduction**: 90%+ reduction in Vercel Blob usage
- **Page Load Time**: 40%+ improvement in LCP
- **Bundle Size**: 20%+ reduction in JavaScript size
- **Image Payload**: 50%+ reduction in image bytes

### Secondary Metrics

- **Lighthouse Performance Score**: > 90
- **Core Web Vitals**: All metrics in "Good" range
- **User Experience**: No visual regressions
- **Functionality**: 100% feature parity

## Dependencies

### Required Packages

- `sharp`: Built into Next.js (image optimization)
- `@fortawesome/fontawesome-free`: Font Awesome self-hosting
- `@next/bundle-analyzer`: Bundle size analysis (dev only)

### No New External Dependencies

All optimizations use built-in Next.js features or existing packages.

## Timeline

- **Phase 1 (PDF Migration)**: 30 minutes
- **Phase 2 (Image Optimization)**: 1 hour
- **Phase 3 (Hero Slider)**: 30 minutes
- **Phase 4 (Product Cards)**: 30 minutes
- **Phase 5 (Fonts)**: 45 minutes
- **Phase 6 (Product Gallery)**: 30 minutes
- **Phase 7 (Bundle Optimization)**: 1 hour

**Total Estimated Time**: 4-5 hours

## Monitoring and Maintenance

### Post-Deployment Monitoring

1. Monitor Vercel bandwidth usage (should drop to near zero)
2. Track Core Web Vitals in production
3. Monitor error rates for image loading
4. Check PDF download success rates

### Ongoing Maintenance

1. Optimize new images before adding to site
2. Keep Next.js updated for latest optimizations
3. Periodically audit bundle size
4. Review and update image formats as browser support improves
