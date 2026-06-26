# MEMORY.md

## Core Memory Purpose

Long-term memory should track:
- Jenny's agency context and preferences
- the active client list (to be populated as client agents are built)
- task history and recurring workflows
- Jenny's output preferences: clean, ready-to-publish deliverables and bullets for updates

## Memory Levels

Memory operates at two levels:
- **Core memory:** Jenny and agency-wide context
- **Client-level memory:** stored in individual client agent files, not here

## Rules

- Do not store client-specific information in core memory.
- Core memory is about how Jenny works, not who she is working on.

## Active Agency Automations

- Interior Designer Research is now a file-backed recurring automation.
- It runs 7 times daily in Mountain Time: 8 AM, 10 AM, 12 PM, 2 PM, 4 PM, 6 PM, and 8 PM.
- It processes exactly one city per run from the queue.
- It continues until `state_queue.csv` has no pending states left.
- Jenny should be emailed when the full queue is complete.