import { MigrationInterface, QueryRunner } from 'typeorm';

export class Alterusertable1693501482687 implements MigrationInterface {
  name = 'Alterusertable1693501482687';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`userid\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` varchar(100) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`userid\` varchar(255) NULL`,
    );
  }
}
