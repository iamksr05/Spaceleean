# SPACELEEAN - Space Propulsion Engineering

**Official platform for SPACELEEAN's advanced propulsion technologies.**

---

## ⚠️ Proprietary Notice

**Copyright © 2025 SPACELEEAN. All Rights Reserved.**

This software is the confidential and proprietary information of SPACELEEAN. It is intended solely for the internal use and operation of SPACELEEAN projects.

**Unauthorized copying, distribution, modification, public display, or use of this source code, via any medium, is strictly prohibited.** This project is NOT open source.

---

## Project Overview

This repository contains the full stack application for the SPACELEEAN platform, including:
- **Main Website**: A high-performance marketing and informational site.
- **Admin Dashboard**: A secure internal PWA for managing contact inquiries and operations.
- **Backend API**: A Node.js/Express service handling data persistence and business logic.

## Internal Development Guide

### Prerequisites
- Node.js 18+ 
- MongoDB (Atlas or Local)

### Setup

```bash
# Install dependencies
npm install

# Setup Environment
# Create .env in root and .env in admin-dashboard/
```

### Running the Application

1. **Backend Server**:
   ```bash
   npm run server
   # Runs on http://localhost:3333
   ```

2. **Main Website**:
   ```bash
   npm run dev
   # Runs on http://localhost:8080
   ```

3. **Admin Dashboard**:
   ```bash
   cd admin-dashboard
   npm run dev
   # Runs on http://localhost:3000
   ```

## Deployment

- **Frontend**: Hosted on Vercel.
- **Backend**: Hosted on Render.
- **Database**: MongoDB Atlas.

---
*For internal team access only. Contact the project administrator for credentials.*
