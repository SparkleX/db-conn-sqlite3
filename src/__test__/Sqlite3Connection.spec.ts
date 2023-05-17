import { Connection } from "db-conn";
import { Sqlite3Driver } from "../Sqlite3Driver";

const driver = new  Sqlite3Driver();

test("commit", async () => {
	const conn = await driver.connect(':memory:');
	let result = await conn.execute('CREATE TABLE lorem (info TEXT)');	
	await conn.setAutoCommit(false);
	result = await conn.execute("INSERT INTO lorem VALUES ('1')");
	await conn.commit()
	let data = await conn.executeQuery("select * from lorem where info=?",['1']) as any;
	await conn.close();
	//let data = result.data as any;
	expect(data[0].info).toStrictEqual('1');
});

test("rollback", async () => {
	const conn = await driver.connect(':memory:');
	let result = await conn.execute('CREATE TABLE lorem (info TEXT)');	
	await conn.setAutoCommit(false);
	result = await conn.execute("INSERT INTO lorem VALUES ('1')");
	await conn.rollback();
	result = await conn.execute("select * from lorem");
	await conn.close();
	expect(result.data?.length).toStrictEqual(0);
});

test("error", async () => {
	const conn = await driver.connect(':memory:');
	let result = await conn.execute('CREATE TABLE lorem (info TEXT)');	
	try {
		result = await conn.execute("INSERT INTO lorem");
	}catch(e) {
		expect(true);
	}
	await conn.close();
});

test("error - close", async () => {
	const conn = await driver.connect(':memory:');
	await conn.close();
	try {
		await conn.close();
	}catch(e) {
		expect(false);
	}
});

test("error - autocommit = true", async () => {
	const conn = await driver.connect(':memory:');	
	try {
		await conn.setAutoCommit(true);
	}catch(e) {
		expect(false);
	}
	await conn.close();
});