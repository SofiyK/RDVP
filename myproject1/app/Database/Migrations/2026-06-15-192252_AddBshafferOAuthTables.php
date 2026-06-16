<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Addbshafferoauthtables extends Migration
{
    public function up()
    {
        if (!$this->db->tableExists('oauth_clients')) {
            $this->forge->addKey('id', TRUE);

            $this->forge->addField(array(
                'id' => array('type' => 'INT', 'unsigned' => TRUE, 'null' => FALSE, 'auto_increment' => TRUE),
                'client_id' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => FALSE),
                'client_secret' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => FALSE),
                'redirect_uri' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => TRUE),
                'grant_types' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => TRUE),
                'scope' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => TRUE),
                'user_id' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => TRUE), // Изменено на VARCHAR
            ));

            // Внешний ключ временно отключен
            // $this->forge->addForeignKey('user_id', 'users', 'id', 'RESTRICT', 'RESTRICT');

            $this->forge->createTable('oauth_clients', TRUE);
        }

        if (!$this->db->tableExists('oauth_scopes')) {
            // Setup Keys
            $this->forge->addKey('id', TRUE);

            $this->forge->addField(array(
                'id' => array('type' => 'INT', 'unsigned' => TRUE, 'null' => FALSE, 'auto_increment' => TRUE),
                'scope' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => FALSE),
                'is_default' => array('type' => 'TINYINT', 'unsigned' => TRUE, 'null' => TRUE, 'default' => 0),
            ));

            $this->forge->createTable('oauth_scopes', TRUE);
        }

        if (!$this->db->tableExists('oauth_access_tokens')) {
            // Setup Keys
            $this->forge->addKey('id', TRUE);

            $this->forge->addField(array(
                'id' => array('type' => 'INT', 'unsigned' => TRUE, 'null' => FALSE, 'auto_increment' => TRUE),
                'access_token' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => FALSE),
                'scope' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => TRUE),
                'expires' => array('type' => 'TIMESTAMP', 'null' => TRUE),
                'user_id' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => FALSE),
                'client_id' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => FALSE),
            ));

            $this->forge->createTable('oauth_access_tokens', TRUE);
        }

        if (!$this->db->tableExists('oauth_refresh_tokens')) {
            // Setup Keys
            $this->forge->addKey('id', TRUE);

            $this->forge->addField(array(
                'id' => array('type' => 'INT', 'unsigned' => TRUE, 'null' => FALSE, 'auto_increment' => TRUE),
                'refresh_token' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => FALSE),
                'scope' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => TRUE),
                'expires' => array('type' => 'TIMESTAMP', 'null' => TRUE),
                'user_id' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => FALSE),
                'client_id' => array('type' => 'VARCHAR', 'constraint' => 255, 'null' => FALSE),
            ));

            $this->forge->createTable('oauth_refresh_tokens', TRUE);
        }
    }

    public function down()
    {
        $this->forge->dropTable('oauth_refresh_tokens', TRUE);
        $this->forge->dropTable('oauth_access_tokens', TRUE);
        $this->forge->dropTable('oauth_scopes', TRUE);
        $this->forge->dropTable('oauth_clients', TRUE);
    }
}
