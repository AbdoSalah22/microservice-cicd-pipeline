{{/*
Expand the name of the chart.
*/}}
{{- define "vois-explore.name" -}}
vois-explore
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "vois-explore.fullname" -}}
{{- include "vois-explore.name" . }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "vois-explore.labels" -}}
app.kubernetes.io/name: {{ include "vois-explore.name" . }}
app.kubernetes.io/instance: {{ include "vois-explore.name" . }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "vois-explore.selectorLabels" -}}
app.kubernetes.io/name: {{ include "vois-explore.name" . }}
app.kubernetes.io/instance: {{ include "vois-explore.name" . }}
{{- end }}