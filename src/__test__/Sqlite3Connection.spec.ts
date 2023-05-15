import { Sqlite3Connection } from "../Sqlite3Connection";
import { Connection } from "db-conn";
import { Sqlite3Driver } from "../Sqlite3Driver";

const driver = new  Sqlite3Driver();

test("Connect", async () => {
	const conn = await driver.connect(':memory:');
	let result = await conn.execute('CREATE TABLE lorem (info TEXT)');
	result = await conn.execute("INSERT INTO lorem VALUES ('1')");
	result = await conn.execute("select * from lorem");
	await conn.close();
	expect(result.data?.length).toStrictEqual(1);
	let data = result.data as any;
	expect(data[0].info).toStrictEqual('1');
});