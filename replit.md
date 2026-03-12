# ERP SaaS - Multi-Tenant Next.js App

## Overview
A multi-tenant ERP SaaS application built with Next.js 14, React, TypeScript, and Tailwind CSS. Migrated from Vercel to Replit.

## Architecture
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Multi-tenancy**: Tenant extraction via subdomain or `?tenant=` query param, propagated through middleware via `x-tenant` header and cookie

## Project Structure
- `app/` - Next.js App Router pages and layouts
  - `app/api/` - API routes
  - `app/components/` - Shared UI components
  - `app/dashboard/` - Dashboard pages
  - `app/login/` - Login pages
- `middleware.ts` - Tenant detection and propagation middleware

## Running the App
- **Dev server**: `npm run dev` (runs on port 5000, bound to 0.0.0.0 for Replit)
- **Build**: `npm run build`
- **Production**: `npm run start`

## Replit Configuration
- Port: **5000** (required for Replit webview)
- Host: **0.0.0.0** (required for Replit proxy)
- Workflow: "Start application" runs `npm run dev`

## Security Notes
- Next.js upgraded to 14.2.30 (patched security vulnerability in earlier versions)
- Remaining audit warnings are dev-only ESLint tooling (no runtime impact)
