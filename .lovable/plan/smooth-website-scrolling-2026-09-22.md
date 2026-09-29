# Smooth website scrolling

## Changes
- Add gentle inertial scrolling for mouse wheels and trackpads while keeping touch scrolling natural.
- Animate major sections and content groups into view with subtle fade-and-rise transitions.
- Keep navigation links smoothly scrolling to the correct section below the fixed header.
- Respect reduced-motion preferences by disabling movement effects when requested.

## Technical details
- Use a lightweight request-animation-frame scroll controller without changing page content or layout.
- Add reusable reveal classes and Intersection Observer activation.
- Apply scroll margins to anchored sections and verify desktop and mobile behavior.
