# HomeHelp Connect

# Product Requirements Document (PRD)

**Version:** 2.0  
**Status:** Draft  
**Project:** HomeHelp Connect  
**Architecture:** Community-first House Help Marketplace

---

# 1. Product Vision

HomeHelp Connect is a community-first platform that connects residents with trusted house helps within their apartment community.

The MVP focuses on enabling:

- House Helps to register their profile.
- Residents to search suitable House Helps.
- Residents to contact House Helps directly.
- Admins to monitor registrations.

The MVP intentionally excludes complex workflows such as online payments, chat, ratings and booking automation.

---

# 2. User Roles

## 2.1 House Help

Can:

- Register
- Edit Profile
- Update Availability
- Update Charges
- Update Services
- Update Time Slots

Cannot:

- Receive online payments
- Accept bookings through the application

---

## 2.2 Resident

Can:

- Register
- Search House Helps
- Apply filters
- View House Help Profile
- Call House Help
- Contact via WhatsApp

Cannot:

- Leave ratings (MVP)
- Book through the application

---

## 2.3 Admin

Can:

- Login
- View House Helpers
- View Residents
- Monitor platform

---

# 3. MVP Scope

## Included

- Landing Page
- House Help Registration
- Resident Registration
- Three-Step Registration Wizard
- English + Tamil UI
- Save Profile
- Supabase Integration
- Resident Search
- Call House Help
- WhatsApp House Help
- Admin Dashboard

---

## Excluded (Future Releases)

- OTP Verification
- Ratings
- Reviews
- Booking Workflow
- Calendar
- Online Payments
- Notifications
- In-App Chat
- AI Matching

---

# 4. Business Rules

## BR-001

One House Help has one profile.

A profile can contain multiple skills.

---

## BR-002

One House Help belongs to one community.

---

## BR-003

A House Help can provide multiple services.

Example:

- Cooking
- Sweeping & Mopping
- Vessel Washing
- Bathroom Cleaning
- Deep Cleaning
- Baby Care
- Elder Care

---

## BR-004

Each selected service has its own monthly charge.

Example

Cooking → ₹3500

Sweeping & Mopping → ₹1500

Vessel Washing → ₹1000

---

## BR-005

Maximum four availability slots.

---

## BR-006

Availability slots indicate general availability only.

They are NOT booking slots.

---

## BR-007

Freshers can register.

Experience Options

- Fresher (0 Years)
- 1 Year
- 2 Years
- 3 Years
- 4 Years
- 5 Years
- 6–10 Years
- More than 10 Years

---

## BR-008

Residents contact House Helps directly using:

- Phone Call
- WhatsApp

---

## BR-009

Every House Help has an Availability Status.

Values

- Looking for Work
- Currently Not Available

Profiles marked "Currently Not Available" are hidden from Resident Search.

---

## BR-010

Phone Verification

Phase 1

Phone number stored only.

Phase 2

OTP Verification.

---

## BR-011

Ratings are allowed only after verified hiring.

Ratings are excluded from MVP.

---

# 5. House Help Registration

## Step 1 – Personal Information

Fields

- Full Name
- Phone Number
- WhatsApp Number
- Same as Phone
- Gender
- Age

---

## Step 2 – Work Information

Fields

- Primary Skill
- Years of Experience
- Services Offered
- Availability Slots

Rules

Maximum 4 Availability Slots

---

## Step 3 – Charges & Location

Fields

Charges

- Cooking
- Sweeping & Mopping
- Vessel Washing
- Bathroom Cleaning
- Deep Cleaning
- Baby Care
- Elder Care

Location

- City
- Area
- Community

Buttons

- Previous
- Save Profile

---

# 6. Resident Search

Residents can search using the following filters.

## Mandatory

- Community
- Service Required

## Optional

- Area
- Availability Slot
- Years of Experience
- Monthly Budget

---

# 7. Database Design

## MVP Tables

### house_helpers

Stores House Help information.

### residents

Stores Resident information.

### admins

Stores administrator information.

---

## Future Table

### bookings

Bookings connect Residents with House Helpers.

Booking Information

- Requested Services
- Preferred Time Slot
- Requested Start Date
- Monthly Amount
- Status

---

# 8. Availability Status

Possible Values

- Looking for Work
- Currently Not Available

Default

Looking for Work

Profiles marked "Currently Not Available" are hidden from Resident Search.

---

# 9. Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Supabase

## Testing

- Playwright

## Version Control

- Git
- GitHub

---

# 10. Development Workflow

Every feature follows the same workflow.

1. Update PRD
2. Design UI
3. Implement
4. Manual Testing
5. Playwright Tests
6. Git Commit
7. Push to GitHub

---

# 11. Database Architecture

## MVP Tables

- house_helpers
- residents
- admins

## Phase 2

- bookings

## Phase 3

- ratings
- payments

## Phase 4

- notifications
- chat
- OTP verification

---

# 12. MVP Roadmap

## Phase 1

- Registration Wizard
- Save Profile
- Supabase Integration

## Phase 2

- Resident Search
- House Help Profile
- Phone & WhatsApp Contact

## Phase 3

- Booking Module

## Phase 4

- Ratings & Reviews

## Phase 5

- Payments
- Notifications
- OTP Verification

---

# 13. Future Enhancements

- AI-powered House Help recommendations
- Multi-language support beyond English and Tamil
- Identity Verification
- Digital Payments
- Booking Calendar
- Push Notifications
- Community Admin Approval
- Favourite House Helps
- Chat System

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Original PRD |
| 2.0 | Current | Business rules, MVP scope, architecture, and roadmap updated |