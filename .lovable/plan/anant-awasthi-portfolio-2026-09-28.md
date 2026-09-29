# Anant Awasthi Portfolio

## Goal
Build a fast, single-page portfolio and freelance services site for Anant Awasthi, presenting him as an AI Product Orchestrator & GTM Strategist and converting visitors toward consultation inquiries.

## Visual direction
- Dark enterprise-dashboard aesthetic with deep charcoal surfaces, restrained translucent glass, crisp borders, and selective blue/violet glow accents.
- Split opening section: positioning and calls to action on the left, uploaded portrait in an asymmetrical circular glass composition on the right.
- Strong typographic hierarchy, compact SaaS-style metrics, premium card interactions, and lightweight motion only; no 3D or heavy effects.
- Mobile layouts will stack cleanly while retaining readable metrics, touch-friendly navigation, and non-overlapping controls.

## Page structure
1. **Navigation and opening section**
   - Name/monogram, anchor navigation, and a consultation action.
   - Headline, positioning statement, location/availability, “Book a Consultation,” and “View My Work.”
   - Dashboard-style metrics for audience, shipped workflows, and 0-to-1 execution.
   - Use the uploaded portrait as the primary profile image.
2. **The Approach**
   - Focused statement about positioning, distribution, execution, and AI-assisted GTM systems.
3. **The Execution**
   - Premium vertical timeline using the supplied portfolio copy and résumé context for Fenlo, UseMyBio, and technical content/community work.
4. **Featured Projects**
   - Six-card, 3-by-2 desktop grid with stack tags, concise outcomes, highlighted metrics, and project actions.
   - Keep all supplied project URLs as `#` placeholders.
   - Hide Live Demo for Zero-to-One GTM Outreach Architect and Kisan Setu; show both actions for the other four projects.
5. **Freelance Services**
   - Three service cards for automated B2B outreach, GTM strategy and positioning, and content-led growth.
6. **The Arsenal**
   - Compact bento layout for AI/orchestration, logic/cloud, and growth capabilities.
7. **Credentials and leadership**
   - Honors, certifications, education, and campus leadership from the supplied content, cross-checked against the résumé.
8. **Contact and footer**
   - “Let’s build something functional.” conversion block with click-to-copy email and phone controls.
   - LinkedIn first and most prominent, followed by GitHub, then Email and Phone.
   - X appears last with reduced visual weight.
   - Use the supplied LinkedIn, GitHub, and X URLs plus résumé contact details.
9. **Ask Anant AI preview**
   - Add a floating glass button at the bottom right with a distinct Anant AI identity.
   - Open a compact chat preview containing a welcome message, example prompts, a text composer, send control, and close/minimize behavior.
   - Keep this front-end-only for now: submitted prompts receive a clear “assistant integration coming soon” state, with no model call, history, or data persistence.

## Interaction and polish
- Smooth anchor navigation, active/clear section affordances, subtle card lift/glow, copy confirmation, and accessible focus states.
- Ensure the assistant preview is keyboard accessible, mobile-safe, and never obscures primary content or footer actions.
- Primary contact and consultation actions will open the appropriate LinkedIn, mail, or phone destination.
- Respect reduced-motion settings and keep effects lightweight for instant loading.
- Add complete portfolio-specific page title, description, Open Graph, and Twitter metadata.

## Technical details
- Implement within the existing TanStack Start single-page route and Tailwind v4 token system.
- Store the uploaded portrait through the project’s asset delivery flow and import its pointer into the page.
- Use semantic design tokens for all colors, borders, shadows, and states; use Lucide icons for interface and social actions.
- Keep project content in structured data so the placeholder links can be replaced easily later.
- Verify the page at desktop and mobile sizes, check interactions and console output, and confirm the current preview reports no build errors.
