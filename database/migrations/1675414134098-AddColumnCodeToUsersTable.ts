import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnCodeToUsersTable1675414134098
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
       ALTER TABLE users ADD COLUMN code character varying(6)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE users DROP COLUMN code;
    `);
  }
}
