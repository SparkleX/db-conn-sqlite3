import { Driver, Connection } from "db-conn";
import * as sqlite3 from "sqlite3";
import { Sqlite3Connection } from "./Sqlite3Connection.js";

export class Sqlite3Driver implements Driver {
	public async connect(config: string): Promise<Connection> {
		const db = new sqlite3.Database(config);
		const conn = new Sqlite3Connection(db);
		return conn;
	}
}
