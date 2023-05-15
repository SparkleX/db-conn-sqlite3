# Sqlite3 database driver of db-conn

---
Connect
```
	const conn = await driver.connect(':memory:');
	let result = await conn.execute('CREATE TABLE lorem (info TEXT)');
	result = await conn.execute("INSERT INTO lorem VALUES ('1')");
	result = await conn.execute("select * from lorem");
	await conn.close();
```