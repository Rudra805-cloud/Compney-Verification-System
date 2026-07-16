## Collection Details

### 1. Users

The `Users` collection stores user account information and is used for authentication and authorization.

**Main Fields**

- name
- email
- password (hashed using bcrypt)
- createdAt
- updatedAt

---

### 2. Companies

The `Companies` collection stores general information about each validated company.

**Main Fields**

- hostname
- websiteUrl
- appliedChecks
- trustScore
- riskLevel
- summary
- lastValidatedAt

---


### 3. Validations

The **Validations** collection stores every company validation performed by users.

**Main Fields**

- userId (Reference to User)
- companyId (Reference to Company)
- appliedChecks
- trustScore
- riskLevel
- summary
- searchedAt
- lastValidatedAt

Instead of maintaining a separate search history collection, Veris uses the **Validation** collection to retrieve and display previously validated companies for each user.

## Database Relationships

The Veris database uses MongoDB references to establish relationships between collections while avoiding data duplication.

```text
                +----------------------+
                |        Users         |
                +----------------------+
                           |
                           | userId
                           |
                           ▼
                +----------------------+
                |     Validations      |
                +----------------------+
                | companyId            |
                | appliedChecks        |
                | trustScore           |
                | riskLevel            |
                | summary              |
                | searchedAt           |
                | lastValidatedAt      |
                +----------------------+
                           |
                           | companyId
                           |
                           ▼
                +----------------------+
                |      Companies       |
                +----------------------+
```

### Relationship Explanation

- A user can perform multiple company validations.
- A company can have multiple validation records over time.
- Each validation belongs to exactly one user.
- Each validation belongs to exactly one company.
- The `Validation` collection references both the `Users` and `Companies` collections using MongoDB `ObjectId` references.
