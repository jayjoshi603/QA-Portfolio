# Select queries

This file contains basic SELECT statements user for data fetching and validation and every queries reflect real data 

-------------
## 1. Fatching all customer data

```sql
SELECT * FROM Customer;
```
**Result (truncated preview):**

| ID | First Name | Last Name | City      | Country     | Phone     | Timestamp           |
|----|------------|-----------|-----------|-------------|-----------|---------------------|
| 1  | Jhon       | Wick      | Ohio      | US          | 987678909 | 2026-01-25 21:29:07 |
| 2  | Ket        | Russo     | Delhi     | India       | 988678909 | 2026-01-25 21:35:32 |
| 3  | Ramu       | Willson   | New York  | US          | 998678909 | 2026-01-25 21:35:32 |
| 4  | Snoop      | Dog       | Kabul     | Afghanistan | 990078909 | 2026-01-25 21:35:32 |
| 5  | Robort     | Chip      | Sydney    | Australia   | 998622909 | 2026-01-25 21:35:32 |
| 6  | Sanju      | Samson    | Delhi     | India       | 998332909 | 2026-01-25 22:29:52 |
| 7  | Billu      | Barbar    | Kabul     | Afghanistan | 990032909 | 2026-01-25 22:29:52 |

-------

# 2. Using `WHERE` clause fatching customer data from Australia only 

```sql
SELECT ID, FirstName, LastName, Email
FROM Customer
WHERE Country = 'Australia';
```

**Result (truncated preview):**

| ID | First Name | Last Name |  Phone  |  
|----|------------|-----------|-----------|
| 5  | Robort     | Chip      | 998622909 |

-------

# 3. Using 'LIKE' clause fatching data 

```sql
SELECT * FROM Customers
WHERE Firstname LIKE 'k%';
```
**Result (truncated preview):**

| ID | First Name | Last Name | City      | Country     | Phone     | Timestamp           |
|----|------------|-----------|-----------|-------------|-----------|---------------------|
| 2  | Ket        | Russo     | Delhi     | India       | 988678909 | 2026-01-25 21:35:32 |

-----------

## 4. Filtering data using AND operator 

```sql
SELECT * FROM Customer
WHERE Firstname LIKE 'S%' AND Country LIKE 'A%';
```

**Result (truncated preview):**

| ID | First Name | Last Name | City      | Country     | Phone     | Timestamp           |
|----|------------|-----------|-----------|-------------|-----------|---------------------|
| 4  | Snoop      | Dog       | Kabul     | Afghanistan | 990078909 | 2026-01-25 21:35:32 |

-----------

## 5. Filtering data using OR operator 

```sql
SELECT * FROM Customers
WHERE Firstname LIKE 'k%';
```

**Result (truncated preview):**

| ID | First Name | Last Name | City      | Country     | Phone     | Timestamp           |
|----|------------|-----------|-----------|-------------|-----------|---------------------|
| 4  | Snoop      | Dog       | Kabul     | Afghanistan | 990078909 | 2026-01-25 21:35:32 |
| 5  | Robort     | Chip      | Sydney    | Australia   | 998622909 | 2026-01-25 21:35:32 |
| 6  | Sanju      | Samson    | Delhi     | India       | 998332909 | 2026-01-25 22:29:52 |
| 7  | Billu      | Barbar    | Kabul     | Afghanistan | 990032909 | 2026-01-25 22:29:52 |
-----------


