USE asb_portfolio;

ALTER TABLE brands ADD COLUMN external_link VARCHAR(500) DEFAULT NULL;
ALTER TABLE brands ADD COLUMN type VARCHAR(50) DEFAULT NULL;

UPDATE brands SET name = 'BOSCH REXROTH' WHERE name = 'BOSCH';

UPDATE brands SET external_link = 'https://www.dn-solutions.com/main.do', type = 'Mesin' WHERE name = 'DN SOLUTIONS';
UPDATE brands SET external_link = 'https://www.makino.com/', type = 'Mesin' WHERE name = 'MAKINO';
UPDATE brands SET external_link = 'http://en.hnkkorea.com/sub01/03_01.php', type = 'Mesin' WHERE name = 'HNK';
UPDATE brands SET external_link = 'https://www.mazak.com/id-en/', type = 'Mesin' WHERE name = 'MAZAK';
UPDATE brands SET external_link = 'https://machinetool.global.brother/en-eu', type = 'Mesin' WHERE name = 'BROTHER';
UPDATE brands SET external_link = 'http://www.welegroup.com/en/', type = 'Mesin' WHERE name = 'WELE';
UPDATE brands SET external_link = 'https://sodick.com/?utm_source=google&utm_campaign=%7Bcampaignname%7D&utm_medium=d&utm_content=194866989059&utm_term&gad_source=5&gad_campaignid=23162563870&gclid=EAIaIQobChMI7bua34jIkwMViXpvBB02ATBhEAEYASAAEgJltfD_BwE', type = 'Electrical' WHERE name = 'SODICK';
UPDATE brands SET external_link = 'https://www.hypertherm.com/', type = 'Mechanical' WHERE name = 'HYPERTHERM';
UPDATE brands SET type = 'Mesin' WHERE name IN ('KERTZ', 'TONE FAN', 'CATERPILLAR', 'KOMATSU', 'CUMMINS');

UPDATE brands SET external_link = 'https://www.toptul.com/en', type = 'Tools' WHERE name = 'TOPTUL';
UPDATE brands SET external_link = 'https://www.elora.de/en/', type = 'Tools' WHERE name = 'ELORA';
UPDATE brands SET external_link = 'https://tekiro.com/', type = 'Tools' WHERE name = 'TEKIRO';
UPDATE brands SET external_link = 'https://makitatools.com/', type = 'Tools' WHERE name = 'MAKITA';
UPDATE brands SET external_link = 'https://www.boschrexroth.com/en/id/', type = 'Tools' WHERE name = 'BOSCH REXROTH';
UPDATE brands SET external_link = 'https://www.hytorc.com/id/', type = 'Tools' WHERE name = 'HYTORC';
UPDATE brands SET type = 'Tools' WHERE name = 'LINCOLN';
