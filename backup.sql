--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path',  '',  false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: players; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.players (
    id integer NOT NULL, 
    name character varying(255) NOT NULL, 
    country character(3) NOT NULL, 
    profile_url text NOT NULL, 
    image_src text NOT NULL, 
    image_alt character varying(255) NOT NULL, 
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.players OWNER TO postgres;

--
-- Name: players_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.players_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.players_id_seq OWNER TO postgres;

--
-- Name: players_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.players_id_seq OWNED BY public.players.id;


--
-- Name: players_tournaments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.players_tournaments (
    player_id integer NOT NULL, 
    tournament_id integer NOT NULL, 
    rating integer, 
    turno integer, 
    posizione character varying(50)
);


ALTER TABLE public.players_tournaments OWNER TO postgres;

--
-- Name: tournaments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tournaments (
    id integer NOT NULL, 
    name character varying(255) NOT NULL, 
    href character varying(255), 
    href_pptp character varying(255), 
    category character varying(50), 
    location character varying(100), 
    country character varying(100), 
    surface character varying(50), 
    prizemoney integer, 
    datainizio date, 
    datafine date, 
    status character varying(20)
);


ALTER TABLE public.tournaments OWNER TO postgres;

--
-- Name: tournaments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tournaments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tournaments_id_seq OWNER TO postgres;

--
-- Name: tournaments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tournaments_id_seq OWNED BY public.tournaments.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uuid uuid NOT NULL, 
    active boolean DEFAULT false, 
    email character varying(255) NOT NULL, 
    password character varying(255) NOT NULL, 
    "createdAt" timestamp with time zone NOT NULL, 
    "updatedAt" timestamp with time zone NOT NULL, 
    image_url character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_tournaments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_tournaments (
    user_uuid uuid NOT NULL, 
    tournament_id integer NOT NULL, 
    image_url character varying(255), 
    score integer
);


ALTER TABLE public.users_tournaments OWNER TO postgres;

--
-- Name: players id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players ALTER COLUMN id SET DEFAULT nextval('public.players_id_seq'::regclass);


