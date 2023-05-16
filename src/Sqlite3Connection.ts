import { Connection, Result } from "db-conn";
import * as sqlite3 from "sqlite3";
import { Statement } from "sqlite3";

export class Sqlite3Connection implements Connection {
	private db: sqlite3.Database;
	public constructor(db: any) {
		this.db = db;
	}
	public async close(): Promise<void> {
		const rt = new Promise<void>((resolve, reject) => {
			this.db.close((err) => {
				if (err) {
					reject(err);
					return;
				}
				resolve();
			});
		});
		return rt;
	}
	public async execute(sql: string, params?: object | any[] | undefined): Promise<Result> {
		const rt = new Promise((resolve, reject) => {
			this.db.all(sql, params, (err: Error, rows) => {
				if (err) {
					reject(err);
					return;
				}
				let result = {
					data: rows
				}
				resolve(result);
			});
		});
		return rt;
	}

	public async executeQuery(sql: string, params?: object | any[] | undefined): Promise<object[]> {
		const rt: Result = await this.execute(sql, params);
		return rt.data!;
	}
	public async setAutoCommit(autoCommit: boolean): Promise<void> {
		if (autoCommit) {
			throw new Error("Not Supported");
		}
		else {
			await this.execute('begin transaction');
		}
	}
	public async commit(): Promise<void> {
		await this.execute('commit');
	}

	public async rollback(): Promise<void> {
		await this.execute('rollback');
	}
}
