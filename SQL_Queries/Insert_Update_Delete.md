# Insert / Update / Delete queries 

Examples of modifying database content manually using SQL. All scripts are executed against the with real output captured from MySQL Wrokbench.

------------
## 1. Insert a new customer

```sql
insert into customer (Firstname, Lastname, City, Country, Phone) values ('Robort', 'Mem', 'Shenghai', 'Singapore',  0990542909);
```

## Result

```text
1 row(s) affected	0.047 sec
```

-----------
## 2. Update a existing customer detail


```sql
UPDATE customer
SET city = 'Mumbai' , phone = 0880078909
WHERE ID = 1;
```

## Result

```text
 Rows matched: 1  Changed: 1  Warnings: 0	0.031 sec
```


----------------
## 3. Delete a existing customer detail


```sql
DELETE FROM Customer WHERE Firstname='Ket';
```

## Result

```text
1 row(s) affected	0.000 sec
```
