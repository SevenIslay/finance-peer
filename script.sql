-- Table: public.FUsers

-- DROP TABLE public."FUsers";

CREATE TABLE public."FUsers"
(
    "UserEmail" character varying(200) COLLATE pg_catalog."default",
    "UserName" character varying(100) COLLATE pg_catalog."default",
    "UserPassword" character varying(200) COLLATE pg_catalog."default",
    "UserId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserId")
)

TABLESPACE pg_default;

ALTER TABLE public."FUsers"
    OWNER to postgres;

GRANT ALL ON TABLE public."FUsers" TO pg_execute_server_program;

GRANT ALL ON TABLE public."FUsers" TO postgres;



-- Table: public.Files

-- DROP TABLE public."Files";

CREATE TABLE public."Files"
(
    "Name" character varying(200) COLLATE pg_catalog."default",
    "Id" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "UserId" integer,
    "Content" json,
    CONSTRAINT "Files_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "User_Id_UserId_FK" FOREIGN KEY ("UserId")
        REFERENCES public."FUsers" ("UserId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public."Files"
    OWNER to postgres;

GRANT ALL ON TABLE public."Files" TO postgres;