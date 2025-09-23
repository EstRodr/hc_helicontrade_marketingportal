# Strapi CMS Setup for Personalization

## Content Types to Create in Strapi

### 1. Personalization Config
**API ID:** `personalization-config`

**Fields:**
- `variant` (Number) - Which personalization option to use (0-4)
- `enabled` (Boolean) - Enable/disable personalization
- `smooth_transitions` (Boolean) - Enable smooth transitions
- `delay_seconds` (Number) - Delay before showing personalized content
- `market_hours_override` (Boolean) - Override during market hours
- `created_at` (DateTime) - Auto-generated
- `updated_at` (DateTime) - Auto-generated

### 2. Content Variants
**API ID:** `content-variant`

**Fields:**
- `variant_id` (Number) - Variant identifier (0-4)
- `name` (Text) - Variant name (e.g., "Global Insight")
- `headline_template` (Text) - Headline with placeholders: "Global insight, built for {country} markets"
- `subheadline_template` (Text) - Subheadline with placeholders: "From {city} to Wall Street..."
- `target_countries` (JSON) - Array of target countries
- `market_sessions` (Enumeration) - pre-market, market-open, after-hours, closed
- `enabled` (Boolean) - Enable/disable this variant
- `priority` (Number) - Priority order
- `created_at` (DateTime) - Auto-generated
- `updated_at` (DateTime) - Auto-generated

### 3. Market Config
**API ID:** `market-config`

**Fields:**
- `country` (Text) - Country name
- `country_code` (Text) - ISO country code
- `primary_index` (Text) - Primary market index (e.g., "OMXS30")
- `market_open_time` (Time) - Market opening time
- `market_close_time` (Time) - Market closing time
- `timezone` (Text) - Market timezone
- `default_variant` (Number) - Default variant for this market
- `enabled` (Boolean) - Enable for this market
- `created_at` (DateTime) - Auto-generated
- `updated_at` (DateTime) - Auto-generated

## API Endpoints

Once created, these endpoints will be available:

- `GET /api/personalization-configs` - Get current personalization settings
- `GET /api/content-variants` - Get all content variants
- `GET /api/market-configs` - Get market configurations
- `PUT /api/personalization-configs/1` - Update personalization settings

## Sample Data

### Personalization Config
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "variant": 0,
      "enabled": true,
      "smooth_transitions": true,
      "delay_seconds": 2,
      "market_hours_override": false
    }
  }
}
```

### Content Variants
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "variant_id": 0,
        "name": "Global Insight",
        "headline_template": "Global insight, built for {country} markets",
        "subheadline_template": "From {city} to Wall Street, turn real‑time moves in {index} into smarter decisions.",
        "target_countries": ["Sweden", "Germany", "France"],
        "market_sessions": "market-open",
        "enabled": true,
        "priority": 1
      }
    },
    {
      "id": 2,
      "attributes": {
        "variant_id": 1,
        "name": "AI Eyes",
        "headline_template": "AI eyes on {country} markets — opportunity never sleeps",
        "subheadline_template": "From {city} to Wall Street, track every market pulse, 24/7.",
        "target_countries": ["United States", "Canada"],
        "market_sessions": "pre-market",
        "enabled": true,
        "priority": 2
      }
    }
  ]
}
```

## Integration with Marketing Site

The marketing site will:
1. Fetch configuration on page load
2. Cache results for 30 minutes
3. Fall back to intelligent defaults if Strapi is unavailable
4. Update in real-time when you change settings in Strapi

## Admin Interface

You can manage personalization through:
1. **Strapi Admin Panel** - Content management
2. **PostHog Dashboard** - A/B testing and analytics
3. **Your Main Admin App** - High-level control (when integrated)
