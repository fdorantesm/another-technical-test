import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1674522701436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;',
    );
    await queryRunner.query(
      `CREATE TABLE "public"."users" (
        "created_at" timestamptz DEFAULT now() NOT NULL,
        "updated_at" timestamptz DEFAULT now() NOT NULL,
        "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
        "name" character varying(150),
        "email" character varying(100),
        "bio" character varying(1200),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      ) WITH (oids = false);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SEQUENCE IF EXISTS users_id_seq;');
    await queryRunner.query('DROP TABLE "users" CASCADE');
  }
}
