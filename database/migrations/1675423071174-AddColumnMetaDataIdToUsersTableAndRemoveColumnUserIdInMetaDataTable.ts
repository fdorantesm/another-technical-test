import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnMetaDataIdToUsersTableAndRemoveColumnUserIdInMetaDataTable1675423071174
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE users_metadata DROP COLUMN user_id;
    `);
    await queryRunner.query(`
       ALTER TABLE users ADD COLUMN metadata_id integer
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE users DROP COLUMN metadata_id;
    `);
    await queryRunner.query(`
       ALTER TABLE users_metadata ADD COLUMN user_id integer
    `);
  }
}
