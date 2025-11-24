# Backend Integration Plan

## Google Vertex AI Agent Engine Integration

This document outlines the plan for connecting the Agentic Factory dashboard to real-time data from agents deployed on **Google Vertex AI Agent Engine**.

---

## Table of Contents

1. [Overview](#overview)
2. [Metrics Mapping](#metrics-mapping)
3. [Data Sources](#data-sources)
4. [Implementation Plan](#implementation-plan)
5. [API Examples](#api-examples)
6. [Architecture](#architecture)
7. [Next Steps](#next-steps)

---

## Overview

The Agentic Factory dashboard displays three categories of metrics:
- **Performance**: Latency, Error Rate, Tool Success, Escalation, Accuracy, Hallucination
- **Compliance**: Privacy, Security, Bias Detection, Explainability
- **Costs**: Total Cost, Token Usage, Cost per Model

This plan details how each metric can be retrieved from Google Cloud services.

---

## Metrics Mapping

### Performance Metrics

| Dashboard Metric | Google Cloud Source | API/Service | Availability |
|-----------------|---------------------|-------------|--------------|
| **Latency** | `aiplatform.googleapis.com/prediction/latencies` | Cloud Monitoring API | ✅ Native |
| **Error Rate** | `aiplatform.googleapis.com/prediction/error_count` | Cloud Monitoring API | ✅ Native |
| **Request Count** | `aiplatform.googleapis.com/prediction/request_count` | Cloud Monitoring API | ✅ Native |
| **Tool Call Success Rate** | Custom event logging | Cloud Logging + BigQuery | ⚠️ Custom |
| **Escalation Rate** | Custom event logging | Cloud Logging + BigQuery | ⚠️ Custom |
| **Output Accuracy** | Offline evaluation | Vertex AI Evaluation | ⚠️ Custom |
| **Hallucination Rate** | Grounding scores | Vertex AI Grounding | ⚠️ Partial |

### Compliance Metrics

| Dashboard Metric | Google Cloud Source | API/Service | Availability |
|-----------------|---------------------|-------------|--------------|
| **Privacy Compliance** | Guardrails configuration | Agent Engine Config | ⚠️ Custom tracking |
| **Security Control Coverage** | IAM + DLP policies | Security Command Center | ⚠️ Custom |
| **Bias Detection Rate** | Model evaluation | Vertex AI Responsible AI | ⚠️ Custom |
| **Explainability Coverage** | Session traces | Agent Engine Sessions API | ✅ Partial |

### Cost Metrics

| Dashboard Metric | Google Cloud Source | API/Service | Availability |
|-----------------|---------------------|-------------|--------------|
| **Total Cost** | Billing data | Cloud Billing API | ✅ Native |
| **Token Usage** | Response metadata | Vertex AI API Response | ✅ Native |
| **Cost per Model** | SKU breakdown | BigQuery Billing Export | ✅ Native |
| **Compute Cost** | GCE/GKE costs | Cloud Billing API | ✅ Native |

---

## Data Sources

### 1. Cloud Monitoring API

**Purpose**: Real-time performance metrics (latency, errors, request counts)

**Endpoint**: `monitoring.googleapis.com/v3`

**Key Metrics**:
```
aiplatform.googleapis.com/prediction/latencies
aiplatform.googleapis.com/prediction/request_count
aiplatform.googleapis.com/prediction/error_count
aiplatform.googleapis.com/prediction/replicas
```

**Authentication**: Service Account with `roles/monitoring.viewer`

---

### 2. Vertex AI API

**Purpose**: Token usage, model responses, session traces

**Endpoint**: `aiplatform.googleapis.com/v1`

**Key Data**:
- `usageMetadata.totalTokenCount` - from generate content responses
- `usageMetadata.promptTokenCount` - input tokens
- `usageMetadata.candidatesTokenCount` - output tokens

**Authentication**: Service Account with `roles/aiplatform.user`

---

### 3. Cloud Billing API

**Purpose**: Cost tracking and breakdown

**Endpoint**: `cloudbilling.googleapis.com/v1`

**Alternative**: BigQuery Billing Export (recommended for detailed analysis)

**Key Data**:
- Total spend per service
- SKU-level breakdown (per model costs)
- Daily/monthly aggregations

**Authentication**: Service Account with `roles/billing.viewer`

---

### 4. Agent Engine Sessions API

**Purpose**: Agent interaction traces, tool calls, escalations

**Endpoint**: Part of Vertex AI Agent Engine SDK

**Key Data**:
- Session history
- Tool invocations and results
- Agent reasoning traces

**Authentication**: Service Account with `roles/aiplatform.user`

---

### 5. Cloud Logging

**Purpose**: Custom event tracking (escalations, compliance events)

**Endpoint**: `logging.googleapis.com/v2`

**Usage**: Write custom structured logs from agent code, query via API

**Authentication**: Service Account with `roles/logging.viewer`

---

## Implementation Plan

### Phase 1: Core Infrastructure (Week 1-2)

1. **Set up backend service**
   - Python FastAPI or Node.js Express
   - Service account authentication
   - Environment configuration

2. **Implement Cloud Monitoring integration**
   - Fetch latency metrics
   - Fetch error rates
   - Fetch request counts
   - Aggregate by agent/model

3. **Implement basic cost tracking**
   - Connect to Billing API
   - Query token usage from logs
   - Calculate cost per agent

### Phase 2: Agent-Level Metrics (Week 3-4)

4. **Implement session tracking**
   - Connect to Agent Engine Sessions API
   - Parse tool call success/failure
   - Track escalation events

5. **Create custom logging layer**
   - Define structured log schema
   - Instrument agent code
   - Set up log-based metrics

6. **Build aggregation pipeline**
   - BigQuery dataset for analytics
   - Scheduled queries for summaries
   - Real-time streaming for dashboards

### Phase 3: Compliance & Quality (Week 5-6)

7. **Implement compliance tracking**
   - Define compliance events
   - Track guardrail triggers
   - Monitor PII detection events

8. **Set up evaluation pipeline**
   - Integrate Vertex AI Evaluation
   - Schedule accuracy assessments
   - Track hallucination scores

9. **Build WebSocket layer**
   - Real-time updates to frontend
   - Event-driven architecture
   - Connection management

---

## API Examples

### Fetching Latency Metrics (Python)

```python
from google.cloud import monitoring_v3
from google.protobuf.timestamp_pb2 import Timestamp
import time

def get_latency_metrics(project_id: str, agent_id: str, hours: int = 24):
    """
    Fetch latency metrics from Cloud Monitoring.
    
    Args:
        project_id: GCP project ID
        agent_id: Agent identifier (used in labels)
        hours: Time range in hours
        
    Returns:
        List of latency data points
    """
    client = monitoring_v3.MetricServiceClient()
    project_name = f"projects/{project_id}"
    
    # Calculate time interval
    now = time.time()
    seconds = int(now)
    nanos = int((now - seconds) * 10 ** 9)
    
    interval = monitoring_v3.TimeInterval({
        "end_time": {"seconds": seconds, "nanos": nanos},
        "start_time": {"seconds": (seconds - hours * 3600), "nanos": nanos},
    })
    
    # Build filter
    filter_str = (
        'metric.type="aiplatform.googleapis.com/prediction/latencies" '
        f'AND resource.labels.endpoint_id="{agent_id}"'
    )
    
    # Query metrics
    results = client.list_time_series(
        request={
            "name": project_name,
            "filter": filter_str,
            "interval": interval,
            "view": monitoring_v3.ListTimeSeriesRequest.TimeSeriesView.FULL,
        }
    )
    
    # Process results
    latencies = []
    for series in results:
        for point in series.points:
            latencies.append({
                "timestamp": point.interval.end_time.timestamp(),
                "value_ms": point.value.distribution_value.mean,
            })
    
    return latencies
```

### Fetching Token Usage (Python)

```python
from vertexai.generative_models import GenerativeModel

def get_token_usage(project_id: str, location: str, model_name: str, prompt: str):
    """
    Get token usage from a Vertex AI model response.
    
    Returns:
        dict with token counts and estimated cost
    """
    model = GenerativeModel(model_name)
    response = model.generate_content(prompt)
    
    usage = response.usage_metadata
    
    # Pricing (example - check current pricing)
    PRICE_PER_1K_INPUT = 0.000125   # Gemini 1.5 Flash
    PRICE_PER_1K_OUTPUT = 0.000375
    
    return {
        "prompt_tokens": usage.prompt_token_count,
        "completion_tokens": usage.candidates_token_count,
        "total_tokens": usage.total_token_count,
        "estimated_cost": (
            (usage.prompt_token_count / 1000) * PRICE_PER_1K_INPUT +
            (usage.candidates_token_count / 1000) * PRICE_PER_1K_OUTPUT
        )
    }
```

### Fetching Billing Data (Python)

```python
from google.cloud import bigquery

def get_cost_by_model(project_id: str, dataset_id: str, days: int = 30):
    """
    Query billing export for AI/ML costs by model.
    
    Requires BigQuery billing export to be configured.
    """
    client = bigquery.Client(project=project_id)
    
    query = f"""
    SELECT
        sku.description AS model,
        SUM(cost) AS total_cost,
        SUM(usage.amount) AS total_usage
    FROM `{project_id}.{dataset_id}.gcp_billing_export_v1_*`
    WHERE 
        service.description = 'Vertex AI'
        AND _PARTITIONTIME >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL {days} DAY)
    GROUP BY sku.description
    ORDER BY total_cost DESC
    """
    
    results = client.query(query).result()
    
    return [
        {
            "model": row.model,
            "cost": float(row.total_cost),
            "usage": float(row.total_usage)
        }
        for row in results
    ]
```

### Custom Event Logging (Python)

```python
import google.cloud.logging
import json

def log_agent_event(event_type: str, agent_id: str, metadata: dict):
    """
    Log a custom agent event for dashboard tracking.
    
    Event types:
    - tool_call_success
    - tool_call_failure
    - escalation
    - compliance_violation
    - guardrail_triggered
    """
    client = google.cloud.logging.Client()
    logger = client.logger("agentic-factory-events")
    
    logger.log_struct({
        "event_type": event_type,
        "agent_id": agent_id,
        "timestamp": datetime.utcnow().isoformat(),
        **metadata
    })
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GOOGLE CLOUD                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ Agent Engine │  │  Vertex AI   │  │   Cloud      │               │
│  │   (Agents)   │  │   (Models)   │  │  Monitoring  │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         │                 │                 │                        │
│         ▼                 ▼                 ▼                        │
│  ┌──────────────────────────────────────────────────┐               │
│  │              Cloud Logging / BigQuery             │               │
│  │         (Aggregated metrics & events)             │               │
│  └──────────────────────┬───────────────────────────┘               │
│                         │                                            │
│  ┌──────────────┐       │       ┌──────────────┐                    │
│  │   Billing    │───────┼───────│  Pub/Sub     │                    │
│  │    Export    │       │       │  (Events)    │                    │
│  └──────────────┘       │       └──────────────┘                    │
│                         │                                            │
└─────────────────────────┼────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVICE                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │  Metrics     │  │   Billing    │  │   Events     │               │
│  │  Service     │  │   Service    │  │   Service    │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         │                 │                 │                        │
│         ▼                 ▼                 ▼                        │
│  ┌──────────────────────────────────────────────────┐               │
│  │              Aggregation Layer                    │               │
│  │    (Compute summaries, cache, transform)          │               │
│  └──────────────────────┬───────────────────────────┘               │
│                         │                                            │
│  ┌──────────────┐       │       ┌──────────────┐                    │
│  │   REST API   │◄──────┴──────►│  WebSocket   │                    │
│  │  (Polling)   │               │  (Real-time) │                    │
│  └──────────────┘               └──────────────┘                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────┐               │
│  │              useAgentData Hook                    │               │
│  │    (Replace mockData with API calls)              │               │
│  └──────────────────────┬───────────────────────────┘               │
│                         │                                            │
│                         ▼                                            │
│  ┌──────────────────────────────────────────────────┐               │
│  │              Dashboard Views                      │               │
│  │    (Overview, Performance, Compliance, Costs)     │               │
│  └──────────────────────────────────────────────────┘               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Next Steps

### Immediate Actions

1. [ ] Create GCP service account with required permissions
2. [ ] Set up BigQuery billing export
3. [ ] Define custom log schema for agent events
4. [ ] Create backend project structure (FastAPI/Express)

### Backend Development

5. [ ] Implement Cloud Monitoring client
6. [ ] Implement Billing API client
7. [ ] Implement Agent Engine Sessions client
8. [ ] Build REST API endpoints matching frontend data structure
9. [ ] Add WebSocket support for real-time updates

### Frontend Integration

10. [ ] Update `useAgentData` hook to call backend API
11. [ ] Add loading and error states
12. [ ] Implement polling/WebSocket connection
13. [ ] Add retry logic and caching

### DevOps

14. [ ] Set up Cloud Run for backend deployment
15. [ ] Configure CI/CD pipeline
16. [ ] Set up staging environment
17. [ ] Configure alerting and monitoring for the backend itself

---

## Required GCP Permissions

```yaml
# Service Account Roles
roles:
  - roles/monitoring.viewer          # Cloud Monitoring metrics
  - roles/logging.viewer             # Cloud Logging queries
  - roles/bigquery.dataViewer        # BigQuery billing export
  - roles/billing.viewer             # Billing API
  - roles/aiplatform.user            # Vertex AI / Agent Engine
  - roles/serviceusage.serviceUsageConsumer  # API access
```

---

## References

- [Vertex AI Agent Engine Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview)
- [Cloud Monitoring API](https://cloud.google.com/monitoring/api/v3)
- [Cloud Billing API](https://cloud.google.com/billing/docs/apis)
- [Vertex AI Pricing](https://cloud.google.com/vertex-ai/pricing)
- [Agent Development Kit (ADK)](https://google.github.io/adk-docs/)

---

*Document created: November 2025*
*Last updated: November 2025*

