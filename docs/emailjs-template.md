# EmailJS setup for the workflow inquiry form

## Required configuration

In EmailJS, select the existing email service and create or update the template used by this site. Copy its **Service ID**, **Template ID**, and **Public Key** into the matching `VITE_EMAILJS_*` variables in `.env` (or your deployment environment). Restart/redeploy after changing environment values.

The current code retains `service_phbyyuk` and `template_qrvz1rc` as backward-compatible defaults. Setting the environment variables explicitly is recommended so the configuration is clear and portable.

## Template settings

- **To email:** your own inbox.
- **Reply to:** `{{email}}`.
- **Subject:** `{{subject}} — {{project_type}}`.

Use this email body:

```text
New workflow inquiry

Name: {{name}}
Email: {{email}}
Preferred contact: {{preferred_contact}}

Project type: {{project_type}}
Expected timeline: {{timeline}}
Budget range: {{budget_range}}

Current workflow:
{{current_workflow}}

Tools, systems, or data:
{{systems_data}}

Desired outcome:
{{goal}}

Additional context:
{{message}}
```

## Variables received from the site

| EmailJS variable | Source |
| --- | --- |
| `name`, `email` | Contact details |
| `subject` | Fixed value: `New AI Workflow Inquiry` |
| `project_type` | Type of requested work |
| `current_workflow` | Existing manual process |
| `systems_data` | Involved systems or data |
| `goal` | Desired result |
| `timeline`, `budget_range` | Qualification details |
| `preferred_contact` | Preferred reply channel |
| `message` | Optional extra context |

`emailjs.sendForm(...)` serializes every named form control and sends those values to EmailJS. A variable will appear in the delivered email only when it is referenced in the EmailJS template, which is why the template update is necessary.

## Optional enquirer auto-reply

Create a second template in the same EmailJS service. Set its **To email** to `{{email}}`, then place its Template ID in `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID`. The website sends this only after the primary inquiry has been accepted; a failed auto-reply never prevents the primary inquiry from reaching you.

Set the auto-reply **Subject** to:

```text
We received your workflow inquiry
```

Use this HTML body:

```html
<div style="font-family: 'Times New Roman', Times, serif; font-size: 16px; color: #111;">
  <p>Hello <strong>{{name}}</strong>,</p>

  <p>Thank you for reaching out about <strong>{{project_type}}</strong>.</p>

  <p>I have received your inquiry and will review the workflow details you shared. As I work part-time and remotely, I aim to reply within two business days.</p>

  <p><strong>A copy of your inquiry:</strong></p>

  <p><strong>Current workflow:</strong></p>
  <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">{{current_workflow}}</p>

  <p><strong>Desired outcome:</strong></p>
  <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">{{goal}}</p>

  <p><strong>Timeline:</strong> {{timeline}}<br>
  <strong>Budget range:</strong> {{budget_range}}<br>
  <strong>Preferred contact:</strong> {{preferred_contact}}</p>

  <p>Best wishes,<br><strong>Ved Prakash</strong></p>
</div>
```