--
-- Name: tournaments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tournaments ALTER COLUMN id SET DEFAULT nextval('public.tournaments_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250224174616-create-tournament.js
20250227180042-create-player.js
20250228073657-create-player.js
20250305163852-predictions.js
\.


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.players (id,  name,  country,  profile_url,  image_src,  image_alt,  created_at) FROM stdin;
1	Jannik Sinner	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/jannik-sinner/s0ag/overview	https://www.atptour.com/-/media/alias/player-headshot/s0ag	Jannik Sinner	2025-02-27 18:55:14.69713
2	Alexander Zverev	GER	https://www.atptour.comhttps://www.atptour.com/en/players/alexander-zverev/z355/overview	https://www.atptour.com/-/media/alias/player-headshot/z355	Alexander Zverev	2025-02-27 18:55:14.69713
3	Carlos Alcaraz	ESP	https://www.atptour.comhttps://www.atptour.com/en/players/carlos-alcaraz/a0e2/overview	https://www.atptour.com/-/media/alias/player-headshot/a0e2	Carlos Alcaraz	2025-02-27 18:55:14.69713
4	Taylor Fritz	USA	https://www.atptour.comhttps://www.atptour.com/en/players/taylor-fritz/fb98/overview	https://www.atptour.com/-/media/alias/player-headshot/fb98	Taylor Fritz	2025-02-27 18:55:14.69713
5	Casper Ruud	NOR	https://www.atptour.comhttps://www.atptour.com/en/players/casper-ruud/rh16/overview	https://www.atptour.com/-/media/alias/player-headshot/rh16	Casper Ruud	2025-02-27 18:55:14.69713
6	Alex de Minaur	AUS	https://www.atptour.comhttps://www.atptour.com/en/players/alex-de-minaur/dh58/overview	https://www.atptour.com/-/media/alias/player-headshot/dh58	Alex de Minaur	2025-02-27 18:55:14.69713
7	Novak Djokovic	SRB	https://www.atptour.comhttps://www.atptour.com/en/players/novak-djokovic/d643/overview	https://www.atptour.com/-/media/alias/player-headshot/d643	Novak Djokovic	2025-02-27 18:55:14.69713
8	Daniil Medvedev	RUS	https://www.atptour.comhttps://www.atptour.com/en/players/daniil-medvedev/mm58/overview	https://www.atptour.com/-/media/alias/player-headshot/mm58	Daniil Medvedev	2025-02-27 18:55:14.69713
9	Tommy Paul	USA	https://www.atptour.comhttps://www.atptour.com/en/players/tommy-paul/pl56/overview	https://www.atptour.com/-/media/alias/player-headshot/pl56	Tommy Paul	2025-02-27 18:55:14.69713
10	Andrey Rublev	RUS	https://www.atptour.comhttps://www.atptour.com/en/players/andrey-rublev/re44/overview	https://www.atptour.com/-/media/alias/player-headshot/re44	Andrey Rublev	2025-02-27 18:55:14.69713
11	Stefanos Tsitsipas	GRE	https://www.atptour.comhttps://www.atptour.com/en/players/stefanos-tsitsipas/te51/overview	https://www.atptour.com/-/media/alias/player-headshot/te51	Stefanos Tsitsipas	2025-02-27 18:55:14.69713
12	Holger Rune	DEN	https://www.atptour.comhttps://www.atptour.com/en/players/holger-rune/r0dg/overview	https://www.atptour.com/-/media/alias/player-headshot/r0dg	Holger Rune	2025-02-27 18:55:14.69713
13	Grigor Dimitrov	BUL	https://www.atptour.comhttps://www.atptour.com/en/players/grigor-dimitrov/d875/overview	https://www.atptour.com/-/media/alias/player-headshot/d875	Grigor Dimitrov	2025-02-27 18:55:14.69713
14	Ben Shelton	USA	https://www.atptour.comhttps://www.atptour.com/en/players/ben-shelton/s0s1/overview	https://www.atptour.com/-/media/alias/player-headshot/s0s1	Ben Shelton	2025-02-27 18:55:14.69713
15	Jack Draper	GBR	https://www.atptour.comhttps://www.atptour.com/en/players/jack-draper/d0co/overview	https://www.atptour.com/-/media/alias/player-headshot/d0co	Jack Draper	2025-02-27 18:55:14.69713
16	Lorenzo Musetti	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/lorenzo-musetti/m0ej/overview	https://www.atptour.com/-/media/alias/player-headshot/m0ej	Lorenzo Musetti	2025-02-27 18:55:14.69713
17	Ugo Humbert	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/ugo-humbert/hh26/overview	https://www.atptour.com/-/media/alias/player-headshot/hh26	Ugo Humbert	2025-02-27 18:55:14.69713
18	Frances Tiafoe	USA	https://www.atptour.comhttps://www.atptour.com/en/players/frances-tiafoe/td51/overview	https://www.atptour.com/-/media/alias/player-headshot/td51	Frances Tiafoe	2025-02-27 18:55:14.69713
19	Arthur Fils	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/arthur-fils/f0f1/overview	https://www.atptour.com/-/media/alias/player-headshot/f0f1	Arthur Fils	2025-02-27 18:55:14.69713
20	Hubert Hurkacz	POL	https://www.atptour.comhttps://www.atptour.com/en/players/hubert-hurkacz/hb71/overview	https://www.atptour.com/-/media/alias/player-headshot/hb71	Hubert Hurkacz	2025-02-27 18:55:14.69713
21	Karen Khachanov	RUS	https://www.atptour.comhttps://www.atptour.com/en/players/karen-khachanov/ke29/overview	https://www.atptour.com/-/media/alias/player-headshot/ke29	Karen Khachanov	2025-02-27 18:55:14.69713
22	Felix Auger-Aliassime	CAN	https://www.atptour.comhttps://www.atptour.com/en/players/felix-auger-aliassime/ag37/overview	https://www.atptour.com/-/media/alias/player-headshot/ag37	Felix Auger-Aliassime	2025-02-27 18:55:14.69713
23	Sebastian Korda	USA	https://www.atptour.comhttps://www.atptour.com/en/players/sebastian-korda/k0ah/overview	https://www.atptour.com/-/media/alias/player-headshot/k0ah	Sebastian Korda	2025-02-27 18:55:14.69713
24	Tomas Machac	CZE	https://www.atptour.comhttps://www.atptour.com/en/players/tomas-machac/m0fh/overview	https://www.atptour.com/-/media/alias/player-headshot/m0fh	Tomas Machac	2025-02-27 18:55:14.69713
25	Jiri Lehecka	CZE	https://www.atptour.comhttps://www.atptour.com/en/players/jiri-lehecka/l0bv/overview	https://www.atptour.com/-/media/alias/player-headshot/l0bv	Jiri Lehecka	2025-02-27 18:55:14.69713
26	Alexei Popyrin	AUS	https://www.atptour.comhttps://www.atptour.com/en/players/alexei-popyrin/p09z/overview	https://www.atptour.com/-/media/alias/player-headshot/p09z	Alexei Popyrin	2025-02-27 18:55:14.69713
27	Alejandro Tabilo	CHI	https://www.atptour.comhttps://www.atptour.com/en/players/alejandro-tabilo/te30/overview	https://www.atptour.com/-/media/alias/player-headshot/te30	Alejandro Tabilo	2025-02-27 18:55:14.69713
28	Francisco Cerundolo	ARG	https://www.atptour.comhttps://www.atptour.com/en/players/francisco-cerundolo/c0au/overview	https://www.atptour.com/-/media/alias/player-headshot/c0au	Francisco Cerundolo	2025-02-27 18:55:14.69713
29	Jordan Thompson	AUS	https://www.atptour.comhttps://www.atptour.com/en/players/jordan-thompson/tc61/overview	https://www.atptour.com/-/media/alias/player-headshot/tc61	Jordan Thompson	2025-02-27 18:55:14.69713
30	Giovanni Mpetshi Perricard	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/giovanni-mpetshi-perricard/m0gz/overview	https://www.atptour.com/-/media/alias/player-headshot/m0gz	Giovanni Mpetshi Perricard	2025-02-27 18:55:14.69713
31	Sebastian Baez	ARG	https://www.atptour.comhttps://www.atptour.com/en/players/sebastian-baez/b0bi/overview	https://www.atptour.com/-/media/alias/player-headshot/b0bi	Sebastian Baez	2025-02-27 18:55:14.69713
32	Denis Shapovalov	CAN	https://www.atptour.comhttps://www.atptour.com/en/players/denis-shapovalov/su55/overview	https://www.atptour.com/-/media/alias/player-headshot/su55	Denis Shapovalov	2025-02-27 18:55:14.69713
33	Gael Monfils	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/gael-monfils/mc65/overview	https://www.atptour.com/-/media/alias/player-headshot/mc65	Gael Monfils	2025-02-27 18:55:14.69713
34	Matteo Berrettini	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/matteo-berrettini/bk40/overview	https://www.atptour.com/-/media/alias/player-headshot/bk40	Matteo Berrettini	2025-02-27 18:55:14.69713
35	Lorenzo Sonego	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/lorenzo-sonego/su87/overview	https://www.atptour.com/-/media/alias/player-headshot/su87	Lorenzo Sonego	2025-02-27 18:55:14.69713
36	Flavio Cobolli	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/flavio-cobolli/c0e9/overview	https://www.atptour.com/-/media/alias/player-headshot/c0e9	Flavio Cobolli	2025-02-27 18:55:14.69713
37	Alex Michelsen	USA	https://www.atptour.comhttps://www.atptour.com/en/players/alex-michelsen/m0qi/overview	https://www.atptour.com/-/media/alias/player-headshot/m0qi	Alex Michelsen	2025-02-27 18:55:14.69713
38	Matteo Arnaldi	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/matteo-arnaldi/a0fc/overview	https://www.atptour.com/-/media/alias/player-headshot/a0fc	Matteo Arnaldi	2025-02-27 18:55:14.69713
39	Nuno Borges	POR	https://www.atptour.comhttps://www.atptour.com/en/players/nuno-borges/bt72/overview	https://www.atptour.com/-/media/alias/player-headshot/bt72	Nuno Borges	2025-02-27 18:55:14.69713
40	Nicolas Jarry	CHI	https://www.atptour.comhttps://www.atptour.com/en/players/nicolas-jarry/j551/overview	https://www.atptour.com/-/media/alias/player-headshot/j551	Nicolas Jarry	2025-02-27 18:55:14.69713
41	Pedro Martinez	ESP	https://www.atptour.comhttps://www.atptour.com/en/players/pedro-martinez/mo44/overview	https://www.atptour.com/-/media/alias/player-headshot/mo44	Pedro Martinez	2025-02-27 18:55:14.69713
42	Tallon Griekspoor	NED	https://www.atptour.comhttps://www.atptour.com/en/players/tallon-griekspoor/gj37/overview	https://www.atptour.com/-/media/alias/player-headshot/gj37	Tallon Griekspoor	2025-02-27 18:55:14.69713
43	Brandon Nakashima	USA	https://www.atptour.comhttps://www.atptour.com/en/players/brandon-nakashima/n0ae/overview	https://www.atptour.com/-/media/alias/player-headshot/n0ae	Brandon Nakashima	2025-02-27 18:55:14.69713
44	Tomas Martin Etcheverry	ARG	https://www.atptour.comhttps://www.atptour.com/en/players/tomas-martin-etcheverry/ea24/overview	https://www.atptour.com/-/media/alias/player-headshot/ea24	Tomas Martin Etcheverry	2025-02-27 18:55:14.69713
45	Jakub Mensik	CZE	https://www.atptour.comhttps://www.atptour.com/en/players/jakub-mensik/m0ni/overview	https://www.atptour.com/-/media/alias/player-headshot/m0ni	Jakub Mensik	2025-02-27 18:55:14.69713
46	Jan-Lennard Struff	GER	https://www.atptour.comhttps://www.atptour.com/en/players/jan-lennard-struff/sl28/overview	https://www.atptour.com/-/media/alias/player-headshot/sl28	Jan-Lennard Struff	2025-02-27 18:55:14.69713
47	Mariano Navone	ARG	https://www.atptour.comhttps://www.atptour.com/en/players/mariano-navone/n0bs/overview	https://www.atptour.com/-/media/alias/player-headshot/n0bs	Mariano Navone	2025-02-27 18:55:14.69713
48	Alexander Bublik	KAZ	https://www.atptour.comhttps://www.atptour.com/en/players/alexander-bublik/bk92/overview	https://www.atptour.com/-/media/alias/player-headshot/bk92	Alexander Bublik	2025-02-27 18:55:14.69713
49	Marcos Giron	USA	https://www.atptour.comhttps://www.atptour.com/en/players/marcos-giron/gc88/overview	https://www.atptour.com/-/media/alias/player-headshot/gc88	Marcos Giron	2025-02-27 18:55:14.69713
50	Roberto Carballes Baena	ESP	https://www.atptour.comhttps://www.atptour.com/en/players/roberto-carballes-baena/cf59/overview	https://www.atptour.com/-/media/alias/player-headshot/cf59	Roberto Carballes Baena	2025-02-27 18:55:14.69713
51	Roberto Bautista Agut	ESP	https://www.atptour.comhttps://www.atptour.com/en/players/roberto-bautista-agut/bd06/overview	https://www.atptour.com/-/media/alias/player-headshot/bd06	Roberto Bautista Agut	2025-02-27 18:55:14.69713
52	Zhizhen Zhang	CHN	https://www.atptour.comhttps://www.atptour.com/en/players/zhizhen-zhang/z371/overview	https://www.atptour.com/-/media/alias/player-headshot/z371	Zhizhen Zhang	2025-02-27 18:55:14.69713
53	Jaume Munar	ESP	https://www.atptour.comhttps://www.atptour.com/en/players/jaume-munar/mu94/overview	https://www.atptour.com/-/media/alias/player-headshot/mu94	Jaume Munar	2025-02-27 18:55:14.69713
54	Juncheng Shang	CHN	https://www.atptour.comhttps://www.atptour.com/en/players/juncheng-shang/s0re/overview	https://www.atptour.com/-/media/alias/player-headshot/s0re	Juncheng Shang	2025-02-27 18:55:14.69713
55	Fabian Marozsan	HUN	https://www.atptour.comhttps://www.atptour.com/en/players/fabian-marozsan/m0ci/overview	https://www.atptour.com/-/media/alias/player-headshot/m0ci	Fabian Marozsan	2025-02-27 18:55:14.69713
56	Miomir Kecmanovic	SRB	https://www.atptour.comhttps://www.atptour.com/en/players/miomir-kecmanovic/ki95/overview	https://www.atptour.com/-/media/alias/player-headshot/ki95	Miomir Kecmanovic	2025-02-27 18:55:14.69713
57	David Goffin	BEL	https://www.atptour.comhttps://www.atptour.com/en/players/david-goffin/gb88/overview	https://www.atptour.com/-/media/alias/player-headshot/gb88	David Goffin	2025-02-27 18:55:14.69713
58	Alexandre Muller	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/alexandre-muller/mp20/overview	https://www.atptour.com/-/media/alias/player-headshot/mp20	Alexandre Muller	2025-02-27 18:55:14.69713
59	Luciano Darderi	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/luciano-darderi/d0fj/overview	https://www.atptour.com/-/media/alias/player-headshot/d0fj	Luciano Darderi	2025-02-27 18:55:14.69713
60	Alejandro Davidovich Fokina	ESP	https://www.atptour.comhttps://www.atptour.com/en/players/alejandro-davidovich-fokina/dh50/overview	https://www.atptour.com/-/media/alias/player-headshot/dh50	Alejandro Davidovich Fokina	2025-02-27 18:55:14.69713
61	Cameron Norrie	GBR	https://www.atptour.comhttps://www.atptour.com/en/players/cameron-norrie/n771/overview	https://www.atptour.com/-/media/alias/player-headshot/n771	Cameron Norrie	2025-02-27 18:55:14.69713
62	Zizou Bergs	BEL	https://www.atptour.comhttps://www.atptour.com/en/players/zizou-bergs/bu13/overview	https://www.atptour.com/-/media/alias/player-headshot/bu13	Zizou Bergs	2025-02-27 18:55:14.69713
63	Yoshihito Nishioka	JPN	https://www.atptour.comhttps://www.atptour.com/en/players/yoshihito-nishioka/n732/overview	https://www.atptour.com/-/media/alias/player-headshot/n732	Yoshihito Nishioka	2025-02-27 18:55:14.69713
64	Benjamin Bonzi	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/benjamin-bonzi/bm95/overview	https://www.atptour.com/-/media/alias/player-headshot/bm95	Benjamin Bonzi	2025-02-27 18:55:14.69713
65	Arthur Rinderknech	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/arthur-rinderknech/rc91/overview	https://www.atptour.com/-/media/alias/player-headshot/rc91	Arthur Rinderknech	2025-02-27 18:55:14.69713
66	Corentin Moutet	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/corentin-moutet/mw02/overview	https://www.atptour.com/-/media/alias/player-headshot/mw02	Corentin Moutet	2025-02-27 18:55:14.69713
67	Aleksandar Vukic	AUS	https://www.atptour.comhttps://www.atptour.com/en/players/aleksandar-vukic/v832/overview	https://www.atptour.com/-/media/alias/player-headshot/v832	Aleksandar Vukic	2025-02-27 18:55:14.69713
68	Mattia Bellucci	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/mattia-bellucci/b0gg/overview	https://www.atptour.com/-/media/alias/player-headshot/b0gg	Mattia Bellucci	2025-02-27 18:55:14.69713
69	Yunchaokete Bu	CHN	https://www.atptour.comhttps://www.atptour.com/en/players/yunchaokete-bu/y09v/overview	https://www.atptour.com/-/media/alias/player-headshot/y09v	Yunchaokete Bu	2025-02-27 18:55:14.69713
70	Roman Safiullin	RUS	https://www.atptour.comhttps://www.atptour.com/en/players/roman-safiullin/sx50/overview	https://www.atptour.com/-/media/alias/player-headshot/sx50	Roman Safiullin	2025-02-27 18:55:14.69713
71	Kei Nishikori	JPN	https://www.atptour.comhttps://www.atptour.com/en/players/kei-nishikori/n552/overview	https://www.atptour.com/-/media/alias/player-headshot/n552	Kei Nishikori	2025-02-27 18:55:14.69713
72	Rinky Hijikata	AUS	https://www.atptour.comhttps://www.atptour.com/en/players/rinky-hijikata/h0bh/overview	https://www.atptour.com/-/media/alias/player-headshot/h0bh	Rinky Hijikata	2025-02-27 18:55:14.69713
73	Thanasi Kokkinakis	AUS	https://www.atptour.comhttps://www.atptour.com/en/players/thanasi-kokkinakis/kd46/overview	https://www.atptour.com/-/media/alias/player-headshot/kd46	Thanasi Kokkinakis	2025-02-27 18:55:14.69713
74	Quentin Halys	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/quentin-halys/hb64/overview	https://www.atptour.com/-/media/alias/player-headshot/hb64	Quentin Halys	2025-02-27 18:55:14.69713
75	Facundo Diaz Acosta	ARG	https://www.atptour.comhttps://www.atptour.com/en/players/facundo-diaz-acosta/d0cg/overview	https://www.atptour.com/-/media/alias/player-headshot/d0cg	Facundo Diaz Acosta	2025-02-27 18:55:14.69713
76	Aleksandar Kovacevic	USA	https://www.atptour.comhttps://www.atptour.com/en/players/aleksandar-kovacevic/k0az/overview	https://www.atptour.com/-/media/alias/player-headshot/k0az	Aleksandar Kovacevic	2025-02-27 18:55:14.69713
77	Thiago Seyboth Wild	BRA	https://www.atptour.comhttps://www.atptour.com/en/players/thiago-seyboth-wild/sx91/overview	https://www.atptour.com/-/media/alias/player-headshot/sx91	Thiago Seyboth Wild	2025-02-27 18:55:14.69713
78	Jacob Fearnley	GBR	https://www.atptour.comhttps://www.atptour.com/en/players/jacob-fearnley/f0by/overview	https://www.atptour.com/-/media/alias/player-headshot/f0by	Jacob Fearnley	2025-02-27 18:55:14.69713
79	Christopher O'Connell	AUS	https://www.atptour.comhttps://www.atptour.com/en/players/christopher-o'connell/o483/overview	https://www.atptour.com/-/media/alias/player-headshot/o483	Christopher O'Connell	2025-02-27 18:55:14.69713
80	Daniel Altmaier	GER	https://www.atptour.comhttps://www.atptour.com/en/players/daniel-altmaier/ae14/overview	https://www.atptour.com/-/media/alias/player-headshot/ae14	Daniel Altmaier	2025-02-27 18:55:14.69713
81	Dusan Lajovic	SRB	https://www.atptour.comhttps://www.atptour.com/en/players/dusan-lajovic/l987/overview	https://www.atptour.com/-/media/alias/player-headshot/l987	Dusan Lajovic	2025-02-27 18:55:14.69713
82	Learner Tien	USA	https://www.atptour.comhttps://www.atptour.com/en/players/learner-tien/t0ha/overview	https://www.atptour.com/-/media/alias/player-headshot/t0ha	Learner Tien	2025-02-27 18:55:14.69713
83	Luca Nardi	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/luca-nardi/n0bg/overview	https://www.atptour.com/-/media/alias/player-headshot/n0bg	Luca Nardi	2025-02-27 18:55:14.69713
84	Francisco Comesana	ARG	https://www.atptour.comhttps://www.atptour.com/en/players/francisco-comesana/c0df/overview	https://www.atptour.com/-/media/alias/player-headshot/c0df	Francisco Comesana	2025-02-27 18:55:14.69713
85	Botic van de Zandschulp	NED	https://www.atptour.comhttps://www.atptour.com/en/players/botic-van-de-zandschulp/v812/overview	https://www.atptour.com/-/media/alias/player-headshot/v812	Botic van de Zandschulp	2025-02-27 18:55:14.69713
86	Gabriel Diallo	CAN	https://www.atptour.comhttps://www.atptour.com/en/players/gabriel-diallo/d0f6/overview	https://www.atptour.com/-/media/alias/player-headshot/d0f6	Gabriel Diallo	2025-02-27 18:55:14.69713
87	Camilo Ugo Carabelli	ARG	https://www.atptour.comhttps://www.atptour.com/en/players/camilo-ugo-carabelli/u182/overview	https://www.atptour.com/-/media/alias/player-headshot/u182	Camilo Ugo Carabelli	2025-02-27 18:55:14.69713
88	Alexander Shevchenko	KAZ	https://www.atptour.comhttps://www.atptour.com/en/players/alexander-shevchenko/s0h2/overview	https://www.atptour.com/-/media/alias/player-headshot/s0h2	Alexander Shevchenko	2025-02-27 18:55:14.69713
89	Adam Walton	AUS	https://www.atptour.comhttps://www.atptour.com/en/players/adam-walton/w09e/overview	https://www.atptour.com/-/media/alias/player-headshot/w09e	Adam Walton	2025-02-27 18:55:14.69713
90	Damir Dzumhur	BIH	https://www.atptour.comhttps://www.atptour.com/en/players/damir-dzumhur/d923/overview	https://www.atptour.com/-/media/alias/player-headshot/d923	Damir Dzumhur	2025-02-27 18:55:14.69713
91	Hugo Gaston	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/hugo-gaston/g09o/overview	https://www.atptour.com/-/media/alias/player-headshot/g09o	Hugo Gaston	2025-02-27 18:55:14.69713
92	Francesco Passaro	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/francesco-passaro/p0ct/overview	https://www.atptour.com/-/media/alias/player-headshot/p0ct	Francesco Passaro	2025-02-27 18:55:14.69713
93	Lucas Pouille	FRA	https://www.atptour.comhttps://www.atptour.com/en/players/lucas-pouille/pf39/overview	https://www.atptour.com/-/media/alias/player-headshot/pf39	Lucas Pouille	2025-02-27 18:55:14.69713
94	Fabio Fognini	ITA	https://www.atptour.comhttps://www.atptour.com/en/players/fabio-fognini/f510/overview	https://www.atptour.com/-/media/alias/player-headshot/f510	Fabio Fognini	2025-02-27 18:55:14.69713
95	James Duckworth	AUS	https://www.atptour.comhttps://www.atptour.com/en/players/james-duckworth/d994/overview	https://www.atptour.com/-/media/alias/player-headshot/d994	James Duckworth	2025-02-27 18:55:14.69713
96	Hamad Medjedovic	SRB	https://www.atptour.comhttps://www.atptour.com/en/players/hamad-medjedovic/m0jf/overview	https://www.atptour.com/-/media/alias/player-headshot/m0jf	Hamad Medjedovic	2025-02-27 18:55:14.69713
97	Marton Fucsovics	HUN	https://www.atptour.comhttps://www.atptour.com/en/players/marton-fucsovics/f724/overview	https://www.atptour.com/-/media/alias/player-headshot/f724	Marton Fucsovics	2025-02-27 18:55:14.69713
98	Otto Virtanen	FIN	https://www.atptour.comhttps://www.atptour.com/en/players/otto-virtanen/v0am/overview	https://www.atptour.com/-/media/alias/player-headshot/v0am	Otto Virtanen	2025-02-27 18:55:14.69713
99	Joao Fonseca	BRA	https://www.atptour.comhttps://www.atptour.com/en/players/joao-fonseca/f0fv/overview	https://www.atptour.com/-/media/alias/player-headshot/f0fv	Joao Fonseca	2025-02-27 18:55:14.69713
100	Thiago Monteiro	BRA	https://www.atptour.comhttps://www.atptour.com/en/players/thiago-monteiro/mj08/overview	https://www.atptour.com/-/media/alias/player-headshot/mj08	Thiago Monteiro	2025-02-27 18:55:14.69713
\.


--
-- Data for Name: players_tournaments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.players_tournaments (player_id,  tournament_id,  rating,  turno,  posizione) FROM stdin;
\.


--
-- Data for Name: tournaments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tournaments (id,  name,  href,  href_pptp,  category,  location,  country,  surface,  prizemoney,  datainizio,  datafine,  status) FROM stdin;
1	Australian Open	html/australianOpen.html	\N	Grand Slam	Melbourne	Australia	Cemento	61600000	2025-01-12	2025-01-26	completed
2	Rotterdam	https://www.atptour.com/en/tournaments/rotterdam/407/overview	\N	ATP 500	Rotterdam	Olanda	Cemento	0	2025-02-12	2025-02-18	completed
3	Qatar Open ATP	https://www.atptour.com/en/tournaments/doha/451/overview	\N	ATP 500	Doha	Qatar	Cemento	0	2025-02-17	2025-02-22	in-progress
4	Indian Wells Masters	https://www.atptour.com/en/tournaments/indian-wells/404/overview	\N	ATP Masters 1000	Indian Wells	Stati Uniti	Cemento	0	2025-03-03	2025-03-16	upcoming
5	Miami Open	https://www.atptour.com/en/tournaments/miami/403/overview	\N	ATP Masters 1000	Miami	Stati Uniti	Cemento	0	2025-03-17	2025-03-30	upcoming
6	Monte-Carlo Masters	https://www.atptour.com/en/tournaments/monte-carlo/410/overview	\N	ATP Masters 1000	Monte Carlo	Monaco	Terra rossa	0	2025-04-07	2025-04-13	upcoming
7	Barcelona Open Banc Sabadell	https://www.atptour.com/en/tournaments/barcelona/425/overview	\N	ATP 500	Barcellona	Spagna	Terra rossa	0	2025-04-14	2025-04-20	upcoming
8	Madrid Open	https://www.atptour.com/en/tournaments/madrid/1536/overview	\N	ATP Masters 1000	Madrid	Spagna	Terra rossa	0	2025-04-28	2025-05-11	upcoming
9	Italian Open (Roma)	https://www.atptour.com/en/tournaments/rome/416/overview	\N	ATP Masters 1000	Roma	Italia	Terra rossa	0	2025-05-12	2025-05-25	upcoming
10	Roland Garros (French Open)	https://www.atptour.com/en/tournaments/roland-garros/520/overview	\N	Grand Slam	Parigi	Francia	Terra rossa	0	2025-05-25	2025-06-08	upcoming
11	Halle Open	https://www.atptour.com/en/tournaments/halle/500/overview	\N	ATP 500	Halle	Germania	Erba	0	2025-06-16	2025-06-22	upcoming
12	Queen's Club Championships	https://www.atptour.com/en/tournaments/london/311/overview	\N	ATP 500	Londra	Regno Unito	Erba	0	2025-06-16	2025-06-22	upcoming
13	Wimbledon	https://www.atptour.com/en/tournaments/wimbledon/540/overview	\N	Grand Slam	Londra	Regno Unito	Erba	0	2025-06-30	2025-07-13	upcoming
14	Canadian Open	https://www.atptour.com/en/tournaments/canada/421/overview	\N	ATP Masters 1000	Toronto/Montreal	Canada	Cemento	0	2025-08-04	2025-08-17	upcoming
15	Cincinnati Masters	https://www.atptour.com/en/tournaments/cincinnati/422/overview	\N	ATP Masters 1000	Cincinnati	Stati Uniti	Cemento	0	2025-08-18	2025-08-31	upcoming
16	US Open	https://www.atptour.com/en/tournaments/us-open/560/overview	\N	Grand Slam	New York	Stati Uniti	Cemento	0	2025-08-25	2025-09-07	upcoming
17	Shanghai Masters	https://www.atptour.com/en/tournaments/shanghai/5014/overview	\N	ATP Masters 1000	Shanghai	Cina	Cemento	0	2025-10-01	2025-10-12	upcoming
18	China Open	https://www.atptour.com/en/tournaments/beijing/747/overview	\N	ATP 500	Pechino	Cina	Cemento	0	2025-09-30	2025-10-06	upcoming
19	Rakuten Japan Open Tennis Championships	https://www.atptour.com/en/tournaments/tokyo/329/overview	\N	ATP 500	Tokyo	Giappone	Cemento	0	2025-10-07	2025-10-13	upcoming
20	Paris Masters	https://www.atptour.com/en/tournaments/paris/352/overview	\N	ATP Masters 1000	Parigi	Francia	Cemento indoor	0	2025-10-27	2025-11-02	upcoming
21	Erste Bank Open	https://www.atptour.com/en/tournaments/vienna/337/overview	\N	ATP 500	Vienna	Austria	Cemento indoor	0	2025-10-21	2025-10-27	upcoming
22	Swiss Indoors Basel	https://www.atptour.com/en/tournaments/basel/328/overview	\N	ATP 500	Basilea	Svizzera	Cemento indoor	0	2025-10-21	2025-10-27	upcoming
23	ATP Finals	https://www.atptour.com/en/tournaments/atp-finals/605/overview	\N	ATP Finals	Torino	Italia	Cemento indoor	15250000	2025-11-09	2025-11-16	upcoming
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uuid,  active,  email,  password,  "createdAt",  "updatedAt",  image_url) FROM stdin;
4630665c-9eb7-4e3b-94d7-4854111e1c0f	f	radice.p@gmail.com	$2b$10$WnXDUsSAXN/gf0Oa7hNn0el7fWIKI2ejFZPbFnUiOOoIrgyLYhor2	2025-02-15 17:10:58.586+01	2025-02-15 17:10:58.586+01	\N
1430d132-d7ce-49d2-a9ec-cfc8c5c8bd30	f	pieroluigi.radice@itis.pr.it	$2b$10$YEPmfZC.wxQoRrua2yiYqeIUbXSqQ5PL.O04hU8WkQJVOaZI/vihq	2025-02-21 19:20:13.687+01	2025-02-21 19:20:13.687+01	\N
90401c93-0b4d-48b0-adb3-cadc5d598576	t	martina.creti21@libero.it	$2b$10$UCciJjtAGhTwvzqClYJnOuKD9TfQQ7Jjnd/QktO3mycrhvwC1.JSu	2025-03-06 17:44:05.4+01	2025-03-06 17:44:14.919+01	\N
dcf73307-b6ca-4448-a7da-42a02905ae5e	t	lombo68@hotmail.com	$2b$10$I8Dbs1ZAA8dxFsAqAewsRuJBDplCbGQ0ezEntuFRGejMDLf8MNGly	2025-03-06 17:46:35.124+01	2025-03-06 17:46:43.937+01	\N
d96c11c8-8a94-4b35-8951-9611b7a297ca	t	luigipelusopatr@libero.it	$2b$10$TtlQODKp5j/WHofJHPrDg.ZNLCiHuu1yY1sPAWNH/ugWic/h7hq6i	2025-03-06 17:47:17.604+01	2025-03-06 17:47:46.27+01	\N
c9d813ad-964c-4256-bcb1-a030bee1ae42	t	matogrelu@gmail.com	$2b$10$cjUo4N2L3OYGlOYDmY/xS.plQlb6Iu5.7JsTtMBiR3WoxEa9Q8Ns6	2025-03-06 17:48:21.111+01	2025-03-06 17:48:30.715+01	\N
5f7a818b-6b8c-4ec5-87c5-2eb563bed85f	t	michela_radice@alice.it	$2b$10$q79czd5Q6bb3617FrzuZlObNkJvV/SpjxwOQfbKsRA.9Gl6SwoZMG	2025-03-06 17:49:06.627+01	2025-03-06 17:49:13.475+01	\N
6fafa5c1-ae95-496c-baa1-5bb525a2da1d	f	pierluigi.giovati@gmail.com	$2b$10$qo1g3LCK32pbf91Uw7wIVu5buhdZEtqo3e.yV8ZqiS3mILgQ8yDuC	2025-03-06 17:49:41.288+01	2025-03-06 17:49:41.288+01	\N
\.


