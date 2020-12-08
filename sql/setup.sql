CREATE TABLE beer (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    mouth_feel TEXT,
    brewery TEXT
);

CREATE TABLE vodka (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    flavor TEXT,
    distillary TEXT
);

CREATE TABLE wine (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    mouth_feel TEXT,
    winery TEXT
);

CREATE TABLE absinthe (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    strength TEXT,
    country TEXT
);

CREATE TABLE cocktails (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    ingredients TEXT,
    flavor TEXT
);


