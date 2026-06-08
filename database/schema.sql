CREATE TABLE IF NOT EXISTS providers (

id SERIAL PRIMARY KEY,

name VARCHAR(255) NOT NULL,

provider_type VARCHAR(100) NOT NULL,

api_key TEXT,

api_secret TEXT,

username TEXT,

password TEXT,

base_url TEXT,

is_active BOOLEAN DEFAULT true,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS contact_lists (

id SERIAL PRIMARY KEY,

name VARCHAR(255) NOT NULL,

description TEXT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS contacts (

id SERIAL PRIMARY KEY,

list_id INTEGER,

first_name VARCHAR(255),

last_name VARCHAR(255),

company VARCHAR(255),

address1 TEXT,

address2 TEXT,

city VARCHAR(255),

state VARCHAR(255),

zip VARCHAR(50),

country VARCHAR(100),

email VARCHAR(255),

phone VARCHAR(100),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (list_id)
REFERENCES contact_lists(id)
ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS templates (

id SERIAL PRIMARY KEY,

name VARCHAR(255) NOT NULL,

html_content TEXT NOT NULL,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS campaigns (

id SERIAL PRIMARY KEY,

name VARCHAR(255) NOT NULL,

provider_id INTEGER,

template_id INTEGER,

list_id INTEGER,

status VARCHAR(50) DEFAULT 'Draft',

total_contacts INTEGER DEFAULT 0,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (provider_id)
REFERENCES providers(id)
ON DELETE SET NULL,

FOREIGN KEY (template_id)
REFERENCES templates(id)
ON DELETE SET NULL,

FOREIGN KEY (list_id)
REFERENCES contact_lists(id)
ON DELETE SET NULL

);

CREATE TABLE IF NOT EXISTS letters (

id SERIAL PRIMARY KEY,

campaign_id INTEGER,

contact_id INTEGER,

provider_letter_id TEXT,

tracking_number TEXT,

status VARCHAR(100),

provider_response TEXT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (campaign_id)
REFERENCES campaigns(id)
ON DELETE CASCADE,

FOREIGN KEY (contact_id)
REFERENCES contacts(id)
ON DELETE CASCADE

);