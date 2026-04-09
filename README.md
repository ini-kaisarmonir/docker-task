# DevOps Engineer Practical Task

## Overview

This project demonstrates a **Containerization, Reverse Proxy, CI/CD, Basic Monitoring** using:

* Docker & Docker Compose
* Nginx Reverse Proxy
* Blue-Green Deployment
* GitHub Actions (CI/CD)
* Prometheus & Grafana (Monitoring)

The system ensures that new updates are deployed **without interrupting users**.

---

## Concept: Blue-Green Deployment

Two identical environments are maintained:

 **Blue Environment** → currently live
 **Green Environment** → new version (staging)

### Deployment Flow

1. Deploy new version to inactive environment
2. Test the new version
3. Switch traffic using Nginx
4. Stop old environment

---

## Tech Stack

* Docker / Docker Compose
* Nginx
* Node.js (App)
* GitHub Actions
* Prometheus
* Grafana

---

## Initial Setup

### 1. Start Services

```bash
docker compose up -d --build
```

 Default active environment: **BLUE**

---

### 2. Access Services

* App → http://your-server-ip:81
* Grafana → http://your-server-ip:3001
* Prometheus → http://your-server-ip:9090

---

## Deployment Process

### Manual Deployment

#### Step 1: Pull latest code

```bash
git pull origin main
```

---

#### Step 2: Deploy to inactive environment

If **Blue is active**:

```bash
docker compose up -d --build app_green_1 app_green_2
```

---

#### Step 3: Switch traffic

```bash
docker compose cp nginx/nginx-green.conf nginx:/etc/nginx/nginx.conf
docker exec nginx nginx -s reload
```

---

#### Step 4: Stop old environment

```bash
docker compose stop app_blue_1 app_blue_2
```

---

## Automated Deployment (GitHub Actions)

On every push/merge to `main`, GitHub Actions:

1. Connects to server via SSH
2. Detects active environment
3. Deploys to inactive environment
4. Switches Nginx config
5. Stops old containers

---
