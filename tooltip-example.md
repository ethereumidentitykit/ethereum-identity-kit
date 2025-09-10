# ProfileTooltip Usage Examples

## Basic Usage

```jsx
import { ProfileTooltip } from '@ethereum-identity-kit/core'

// Simple tooltip that appears above (preferred) by default
;<ProfileTooltip addressOrName="vitalik.eth" connectedAddress="0x...">
  <span>Hover me</span>
</ProfileTooltip>
```

## Advanced Configuration

```jsx
// Tooltip with custom placement and features
<ProfileTooltip
  addressOrName="vitalik.eth"
  connectedAddress="0x..."
  placement="bottom" // Force bottom placement
  showArrow={true} // Show arrow pointer
  showDelay={300} // Wait 300ms before showing
  hideDelay={200} // Wait 200ms before hiding
  keepTooltipOnHover={true} // Keep tooltip open when hovering over it
  showFollowButton={true} // Show follow button in tooltip
  flipBehavior="flip" // Flip to opposite side if no space
  boundary="viewport" // Keep tooltip within viewport
>
  <button>Advanced Tooltip</button>
</ProfileTooltip>
```

## Auto Placement

```jsx
// Intelligent placement - prefers top, falls back to bottom
<ProfileTooltip
  addressOrName="vitalik.eth"
  placement="auto" // Default: prefers top if space available
  offset={12} // 12px distance from trigger
>
  <div className="profile-link">Smart Tooltip</div>
</ProfileTooltip>
```

## Key Features

1. **Top-First Positioning**: Always prefers top placement when possible
2. **Left-Aligned**: Tooltip always aligns to the left edge of the trigger (left: 0)
3. **No Portal Required**: Uses relative/absolute positioning within component tree
4. **Collision Detection**: Automatically flips to bottom when top doesn't fit
5. **Performance Optimized**: RequestAnimationFrame and position caching
6. **Customizable Delays**: Configure show/hide delays for better UX
7. **Arrow Support**: Optional arrow pointer positioned relative to trigger width
8. **Hover Persistence**: Keep tooltip visible when hovering over it

## Placement Options

- `auto` (default) - Prefers top, falls back to bottom based on available space
- `top` - Always position above the trigger
- `bottom` - Always position below the trigger

## Positioning Logic

1. **Preferred**: Top placement if sufficient space is available
2. **Fallback**: Bottom placement if top doesn't fit
3. **Alignment**: Always aligned to the left edge of the trigger element
4. **Smart Spacing**: Chooses the side with more space when neither fits perfectly

This simplified approach ensures consistent, predictable tooltip behavior while maintaining optimal user experience.
