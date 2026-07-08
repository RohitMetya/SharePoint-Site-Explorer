# SharePoint Site Explorer

Enterprise-grade SharePoint Site Explorer built using SPFx, React, TypeScript and Microsoft Graph.

---

# High Level Architecture

```
                    User
                      │
                      ▼
          Presentation Components
                      │
                      ▼
                  Custom Hooks
                      │
                      ▼
                   Services
                      │
                      ▼
              Microsoft Graph API
```

Data always flows in one direction.

```
User
    ↓
Component
    ↓
Hook
    ↓
Service
    ↓
Microsoft Graph
    ↓
Service
    ↓
Hook
    ↓
Component
```

---

# Project Structure

```
src
│
├── components
├── hooks
├── context
├── services
├── models
├── utilities
├── constants
└── styles
```

---

# Folder Responsibilities

## Components

Responsible only for rendering UI.

Examples

- Dashboard
- SiteSearch
- SiteInformationCard
- UserProfileCard

Rules

- No Graph API calls
- No business logic
- No data transformation

---

## Hooks

Responsible for application logic.

Examples

- useSiteInfo
- useCurrentUser
- useSiteResolver

Responsibilities

- Manage loading state
- Manage error state
- Manage React state
- Call services
- Return data to components

Rules

- No JSX
- No Graph API
- No UI rendering

---

## Services

Responsible for talking to Microsoft Graph.

Examples

- SiteService
- UserService
- SiteResolverService

Responsibilities

- Graph API
- REST calls
- DTO mapping

Rules

- No React
- No useState
- No JSX

---

## Context

Responsible for global application state.

Current Context

SiteContext

Responsibilities

- Selected Site

Rules

- Never call Graph
- Never contain UI

---

## Models

Represents application data.

Examples

- ICurrentSite
- IUserProfile
- ISelectedSite

Rules

- Interfaces only

---

## Utilities

Reusable helper methods.

Examples

- Date formatting
- Storage formatting
- Percentage calculations

---

## Constants

Application constants.

Examples

- INITIAL_SITE
- INITIAL_USER

---

# Feature Development Pattern

Every feature follows the same pipeline.

```
Requirement

↓

Presentation Component

↓

Hook

↓

Service

↓

Microsoft Graph

↓

Hook

↓

Presentation Component
```

---

# Application State Flow

```
SharePoint URL

↓

Site Resolver

↓

Site Context

↓

Dashboard

↓

Site Features

├── Site Information

├── Users

├── Lists

├── Libraries

├── Permissions

├── Storage

└── Files
```

---

# Rules

✅ Components never call Graph.

✅ Hooks never return JSX.

✅ Services never use React.

✅ Context stores shared application state.

✅ Models only define data.

✅ Utilities contain pure functions.

---

# Current Architecture

```
                    User
                      │
                      ▼
              SiteSearch Component
                      │
                      ▼
              useSiteResolver Hook
                      │
                      ▼
          SiteResolverService
                      │
                      ▼
             Microsoft Graph
                      │
                      ▼
               Selected Site
                      │
                      ▼
                Site Context
                      │
                      ▼
                 Dashboard
                /         \
               ▼           ▼
      SiteContainer   UserContainer
             │               │
             ▼               ▼
      useSiteInfo     useCurrentUser
             │               │
             ▼               ▼
        SiteService      UserService
             │               │
             └───────► Microsoft Graph
```

---

# Guiding Principle

> Components display data.

> Hooks manage data.

> Services fetch data.

> Context shares data.

# Decision Log

## Why Custom Hooks?

To separate business logic from UI.

---

## Why Services?

To isolate Microsoft Graph implementation.

---

## Why Context?

To share the selected SharePoint site across the application without prop drilling.

---

## Why Models?

To keep strong typing across the project.

---

## Why Containers?

To connect hooks with presentation components.