--
-- Data for Name: users_tournaments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_tournaments (user_uuid,  tournament_id,  image_url,  score) FROM stdin;
\.


--
-- Name: players_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.players_id_seq',  100,  true);


--
-- Name: tournaments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tournaments_id_seq',  23,  true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- Name: players_tournaments players_tournaments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players_tournaments
    ADD CONSTRAINT players_tournaments_pkey PRIMARY KEY (player_id,  tournament_id);


--
-- Name: tournaments tournaments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tournaments
    ADD CONSTRAINT tournaments_pkey PRIMARY KEY (id);


--
-- Name: players unique_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);


--
-- Name: users_tournaments users_tournaments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_tournaments
    ADD CONSTRAINT users_tournaments_pkey PRIMARY KEY (user_uuid,  tournament_id);


--
-- Name: player_tournament_pkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX player_tournament_pkey ON public.players_tournaments USING btree (player_id,  tournament_id);


--
-- Name: unique_name_year; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_name_year ON public.tournaments USING btree (name,  EXTRACT(year FROM datafine));


--
-- Name: user_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_email ON public.users USING btree (email);


--
-- Name: user_pkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_pkey ON public.users USING btree (uuid);


--
-- Name: users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email ON public.users USING btree (email);


--
-- Name: players_tournaments fk_players_tournaments_players; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players_tournaments
    ADD CONSTRAINT fk_players_tournaments_players FOREIGN KEY (player_id) REFERENCES public.players(id) ON DELETE CASCADE;


--
-- Name: users_tournaments fk_users_tournaments_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_tournaments
    ADD CONSTRAINT fk_users_tournaments_users FOREIGN KEY (user_uuid) REFERENCES public.users(uuid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

