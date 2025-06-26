# Kvikkjokk-NextJS and Monitoring Deployment Documentation

This document outlines the deployment of the `kvikkjokk-nextjs` application and a monitoring stack (Grafana, Prometheus, Alertmanager) on a bare-metal Kubernetes cluster running on Proxmox VMs distributed in 3 Proxmox nodes for HA. The cluster is configured for high availability (HA) with 3 control planes and 10 worker nodes, using Flannel CNI, NodePort services, and daily etcd backups on `cp3` for cluster reliability.

## Cluster Architecture

- **Kubernetes Cluster**:

  - **Control Planes**: 3 nodes (`cp1`, `cp2`, `cp3`) for HA of Kubernetes API, scheduler, and etcd.
  - **Worker Nodes**: 10 nodes for application and monitoring workloads (2 vCPUs, 4GB RAM each).
  - **Container Runtime**: `containerd`.
  - **Networking**: Flannel CNI for pod-to-pod VXLAN overlay.
  - **Storage**: Local storage on `cp1` for monitoring; application storage via Kubernetes secrets.

- **Jenkins Server**: Runs the CI/CD pipeline.
- **Docker Registry**: Private, insecure (HTTP) registry.
- **External Proxy**: Nginx for HTTPS termination and forwarding.

## Kvikkjokk-NextJS Deployment

### **Overview**

The `kvikkjokk-nextjs` (Next.js) application is deployed via a Jenkins pipeline, exposed through an NGINX Ingress Controller with a NodePort service and an external proxy (NGINX). `https://kvikkjokk-nextjs.ekedala-services.se`

### **Jenkins Pipeline**

- **Stages**:
  - Clones the GitHub repository.
  - Builds and pushes a Docker image to the private registry.
  - Generates `Deployment`, `Service`, and `Ingress` manifests.
  - Deploys to the cluster via SSH to a control plane.

### **Kubernetes Resources**

- **Deployment**: Runs pods with replicas, `nodeAffinity` (prefers `server=server1/server2`), `podAntiAffinity` (spreads pods across nodes), and secrets for `MONGODB_URI`, `OMDB_API_KEY`, `DEEPL_API_KEY`.
- **Service**: `ClusterIP`, forwards port `80` to pods’ port `9001`.
- **Ingress**: Routes `kvikkjokk-nextjs.ekedala-services.se` to the service via NGINX Ingress Controller.

### **External Exposure**

- **NGINX Ingress Controller**:
  - Service: `NodePort` (`80:30080/TCP`, `443:30443/TCP`) in `ingress-nginx` namespace.
- **External Proxy**:
  - Nginx terminates HTTPS, forwards to `node:30080`:
- **DNS**:
  - Cloudflare resolves `kvikkjokk-nextjs.ekedala-services.se` to the proxy.

### **Traffic Flow**

1. Client requests `https://kvikkjokk-nextjs.ekedala-services.se`.
2. Proxy terminates HTTPS, forwards to `node:30080`.
3. `NodePort` routes to `ingress-nginx-controller`.
4. Ingress controller forwards to `kvikkjokk-nextjs-service` (`port: 80`).
5. Service delivers to pods (`port: 9001`).

## Monitoring Setup

### **Overview**

A monitoring stack (Grafana, Prometheus, Alertmanager) is deployed on `cp1` in the `monitoring` namespace, using local storage and NodePort services.

### **Components**

- **Grafana**: Visualizes metrics, 12GiB Persistent Volume (PV) at `/mnt/grafana-data`.
- **Prometheus**: Collects metrics, 20GiB PV at `/mnt/prometheus-data`.
- **Alertmanager**: Handles alerts, 5GiB PV at `/mnt/prometheus-alertmanager-data`.
- **Deployment**: Installed via Helm (`grafana/grafana`, `prometheus-community/prometheus`).

### **Storage**

- Local storage on `cp1`:
  - `/mnt/grafana-data` (~15GiB).
  - `/mnt/prometheus-data` (20GiB).
  - `/mnt/prometheus-alertmanager-data` (5GiB).
- PVs tied to `cp1` via `nodeAffinity`.

### **Exposure**

- **Services**: `NodePort`, tied to `cp1`:
  - Grafana: `30774` (`http://cp1:30774`).
  - Prometheus: `32761` (`http://cp1:32761`).

## Cluster Maintenance

### **etcd Backups**

- **Node**: `cp3` (dedicated for control plane, no worker pods).
- **Schedule**: Daily backups of etcd to ensure cluster state recovery.
- **Process**:
  - Uses `etcdctl` to snapshot etcd.
  - Stored in `/mnt/backup` on `cp3`.
  - CronJob to execute the backup script daily.

### **Kubernetes High Availability**

- **Control Planes**: 3 nodes ensure API and scheduler reliability; etcd backups on `cp3` protect cluster state.
- **Worker Nodes**: 10 nodes distribute workloads with affinity rules.
- **Monitoring**: On `cp1`, single point of failure for monitoring only, not affecting other services.

### **Proxmox High Availability**

- **Nodes**: 3 nodes maintain quorum, preventing read-only state if one fails, ensuring the Kubernetes cluster can reschedule pods and remain operational.
