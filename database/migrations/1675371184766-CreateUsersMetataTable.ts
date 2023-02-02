import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersMetataTable1675371184766 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE SEQUENCE users_metadata_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;',
    );
    await queryRunner.query(
      `CREATE TABLE "public"."users_metadata" (
            "created_at" timestamptz DEFAULT now() NOT NULL,
            "updated_at" timestamptz DEFAULT now() NOT NULL,
            "id" integer DEFAULT nextval('users_metadata_id_seq') NOT NULL,
            "birthday" character varying(256),
            "image" character varying(256),
            "user_id" integer NOT NULL,
            CONSTRAINT "PK_b0e89f941718c1daee577498" PRIMARY KEY ("id"),
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        ) WITH (oids = false);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SEQUENCE IF EXISTS users_metadata_id_seq;');
    await queryRunner.query('DROP TABLE "users_metadata"');
  }
}
