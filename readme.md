# Better Calendar Slack Statuses

## Requirements

* Node.js 14.x
* Yarn

## Configure

### Slack app

### Calendar

### Run locally

### Automate

### Run executable

## Planned improvements

* Multi-calendar support, with the fallback calendar functioning similar
  to the default Google Calendar app (generic status and emoji)
* Parse tags and emoji from both summary and description

## Known Issues

### Unsupported emojis

The Slack API does not seem to allow all emojis, even if you can select
them manually in the status window.

* `silhouette`
* `silhouettes`

### One-off changes to recurring events

If you have a recurring event but modify a single instance (eg, changing
its date/time, making it shorter or longer, or deleting it) then this
won't be picked up, and the event will be treated as though it's a
standard recurrence.

For modified date/times, you can work around this by adding a new one
off event to cover the modification. There is no workaround for deleted
instances.
