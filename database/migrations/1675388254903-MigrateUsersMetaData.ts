import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrateUsersMetaData1675388254903 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            INSERT INTO users_metadata (user_id)
            SELECT users.id as user_id FROM users
            LEFT JOIN users_metadata ON users.id = users_metadata.user_id
            WHERE users_metadata.id IS NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
