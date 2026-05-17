# Security Specification - Elite Club RafaCar

## Data Invariants
1. A Lead must always be associated with the affiliate (userId) who created it.
2. A Client record contains PII and must only be accessible by the creator, analysts, or admins.
3. Users cannot elevate their own roles or points without a valid transaction check (though points are updated via `addPoints` which is a client-side call here, so we must protect the fields).
4. Sales and Credit Requests must be linked to valid leads/users.

## The "Dirty Dozen" Payloads (Denial Tests)
1. **Lead Spoofing**: Create a lead with `userId` of another user. (Reject: `incoming().userId == request.auth.uid`)
2. **Lead Poisoning**: Document ID with 1KB string. (Reject: `isValidId(leadId)`)
3. **Ghost Field Update**: Update a lead with `isAdmin: true`. (Reject: `affectedKeys().hasOnly([...])`)
4. **PII Leak**: Non-owner trying to 'get' a client profile. (Reject: `isOwner(existing().userId) || isAnalyst()`)
5. **Role Escalation**: Regular user updating their own role to 'ADMIN'. (Reject: `!incoming().diff(existing()).affectedKeys().hasAny(['role'])`)
6. **Points Injection**: User updating points by 1,000,000. (Reject: `incoming().points == existing().points + change` logic or just `affectedKeys()` limits)
7. **Simulation Hijack**: Creating a simulation for someone else. (Reject: `incoming().userId == request.auth.uid`)
8. **Invalid Stage**: Setting lead stage to 'Manager'. (Reject: `incoming().stage in [...]`)
9. **Status Fast-Track**: Non-analyst setting credit status to 'Aprovado'. (Reject: `isAnalyst() || isAdmin()`)
10. **Timestamp Fraud**: Client providing a future `createdAt`. (Reject: `incoming().createdAt == request.time`)
11. **Deleted Audit**: Non-admin trying to delete a sale record. (Reject: `isAdmin()`)
12. **Network Scrape**: Non-admin attempting to list all users. (Reject: `isAdmin()`)

## Test Runner (Conceptual)
All above payloads must return `PERMISSION_DENIED`.
