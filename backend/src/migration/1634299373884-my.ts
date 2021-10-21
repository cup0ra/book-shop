import {MigrationInterface, QueryRunner} from "typeorm";

export class my1634299373884 implements MigrationInterface {
    name = 'my1634299373884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "img" character varying(300) NOT NULL, "price" integer NOT NULL, "description" character varying(1000) NOT NULL, "category" character varying(300) NOT NULL, "isAvailable" boolean NOT NULL DEFAULT false, "createDate" bigint NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "img" character varying(300) NOT NULL, "price" integer NOT NULL, "description" character varying(1000) NOT NULL, "category" character varying(300) NOT NULL, "isAvailable" boolean NOT NULL DEFAULT false, "createDate" bigint NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "currentHashedRefreshToken" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
